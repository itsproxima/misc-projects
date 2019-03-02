


from bs4 import BeautifulSoup
import requests
import sys
from database import Database


def get_mrp(soup):
    mrp=soup.findAll("div",{"class":"_3auQ3N _16fZeb"})
    if not mrp:
        return None
    else:
        return ''.join(e for e in mrp[0].text if e.isalnum())


def get_selling_price(soup):
    sp=soup.findAll("div",{"class":"_1vC4OE _37U4_g"})
    selling_price=sp[0].text
    selling_price = ''.join(e for e in selling_price if e.isalnum())
    return selling_price


def get_ratting(soup):
    rat=soup.findAll("div",{"class":"hGSR34 _2beYZw"})
    ratting=rat[0].text
    ratting = ''.join(e for e in ratting if e.isalnum())
    return ratting


def get_image(soup):
    pic=soup.findAll("img",{"class":"sfescn"})
    image=pic[0].get("src")
    return image


def get_phone_name(soup):
    name=soup.findAll("h1",{"class":"_3eAQiD"})
    n=name[0]
    phone_name=n.text
    return phone_name



def get_specification(soup):
    spec=soup.findAll("li",{"class":"_2-riNZ"})
    specification=[]
    for m in spec:
        specification.append(m.text)
    return specification



def get_links(page_links):
    flag=1
    all_links2=[]
    while (flag):
        #url="https://www.flipkart.com/search?page={}&q=mobile&viewType=list"
        url = page_links
        print("processing the page : {}".format(flag))
        print("urls collected till now : {}".format(len(all_links2)))
        url = url.format(flag)
        r=requests.get(url)
        soup=BeautifulSoup(r.content, "lxml")
        links=soup.findAll("a",{"class":"_1UoZlX"})
        all_links=[]
        for a in links:
            all_links.append("https://www.flipkart.com"+a.get("href"))
            all_links1=[x.split("&")[0] for x in all_links]
            all_links2.extend(all_links1)
        if len(all_links) == 0:
            flag=0
        else:
            flag=flag+1
    return all_links2
            

def get_soup(url = None):
    if not url:
        print("please provide a url")
    content = requests.get(url).content
    soup = BeautifulSoup(content)
    return soup



def run(page_link):
    links = get_links(page_link)
    links = list(set(links))
    print("Total url collected of PDP : {}".format(len(links)))
    docs_list = []
    db_obj = Database()
    for link in links:
        try:
            doc = {}
            soup = get_soup(link)
            l=link.split("=")[1]
            doc['pid']=l
            doc['name'] = get_phone_name(soup)
            doc['image'] = get_image(soup)
            doc['mrp']=get_mrp(soup)
            doc['selling_price']=get_selling_price(soup)
            doc['rating']=get_ratting(soup)
            doc['specification']= " ".join(get_specification(soup))
            doc['product_link'] =link 
            q1 = "insert into mobile(pid,product_name,mrp,price,rating,Image,detail,url) values ('{}','{}','{}','{}','{}','{}','{}','{}')".format(doc['pid'], doc['name'] ,doc['mrp'],doc['selling_price'],doc['rating'],doc["image"],doc['specification'],doc['product_link'])
            print("inserting the url : {}".format(link))
            db_obj.execute_query(q1)
        except Exception as e:
            print(e)
            continue




if __name__ == "__main__":
    print(sys.argv)
    link = sys.argv[1]
    run(link)
