import json

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.firefox.options import Options

from selenium.webdriver.common.by import By
from selenium.webdriver.support.relative_locator import locate_with


from ocr import ImageDataFinder

if __name__ == '__main__':

    imagePath = r'.\images\pvp2.png'
    
    i = 1

    imageData = ImageDataFinder(imagePath, i)
    imageData.loadData()
    imageData.createJSON()

    while not imageData.hasId():
        imageData = ImageDataFinder(imagePath, i)
        imageData.loadData()
        imageData.createJSON()

        i += 1

    search = imageData.getId()
    name = ""
    list_hazards = []

    if search:
        try:
            
            
            options = Options()
            options.binary_location = r'C:\Program Files\Mozilla Firefox\firefox.exe'

            s = Service('geckodriver.exe')
            driver = webdriver.Firefox(service=s, options=options)

        except:
            s = Service('chromedriver.exe')

            options = Options()
            options.binary_location = r'C:\Program Files\Google Chrome\chrome.exe'
            
            driver = webdriver.Chrome(service=s, options=options)

        driver.get("https://www.sigmaaldrich.com/GB/en/product/sial/" + search + "?context=product")
        name = driver.find_element(By.CSS_SELECTOR,"#product-name").text

        try:
            hcodes = driver.find_element(By.XPATH, "//*[text()='hcodes']")
            
            if hcodes:
                hazards = driver.find_element(locate_with(By.XPATH, '//a[@href="/GB/en/life-science/safety/hazard-and-precautionary-statements#hazard"]').below(hcodes))
                list_hazards = hazards.text.split(' - ')
        except:
            None
        
        driver.quit()

    data = {}
    with open('chemical_data.json') as json_file:
        data = json.load(json_file)

        for elem in data["chemicals"]:
            elem["name"] = name
            elem["hazards"] = list_hazards

    with open('chemical_data.json', 'w') as outfile:
            json.dump(data, outfile)

    
    
