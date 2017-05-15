from __future__ import division

fp1=open("./output/test-info.txt", encoding='utf-8')

fo = open('rrr.txt','a')

#fp = open(raw_input("file name\n"));

TP = 0;

TN = 0;

FP = 0;

FN = 0;

for eachline in fp1:
    if len(eachline) == 1:
        continue;

    a = eachline.split('\t');
    
    if (a[-2] == 'O'):
    
        
        if (a[-1].split('\n')[0] == a[-2]):
    
            TN = TN + 1;
            
        else:
        
            FP = FP + 1;
    
    else:
    
        if (a[-1].split('\n')[0] == a[-2]):
    
            TP = TP + 1;
         
        else:
        
            FN = FN + 1;

P = format(TP/(TP+FP), '.2%')
R = format(TP/(TP+FN), '.2%')
A = format((TP + TN)/(TP + FN + FP + TN) , '.2%')
F1 = format(2*TP/(TP+FP)*TP/(TP+FN)/(TP/(TP+FP)+TP/(TP+FN)) , '.2%')

print('R:', R, 'P:', P, 'A:', A, 'F1:', F1)

fo.write(R+' '+P+' '+A+' '+F1+'\n')
    
fp1.close();

#raw_input("file name\n")