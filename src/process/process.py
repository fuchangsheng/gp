import config
import requests


def ws(text):
    param = {
        'api_key': config.api_key,
        'text': text,
        'pattern': 'ws',
        'format': 'xml'
    }

    r = requests.post(config.url, param)
    r.encoding = 'utf-8'
    return r.text

s = '我是信息学院的学生。'
print(ws(s))

