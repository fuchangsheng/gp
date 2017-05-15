import sys
if not (sys.path[0] + '/../') in sys.path:
    sys.path.append(sys.path[0] + '/../')

import logic.db as database
import models.logger as log
from models.basemodel import BaseModel

class Process(BaseModel):

    def __init__(self, options):
        if isinstance(options, dict):
            self.id = options['id']
            self.status = int(options.get('status', 0))
            self.event_type = int(options.get('event_type', 0))
            self.admin_user_id = options.get('admin_user_id', None)
            self.who = options.get('who', None)
            self.whom = options.get('whom', None)
            self.how = options.get('how', None)
            self.when = options.get('when', None)
            self.where = options.get('where', None)
            self.whywho = options.get('whywho', None)
            self.whyhow = options.get('whyhow', None)
            self.trigger = options.get('trigger', None)
            self.startwho = options.get('startwho', None)
            self.startwhom = options.get('startwhom', None)
            self.starthow = options.get('starthow', None)
            self.startwhen = options.get('startwhen', None)
            self.startwhere = options.get('startwhere', None)
            self.startwhywho = options.get('startwhywho', None)
            self.startwhyhow = options.get('startwhyhow', None)
            self.starttrigger = options.get('starttrigger', None)
            self.endwho = options.get('endwho', None)
            self.endwhom = options.get('endwhom', None)
            self.endhow = options.get('endhow', None)
            self.endwhen = options.get('endwhen', None)
            self.endwhere = options.get('endwhere', None)
            self.endwhywho = options.get('endwhywho', None)
            self.endwhyhow = options.get('endwhyhow', None)
            self.endtrigger = options.get('endtrigger', None)
            self.db = database.DB('tb_process_info')
        else:
            raise TypeError('options must be an instance of dict')

    def insert(self):
        insertdict = {
            'id': self.id,
            'status': self.status,
            'event_type': self.event_type,
            'admin_user_id': self.admin_user_id,
            'who': self.who,
            'whom': self.whom,
            'how': self.how,
            'when': self.when,
            'where': self.where,
            'whywho': self.whywho,
            'whyhow': self.whyhow,
            'trigger': self.trigger,
            'startwho': self.startwho,
            'startwhom': self.startwhom,
            'starthow': self.starthow,
            'startwhen': self.startwhen,
            'startwhere': self.startwhere,
            'startwhywho': self.startwhywho,
            'startwhyhow': self.startwhyhow,
            'starttrigger': self.starttrigger,
            'endwho': self.endwho,
            'endwhom': self.endwhom,
            'endhow': self.endhow,
            'endwhen': self.endwhen,
            'endwhere': self.endwhere,
            'endwhywho': self.endwhywho,
            'endwhyhow': self.endwhyhow,
            'endtrigger': self.endtrigger
        }

        obj = dict()
        for k in insertdict:
            if insertdict[k] != None:
                obj[k] = insertdict[k]
        result = self.db.insert(obj)
        if not result[0]:
            log.e(result[1])
            return (False, result[1])
        else:
            log.i('Inserted')
            return(True,)
