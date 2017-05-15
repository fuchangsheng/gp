import sys
if not (sys.path[0] + '/../') in sys.path:
    sys.path.append(sys.path[0] + '/../')

import re



# 去除表情如：'[Dog]'、'[机智]'等
def filteremojs(s):
    reg = r'[^\[\]]*(\[[^\[\]]*\])[^\[\]]*'
    r = s
    for sub in re.findall(reg, s):
        r = r.replace(sub, '')
    return r

# 去除话题标签
def filtertags(s):
    reg = r'[^\#]*(\#[^\#]*\#)[^\#]*'
    r = s
    for sub in re.findall(reg, s):
        r = r.replace(sub, '')
    return r



#  去除text中的url链接
def filterurls(s):
    reg = r'[^hf]*(http[^\s]*[\s]*).*'
    r = s
    for sub in re.findall(reg, s):
        r = r.replace(sub, ',')
    return r


def filter(s):
    s = filteremojs(s)
    s = filtertags(s)
    s = filterurls(s)
    s = s.strip('')
    return s 
