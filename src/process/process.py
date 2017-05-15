import config
import requests


def ws(text):
    param = {
        'api_key': config.api_key,
        'text': text,
        'pattern': 'all',
        'format': 'conll'
    }

    r = requests.post(config.url, param)
    r.encoding = 'utf-8'
    return r.text

s = '我今天在学校吃了一只非常大的鸡腿和一个冰淇淋，因为我饿了'
print(ws(s))

