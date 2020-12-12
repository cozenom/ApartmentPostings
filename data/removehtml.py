import re
import json
import time
import datetime

def cleanhtml(raw_html):
  cleanr = re.compile('<.*?>')
  cleantext = re.sub(cleanr, '', raw_html)
  print('cleanhtml done')
  return cleantext

def cleanjson(data):
    for i in data:
        # Remove url from image
        for j in range(len(i['images'])):
            url = i['images'][j]
            url = url.replace('https://images.craigslist.org/', '')
            url = url.replace('_50x50c.jpg', '')
            i['images'][j] = url

        # Remove symbols from price
        if i['price'] != None:
            i['price'] = i['price'].replace('$','')
            i['price'] = i['price'].replace(',','')

        # Split neighborhood into array
        split = []
        if i['result-hood'] != None:
            neighborhood = i['result-hood'].replace(' (','')
            neighborhood = neighborhood.replace(')','')
            neighborhood = neighborhood.replace(' / ',',')
            split = neighborhood.split(',')
        i['neighborhood'] = split

        # Date to UNIX time
        date = i['result-date']
        element = datetime.datetime.strptime(date, "%Y-%m-%d %H:%M")
        tuple = element.timetuple()
        i['date'] = time.mktime(tuple)

        # Split housing into array
        split = []
        if i['housing'] != None:
            rooms = i['housing'].replace('/ ','')
            rooms = rooms.replace('ft','')
            split = rooms.split('br - ')
            if len(split) == 1:
                tmp = split[0]
                split += [tmp]
                split[0] = ''
            i['bedrooms'] = split[0]
            i['area'] = split[1]

        # Remove qrcode text
        if i['postingbody'] != None:
            i['postingbody'] = i['postingbody'].replace('<section id=\"postingbody\">\n        <div class=\"print-information print-qrcode-container\">\n            <p class=\"print-qrcode-label\">QR Code Link to This Post</p>\n            ','')
            i['postingbody'] = i['postingbody'].replace('\n        ','')


        # Delete unused
        unused = ['url','result-price','housing','result-hood','result-tags','result-date','postinginfo','titletextonly','attrgroup','hood']
        for j in unused:
            del i[j]
    print("cleanjson done")
    return data


if __name__ == '__main__':
    x = open("apts.json", "r+")

    data = json.load(x)
    data = cleanjson(data)
    x.close()

    with open("apts_clean.json", "w") as outfile:
        json.dump(data, outfile)
    with open("apts_clean.json", "r") as outfile:
        y = outfile.read()
    #print(y)
    y = cleanhtml(y)
    #y = y.replace('"\n        \n            QR Code Link to This Post\n            \n        \n','"\n')
    y = y.replace('"postingbody":','"body":')
    y = y.replace('"result-title":','"title":')

    with open("apts_clean_nohtml.json", "w") as outfile:
        outfile.write(y)


