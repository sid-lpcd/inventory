import json
import pytesseract
from pytesseract import Output
import cv2

try:
    from PIL import Image
except ImportError:
    import Image

# If you don't have tesseract executable in your PATH, include the following:
pytesseract.pytesseract.tesseract_cmd = r'C:\Users\spont\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'
# Example tesseract_cmd = r'C:\Program Files (x86)\Tesseract-OCR\tesseract'

#Class that handles the finding of the product's chemical label, the volume and its units
class ImageDataFinder():
    #initialises the object, given an imagePath
    def __init__(self, imagePath, re_eval):
        self.imagePath = imagePath
        self.re_eval = re_eval
        
        self.data = {}
        self.chemLabel = ""
        self.measure = ""
        self.unit = ""
        self.id = ""

    #returns the id of the chemical
    def getId(self):
        return self.id

    def hasId(self):
        return self.id != ""

    #loads in all the data from the photo
    def loadData(self):
        self.findChemLabel()

        self.findId()
        self.findUnit()

    #creates the json where the data will be stored
    def createJSON(self):
        data = {}
        data["chemicals"] = []
        data["chemicals"].append({
                'chemical_id' : self.chemLabel,
                'id' : self.id,
                'measure' : self.measure,
                'unit' : self.unit,
                'name' : "",
                'hazards' : []
        })

        with open('chemical_data.json', 'w') as outfile:
            json.dump(data, outfile)
            

    #finds the id inside the chemical label
    def findId(self):
        if (not self.chemLabel): return
        
        self.id = self.chemLabel.split("-")[0]
        if self.chemLabel[-1] == "M":
            self.id += "-M"
            return
        
    #find the volume or mass inside of the chemical label and its unit
    #if the unit is not in ML or L its empty
    #if the volume's/mass's last digit isn't a number then its empty
    def findUnit(self):
        if (not self.chemLabel): return

        splitWord = self.chemLabel.split("-")
        
        for word in splitWord:
            self.findMeasure(word, "L")

            if not self.measure : self.findMeasure(word, "G")
            else: return


    #finds the corresponding measure content and unit if it has milli- prefix or not
    def findMeasure(self, word, unit):
        if word[-1] == unit:
            self.unit = unit
            if len(word) > 1:
                if word[-2].isnumeric():
                    self.measure = word[:-1]
                else:
                    if word[-2] == "M":
                        self.unit += "M"
                        self.unit = self.unit[::-1]     #reverses the string
                        self.measure = word[:-2]

                    else:
                        self.measure = word[:-2]

            else:
                if word[0].isnumeric():
                    self.measure = word[0]
                    

    #detects whether the input word is a chemical label or not
    def detectWord(self, word):
        word_list = word.split("-")

        #if it doesn't contain "-" then it's not a match
        if (len(word_list) < 2) : return ""
        for e in word_list:
            volume = ""
            mass = ""
            
            if ("ML" in e):
                volume = e[:-2]
            elif ("L" in e):
                volume = e[:-1]
                
            volume = volume.replace(".","")
            if volume.isnumeric():
                return word

            if ("MG" in e):
                mass = e[:-2]
            elif ("G" in e):
                mass = e[:-1]
                
            mass = mass.replace(".","")
            if mass.isnumeric():
                return word

        #if there's an M at the end then it's a match
        if (word_list[-1] == "M"): return word
        return ""

    #finds the chemical's label in the image
    def find_label(self, image):

        #get the image letters with pytesseact
        d = pytesseract.image_to_data(image, output_type=Output.DICT)
        n_boxes = len(d['level'])

        label = ""
        for i in range(n_boxes):
            label = self.detectWord(d['text'][i])
            if (label) : break                    #if it's not empty then break outside the loop

        return label

    #it counts how many digits are in a word
    def countDigits(self, word):
            return sum(c.isdigit() for c in word)
    
    #it returns the closest word being to a number
    def closestToNumber(self, word1, word2):
            if (self.countDigits(word1) >= self.countDigits(word2)): return word1
            return word2

    #zooms in the given picture in the middle by a factor of k while retaining the original image size
    def zoomPicture(self, k_factor, img):
        norm_w = img.shape[1]
        norm_h = img.shape[0]
        
        w = int(norm_w / k_factor)
        h = int(norm_h / k_factor)

        y = int((h/2)*(1-1/k_factor))
        x = int((w/2)*(1-1/k_factor))
        
        img = img[y:y+h, x:x+w]
        dim = (norm_w, norm_h)

        #resize image
        img = cv2.resize(img, dim, interpolation = cv2.INTER_LINEAR)
        return img

    #it looks for the chemical label inside the image
    def findChemLabel(self):
        #loads the image
        img = cv2.imread(self.imagePath, 0)

        if (self.re_eval > 1):
            #scales the image up by 50%
            img = self.zoomPicture((self.re_eval+1)*0.5, img)
    
        #gets the label of the chemical
        self.chemLabel = self.find_label(img)

        #if the label's ID is not a number, try to apply a filter to the image
        if (not self.chemLabel):
            thresh = cv2.adaptiveThreshold(img,255,cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY ,41,3)
            
            thresh_id_word = self.find_label(thresh)

            #the label is the closest of the two to being a number
            self.chemLabel = self.closestToNumber(self.chemLabel, thresh_id_word)

            
