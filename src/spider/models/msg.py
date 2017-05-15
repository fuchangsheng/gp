import sys
if not (sys.path[0] + '/../') in sys.path:
    sys.path.append(sys.path[0] + '/../')

import logic.db as database
import models.logger as log
from models.basemodel import BaseModel

class Msg(BaseModel):

    def __init__(self, options):
        if isinstance(options, dict):
            self.id = options['id']
            self.user_id = options['user_id']
            self.process_id = options.get('process_id', self.id)
            self.content = options.get('content', '')
            self.db = database.DB('tb_msg_info')
        else:
            raise TypeError('options must be an instance of dict')

    def insert(self):
        result = self.db.insert({
            'id': self.id,
            'user_id': self.user_id,
            'process_id': self.process_id,
            'content': self.content
        })

        if not result[0]:
            log.e(result[1])
            return (False, result[1])
        else:
            log.i('Inserted')
            return(True,)
