import sys
if not (sys.path[0] + '/../') in sys.path:
    sys.path.append(sys.path[0] + '/../')

import logic.db as database
import models.logger as log
from models.basemodel import BaseModel


class User(BaseModel):

    def __init__(self, options):
        if isinstance(options, dict):
            self.id = options['id']
            self.name = options['name']
            self.location = options.get('location', '')
            self.description = options.get('description', '')
            self.gender = options.get('gender', 'n')
            self.followers_count = int(options.get('followers_count', 0))
            self.friends_count = int(options.get('friends_count', 0))
            self.statuses_count = int(options.get('statuses_count', 0))
            self.db = database.DB('tb_user_info')
        else:
            raise TypeError('options must be an instance of dict')

    def insert(self):
        insertobj = {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'description': self.description,
            'gender': self.gender,
            'followers_count': self.followers_count,
            'friends_count': self.friends_count,
            'statuses_count': self.statuses_count
        }
        result = self.db.insert(insertobj)
        if not result[0]:
            log.e(result[1])
            return (False, result[1])
        else:
            log.i('Inserted')
            return (True,)
