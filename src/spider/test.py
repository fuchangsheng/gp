import requests
import json
import re
# cookies = 'YF-Ugrow-G0=56862bac2f6bf97368b95873bc687eef; SUB=_2AkMuVRj_f8NxqwJRmP8SxGPqbYRxyAHEieKYCekkJRMxHRl-yT9kqmcvtRA1jbwshD6vmb60rPBc8wWo1UCoxg..; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9W5jjv5BXegQ6R_2-JU7..Yz; login_sid_t=e95b6e4d999fa86540db0de3732ee5af; YF-V5-G0=4955da6a9f369238c2a1bc4f70789871; _s_tentry=-; Apache=9709479706109.303.1493800910500; SINAGLOBAL=9709479706109.303.1493800910500; ULV=1493800910505:1:1:1:9709479706109.303.1493800910500:; WBStorage=02e13baf68409715|undefined'


def fetch(page=3):
    u = 'http://weibo.com/a/aj/transform/loadingmoreunlogin?ajwvr=6&category=7&page=' + str(page) + '&lefnav=0&__rnd=1493802039882'
    headers = {
        'Host': 'weibo.com',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Referer': 'http://weibo.com/?category=7',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Cookie': 'YF-Ugrow-G0=56862bac2f6bf97368b95873bc687eef; SUB=_2AkMuVRj_f8NxqwJRmP8SxGPqbYRxyAHEieKYCekkJRMxHRl-yT9kqmcvtRA1jbwshD6vmb60rPBc8wWo1UCoxg..; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9W5jjv5BXegQ6R_2-JU7..Yz; login_sid_t=e95b6e4d999fa86540db0de3732ee5af; YF-V5-G0=4955da6a9f369238c2a1bc4f70789871; _s_tentry=-; Apache=9709479706109.303.1493800910500; SINAGLOBAL=9709479706109.303.1493800910500; ULV=1493800910505:1:1:1:9709479706109.303.1493800910500:; WBStorage=02e13baf68409715|undefined'
    }
    r = requests.get(u,headers=headers)
    r.encode='utf-8'
    return r.text.encode().decode('unicode-escape');


def getids(s):
    ss = list()
    reg = r'\<li\s+class\=\"pt_li\s+.*href\=\"([^\s]*)\"'
    for sub in re.findall(reg, s):
        ss.append(sub)
    return ss

p = 1
while p <= 3:
    [print(u + "\n") for u in getids(fetch(p))]
    print('\n' + str(p) + '\n')
    p += 1