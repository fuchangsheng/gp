fp1 = open('PoSNER.txt', encoding='utf-8')
fp2 = open('goeventsCorpus.txt', encoding='utf-8')
fo = open('combine.txt', 'w', encoding='utf-8')
for wordline in fp1:
    if wordline == '\n':
        fo.write('\n')
        fp2.readline()
    else:
        word = wordline.rstrip().split(' ')[0].encode().decode('utf-8')
        tag = ''
        for w in word:
            charline = fp2.readline()
            if tag == '' and len(charline.rstrip().split(' ')) > 1:
                tag = charline.rstrip().split(' ')[1]
            elif len(charline.rstrip().split(' ')) > 1 and charline.rstrip().split(' ')[1][0] == 'e' and tag[0] != 'e':
                tag = charline.rstrip().split(' ')[1]
        fo.write(wordline.rstrip().split(' ')[0] + ' ' + wordline.rstrip().split(' ')[1] + ' ' + wordline.rstrip().split(' ')[2] + ' ' +tag + '\n')
            