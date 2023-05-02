from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.chrome.service import Service as ChromeService 
from webdriver_manager.chrome import ChromeDriverManager 
from selenium.webdriver.chrome.options import Options
from time import sleep
import random

def getOnePage(url): 
    # instantiate options 
    options = webdriver.ChromeOptions() 
    
    # instantiate driver 
    chrome_options = webdriver.ChromeOptions()
    #chrome_options.add_argument('--headless')

    driver = webdriver.Chrome('chromedriver', options=chrome_options)
    
    # get the entire website content 
    driver.get(url) 

    sleep(random.randint(2,7))


    popUp = driver.find_element(By.XPATH, "//*[@id=\"storeInfo\"]/ul/li[1]/button")
    popUp.click()

    links = []
    for i in range(0, 24):
        idText = "hypProductH2_" + str(i) 
        step1 = driver.find_elements(By.ID, idText)

        for product in step1:
            links.append(step1[0].get_attribute("href"))
    return links

def getTwoPages(url):
    # instantiate options 
    options = webdriver.ChromeOptions() 
    
    # instantiate driver 
    chrome_options = webdriver.ChromeOptions()
    #chrome_options.add_argument('--headless')

    driver = webdriver.Chrome('chromedriver', options=chrome_options)
    
    # get the entire website content 
    driver.get(url) 

    sleep(random.randint(2,7))


    popUp = driver.find_element(By.XPATH, "//*[@id=\"storeInfo\"]/ul/li[1]/button")
    popUp.click()

    links = []
    for j in range (0, 2):
        for i in range(0, 24):
            idText = "hypProductH2_" + str(i) 
            step1 = driver.find_elements(By.ID, idText)

            for product in step1:
                links.append(step1[0].get_attribute("href"))

        page2 = driver.find_element(By.XPATH, "//*[@id=\"topPagination\"]/nav/ul/li[3]/a")
        page2.click()
    
    return links


url = 'https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294967292+4294819439&myStore=false' 
links = getOnePage(url)

name = "servers"
with open(name+".txt", 'w') as fp:
    for item in links:
        fp.write("%s\n" % item)
    print('Done')



# links to scrape:
# https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294966995&myStore=false -> done
# https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294966937&myStore=false -> done
# https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294966996&myStore=false -> done
# https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294966958&myStore=false -> done
# https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294966653&myStore=false -> done
# https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294964318&myStore=false -> done
# https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294966654&myStore=false -> done
# https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294966928&myStore=false -> done
# https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294967292+4294807523&myStore=false -> done
# https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294967292+4294807480&myStore=false -> done
# https://www.microcenter.com/search/search_results.aspx?Ntk=all&sortby=match&N=4294967292+4294819439&myStore=false -> done


# venv commands:
# source CSc322/bin/activate
# deactivate