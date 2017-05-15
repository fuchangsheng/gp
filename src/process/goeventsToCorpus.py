import codecs
import xml.etree.ElementTree as ET

def oneXml(root):
    tag = 'O'
    start = 1000
    end = 0
    for child in root:
        if child.tag == 'text':
            a = list(child.text)
    line = []
    while a:
        mchar = a.pop(0)
        line.append([mchar, tag])
    
    for child in root:
        if child.tag[0] == 's' and int(child.text) < 1000:
            tagLength = len(child.tag)
            tag = 'b'+child.tag[1:tagLength]
            #tag = child.tag[1:tagLength]
            start = int(child.text)
            line[start-1][1] = tag
        if child.tag[0] == 'e' and child.tag[1] != 'v' and int(child.text) > 0:
            tagLength = len(child.tag)
            tag = child.tag[0:tagLength]
            #tag = child.tag[1:tagLength]
            end = int(child.text)
            line[end-1][1] = tag
            tag = child.tag[1:tagLength]
            for i in range(start+1, end):
                line[i-1][1] = tag
    
    for l in line:
        if l[0] == ' ':
            continue
        fo.write(l[0].encode().decode('utf-8') + ' ' + l[1].encode().decode('utf-8'))
        fo.write('\n')

fp = open('table.csv', 'rb')
fo = open('goeventsCorpus.txt', "w", encoding='utf-8')
xmlstr = ''
for eachline in fp:
    print(eachline)
    eachline = eachline.decode('utf-8')
    if eachline != '\r\n':
        xmlstr=xmlstr+eachline
    else:
        root = ET.fromstring(xmlstr)
        oneXml(root)
        fo.write("\n")
        xmlstr = ''
fp.close()
fo.close()