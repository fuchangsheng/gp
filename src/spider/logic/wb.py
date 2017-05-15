import sys
if not (sys.path[0] + '/../') in sys.path:
    sys.path.append(sys.path[0] + '/../')

import requests
import json
import config.wbconfig as wbconfig


def show_token_info():
    r = requests.post(
        wbconfig.tokeninfo_url,
        {'access_token': wbconfig.access_token}
    )
    r.encoding = 'utf-8'
    a = int(json.loads(r.text)['expire_in']) / 3600 / 24
    print('access_token: %s' % wbconfig.access_token)
    print('access_token 剩余有效时间为：%s 天\n' % int(a))


def show_msg_detail(id):
    pass


def scrapy_msgs(page=1, count=20):
    u = wbconfig.allmsg_url
    r = requests.get(
        u,
        {
            'access_token': wbconfig.access_token,
            'page': int(page),
            'count': int(count),
            'feature': 1,
            'trim_user': 0
        }
    )
    r.encoding = 'utf8'
    res = json.loads(r.text)
    return (res['total_number'], res['statuses'])


def scrapy_pmsgs(page=1, count=50):
    u = wbconfig.publicurl
    r = requests.get(
        u,
        {
            'access_token': wbconfig.access_token,
            'page': int(page),
            'count': int(count)
        }
    )
    r.encoding = 'utf8'
    res = json.loads(r.text)
    return (res['total_number'], res['statuses'])


def scrapy_users():
    pass


def scrapy_msgs_by_user(userid):
    pass


def scrapy_msg_by_id(msgid=4103355049666676):
    u = wbconfig.byidurl
    r = requests.get(
        u,
        {
            'access_token': wbconfig.access_token,
            'id': int(msgid)
        }
    )
    r.encoding = 'utf8'
    msg = json.loads(r.text)
    return msg
