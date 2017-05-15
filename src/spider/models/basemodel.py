import sys
if not (sys.path[0] + '/../') in sys.path:
    sys.path.append(sys.path[0] + '/../')


import logic.db as database
import models.logger as log


class BaseModel(object):
    
    def __init__(self):
        self.db = database.DB()

    def insert(self):
        pass

    def update(self, update, match={}):
        result = self.db.update(update, match)
        if not result[0]:
            log.e(result[1])
            return (False, result[1])
        else:
            log.i('Update Success')
            return (True,)        

    def select(self, select={}, match={}):
        result = self.db.select(select, match)
        if not result[0]:
            log.e(result[1])
            return (False, result[1])
        else:
            rows = result[1]
            return (True, rows)    

    def delete(self, match={}, force=False):
        result = self.db.delete(match, force)
        if not result[0]:
            log.e(result[1])
            return [False, result[1]]
        else:
            log.d('delete success')
            return(True,)
