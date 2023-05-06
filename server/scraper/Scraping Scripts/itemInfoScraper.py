from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from time import sleep
import random
from retry import retry
import json


@retry(([Exception, TypeError, IndexError]), tries=3, delay=random.randint(1, 3), backoff=0)
def getDict(url):
    # instantiate options
    options = webdriver.ChromeOptions()

    # instantiate driver
    chrome_options = webdriver.ChromeOptions()
    # chrome_options.add_argument('--headless')
    driver = webdriver.Chrome('chromedriver', options=chrome_options)

    # get the entire website content
    driver.get(url)

    sleep(random.randint(2, 7))

    # Get product name
    nameStep1 = driver.find_elements(
        By.XPATH, "//*[@id=\"product-details-control\"]/div[2]/h1/span")
    nameFinal = ""
    for name in nameStep1:
        nameFinal = name.get_attribute('data-name')

    # Get product price
    price = ""
    for name in nameStep1:
        price = name.get_attribute('data-price')

    # Get product specs
    specStep1 = driver.find_elements(By.CLASS_NAME, "spec-body")
    specStep2 = []
    for spec in specStep1:
        specStep2.append(spec.find_elements(By.TAG_NAME, "div"))
    specStep3 = []
    for spec in specStep2:
        for spec2 in spec:
            specStep3.append(spec2.get_attribute("innerHTML"))
    iterated = iter(specStep3)
    specDict = dict(zip(iterated, iterated))
    for key in specDict:
        if "<br>" in specDict[key]:
            specDict[key] = specDict[key].split("<br> ")

    # Get all images
    imageStep1 = driver.find_elements(By.CLASS_NAME, "image-slide")
    imageStep2 = []
    for image in imageStep1:
        imageStep2.append(image.find_elements(By.TAG_NAME, "a"))
    imageList = []
    for image in imageStep2:
        if len(image) > 0:
            imageList.append(image[0].get_attribute('href'))

    # Get brand name
    brandStep1 = driver.find_elements(
        By.XPATH, "//*[@id=\"product-details-control\"]/div[1]/div[1]/div/span[2]/a")
    brandName = brandStep1[0].get_attribute("innerHTML")

    # Get catergory
    categoryStep1 = driver.find_elements(
        By.XPATH, "//*[@id=\"product-details-control\"]/nav/small/span[3]/a/span")
    categoryName = categoryStep1[0].get_attribute("innerHTML")

    finalDict = {"name": nameFinal, "price": price, "specs": specDict,
                 "images": imageList, "brand": brandName, "category": categoryName}

    return finalDict


category = "ram"
with open("ItemLinks/"+category+".text", 'r') as fp1:
    indexToStartAt = int(
        input("Print the index you want to start the link list at: "))
    linksList = fp1.readlines()

    for i in range(indexToStartAt, len(linksList)):
        try:
            currentItemDict = getDict(linksList[i])
            with open("ItemInfo/"+category+"/"+category+"_"+str(i)+".json", 'a+') as fp2:
                json.dump(currentItemDict, fp2)
        except:
            print("Index where the program stopped: " + str(i))
            exit()


# categories to complete:
# "cases" -> done
# "cooling" -> done
# "drivesNstorage" -> done
# "gamingpc" -> done
# "graphics-cards" -> done
# "motherboards" -> done
# "powersupplies" -> done
# "processors" -> done
# "ram" -> done
# "workstations" -> done
# "servers" -> done
