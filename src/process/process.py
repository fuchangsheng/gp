import config
import requests


def ws(text):
    param = {
        'api_key': config.api_key,
        'text': text,
        'pattern': 'pos',
        'format': 'conll'
    }

    r = requests.post(config.url, param)
    r.encoding = 'utf-8'
    return r.text

s = '我是一个学通信的学生'
print(ws(s))

