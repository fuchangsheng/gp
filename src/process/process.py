import config
import requests


def ws(text):
    param = {
        'api_key': config.api_key,
        'text': text,
        'pattern': 'pos',
        'format': 'plain'
    }

    r = requests.post(config.url, param)
    r.encoding = 'utf-8'
    return r.text

s = '我爱学习，学习使我快乐'
print(ws(s))

