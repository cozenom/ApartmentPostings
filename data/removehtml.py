import re

def cleanhtml(raw_html):
  cleanr = re.compile('<.*?>')
  cleantext = re.sub(cleanr, '', raw_html)
  return cleantext

if __name__ == '__main__':
    x = open("apts.json",mode="r")
    y = x.read()
    y = cleanhtml(y)
    x.close()
    z = open("apts.json",mode="w")
    z.write(y)
    z.close()
    print(y)