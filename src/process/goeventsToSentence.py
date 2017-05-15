import xml.etree.ElementTree as ET

def oneXml(root):
    tag = 'O'
    start = 1000
    end = 0
    for child in root:
        if child.tag == 'text':
            s = child.text
            s = s.replace('[', '')
            s = s.replace(']', '')
            fo.write(s.encode().decode('utf-8'))
            fo.write('\n')
        if child.tag == 'id':
            fo2.write(child.text)
            fo2.write('\n')

fp = open('table.csv', 'rb')
fo = open('sentence.txt', "w", encoding='utf-8')
fo2 = open('index.txt', "w", encoding='utf-8')
xmlstr = ''
for eachline in fp:
    eachline = eachline.decode('utf-8')
    if eachline != '\r\n':
        xmlstr=xmlstr+eachline
    else:
        root = ET.fromstring(xmlstr)
        oneXml(root)
        xmlstr = ''
fp.close()
fo.close()
fo2.close()