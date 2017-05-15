import logic.wb as wb
import json
from apscheduler.schedulers.blocking import BlockingScheduler
import logic.saver as saver
import time
import os

def save(data):
    msg = data['msg']
    user = data['user']
    saver.savemsg(msg)
    saver.saveuser(user)
    # with open('./records/messages.txt', 'a', encoding='utf-8') as f:
    #     json.dump(msg, f, indent='  ', ensure_ascii=False)
    #     f.write('\n\n')
    # with open('./records/users.txt', 'a', encoding='utf-8') as f:
    #     json.dump(user, f, indent='  ', ensure_ascii=False)
    #     f.write('\n\n')


def scrap():
    count = 100
    results = list()
    results.append(wb.scrapy_msgs(page=1, count=count))
    total_num = results[0][0]

    p = 1
    while p <= total_num / count:
        p = p + 1
        results.append(wb.scrapy_msgs(page=p, count=count))

    for result in results:
        for m in result[1]:
            try:
                user = dict()
                user['id'] = str(m['user']['id'])
                user['name'] = m['user']['name']
                user['location'] = m['user']['location'] or ''
                user['description'] = m['user']['description'] or ''
                user['followers_count'] = m['user']['followers_count']
                user['friends_count'] = m['user']['friends_count']
                user['statuses_count'] = m['user']['statuses_count']
                user['gender'] = str(m['user']['gender'])
                msg = dict()
                msg['id'] = str(m['id'])
                msg['user_id'] = str(user['id'])
                msg['process_id'] = str(m['id'])
                msg['content'] = m['text']
                data = {'msg': msg, 'user': user}
                save(data)
            except Exception as e:
                print(e)
                continue


def scraploop():
    p = 1
    while p < 10:    
        results = list()
        results.append(wb.scrapy_pmsgs(page=p, count=50))
        for result in results:
            for m in result[1]:
                try:
                    user = dict()
                    user['id'] = str(m['user']['id'])
                    user['name'] = m['user']['name']
                    user['location'] = m['user']['location'] or ''
                    user['description'] = m['user']['description'] or ''
                    user['followers_count'] = m['user']['followers_count']
                    user['friends_count'] = m['user']['friends_count']
                    user['statuses_count'] = m['user']['statuses_count']
                    user['gender'] = str(m['user']['gender'])
                    msg = dict()
                    msg['id'] = str(m['id'])
                    msg['user_id'] = str(user['id'])
                    msg['process_id'] = str(m['id'])
                    msg['content'] = m['text']
                    data = {'msg': msg, 'user': user}
                    save(data)
                except Exception as e:
                    print(e)
                    continue
        p = p + 1


def main():
    wb.show_token_info()
    scrap()
    with open('./records.txt', 'a', encoding='utf-8') as f:
        t = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
        f.write('run at ' +  t + '\n')



        
main()
# print(wb.scrapy_msg_by_id())
# sch = BlockingScheduler()
# sch.add_job(main, 'interval', seconds=3600)
# sch.start()
