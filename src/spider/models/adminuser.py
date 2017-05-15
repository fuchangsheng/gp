import sys
if not (sys.path[0] + '/../') in sys.path:
    sys.path.append(sys.path[0] + '/../')

import logic.db as database
import models.logger as log
from models.basemodel import BaseModel



class AdminUser(BaseModel):

    def __init__(self, options):
        if isinstance(options, dict):
            self.id = options['id']
            self.type = options.get('type', 1)
            self.name = options.get('name', self.id)
            self.password = options['password']
            self.db = database.DB('tb_admin_user_info')
        else:
            raise TypeError('options must be an instance of dict')

    def insert(self):
        insert = self.db.insert({
            'id': self.id,
            'type': self.type,
            'name': self.name,
            'password': self.password
        })
        if not insert[0]:
            log.e(insert[1])
            return (False, insert[1])
        else:
            log.i('Inserted')
            return (True,)
