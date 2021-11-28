try:
    from PIL import Image
except ImportError:
    import Image
    
import pytesseract
from pytesseract import Output
import cv2

# If you don't have tesseract executable in your PATH, include the following:
pytesseract.pytesseract.tesseract_cmd = r'C:\Users\spont\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'
# Example tesseract_cmd = r'C:\Program Files (x86)\Tesseract-OCR\tesseract'

image_file = './images/acetone.png'
im = Image.open(image_file)

img = cv2.imread(image_file, 0)

scale_percent = 50 # percent of original size
width = int(img.shape[1] * scale_percent / 100)
height = int(img.shape[0] * scale_percent / 100)
dim = (width, height)

# resize image
img = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)

def detectWord(word):
    word_list = word.split("-")
    if (len(word_list) == 0) : return ""
    for e in word_list:
        volume = ""

        if ("ML" in e):
            volume = e[:-2]
        elif ("L" in e):
            volume = e[:-1]
            
        volume = volume.replace(".","")
        if volume.isnumeric():
            return word

    if (word_list[-1] == "M"): return word
    return ""

def find_id(image):
    
    d = pytesseract.image_to_data(image, output_type=Output.DICT)
    n_boxes = len(d['level'])

    id_word = ""
    for i in range(n_boxes):
        id_word = detectWord(d['text'][i])
        if (id_word) : break

    return id_word

def countDigits(word):
    return sum(c.isdigit() for c in word)

def closestMatch(word1, word2):
    if (countDigits(word1) >= countDigits(word2)): return word1
    return word2


id_word = find_id(img)

if (not id_word.split("-")[0].isnumeric()):
    thresh = cv2.adaptiveThreshold(img,255,cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY ,41,3)
    
    thresh_id_word = find_id(thresh)
    print(closestMatch(id_word, thresh_id_word))

else:
    print(id_word)



    
