import sys
if not (sys.path[0] + '/../') in sys.path:
    sys.path.append(sys.path[0] + '/../')

from models import logger as log
from models.adminuser import AdminUser
from models.msg import Msg
from models.process import Process
from models.user import User
import logic.filter


def savemsg(msg):
    m = Msg(msg)
    m.content = logic.filter.filter(m.content)
    if len(m.content) > 10:
        res = m.select({'id':1},{'id':msg['id']});
        if res[0] and len(res[1]) == 0:
            m.insert()
            p = Process({'id':msg['id']})
            p.insert()
    else:
        log.e(m.content)

def saveuser(user):
    u = User(user)
    res = u.select({'id':1},{'id': user['id']});
    if res[0] and len(res[1]) == 0:
        u.insert()
