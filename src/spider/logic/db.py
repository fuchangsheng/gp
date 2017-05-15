import sys
if not (sys.path[0] + '/../') in sys.path:
    sys.path.append(sys.path[0] + '/../')


import mysql.connector
import mysql.connector.pooling as pooling
import config.dbconfig as dbconfig
import models.logger as log

# For string in sql, the better way is to wrap them in `` or ''
def _wrap(s):
    return "'" + s + "'"

class DB(object):

    def __init__(self, modelname=None):
        self.modelname = modelname
        self.conf = dbconfig.config
        self.pool = pooling.MySQLConnectionPool(pool_size=15, pool_name='pool',**self.conf)

    def insert(self, insertdict):
        try:
            insert = "INSERT INTO "  + self.modelname + " "
            
            keysection = "("
            valsection = "("
            for k in insertdict:
                keysection += k + ","
                if isinstance(insertdict[k], str):
                    insertdict[k] = _wrap(insertdict[k])
                valsection += str(insertdict[k]) + ","
            keysection = keysection[0:len(keysection) - 1] + ")"
            valsection = valsection[0:len(valsection) - 1] + ")"

            insert += keysection + " VALUES " + valsection + ';'
            log.d(insert)

            conn = self.pool.get_connection()
            conn.get_warnings = True
            cursor = conn.cursor(dictionary=True)
            cursor.execute(insert)
            conn.commit()
            conn.close()
        except Exception as e:
            return (False, e)
        else:
            return (True,)

    def update(self, update, match={}):
        try:
            sql = "UPDATE " + self.modelname + " SET "

            updatesection = ""
            matchsection = ""

            for k in update:
                if isinstance(update[k], str):
                    update[k] = _wrap(update[k])
                updatesection += k + "=" + str(update[k]) + ","
            updatesection = updatesection[0:len(updatesection) - 1]

            for k in match:
                if isinstance(match[k], str):
                    match[k] = _wrap(match[k])
                matchsection += k + "=" + str(match[k]) + " AND "
            matchsection = matchsection[0:len(matchsection) - 5]

            sql += updatesection

            if len(matchsection):
                sql += " WHERE " + matchsection

            log.d(sql)

            conn = self.pool.get_connection()
            conn.get_warnings = True
            cursor = conn.cursor(dictionary=True)
            cursor.execute(sql)
            conn.commit()
            conn.close()
        except Exception as e:
            return (False, e)
        else:
            return (True,)

    def select(self, select={}, match={}):
        try:
            sql = "SELECT "
            
            selectsection = ""
            for k in select:
                if int(select[k]) == 1:
                    selectsection += k + ","
            selectsection = selectsection[0:len(selectsection) - 1]

            if len(select) == 0:
                selectsection = "*"

            matchsection = ""
            for k in match:
                if isinstance(match[k], str):
                    match[k] = _wrap(match[k])
                matchsection += k + "=" + str(match[k]) + " AND "
            matchsection = matchsection[0:len(matchsection) - 5]
            
            sql += selectsection + " FROM " + self.modelname
            
            if len(matchsection):
                sql += " WHERE " + matchsection
            
            log.d(sql) 

            conn = self.pool.get_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(sql)
            rows = cursor.fetchall()
            conn.close()

        except Exception as e:
            return (False, e)
        else:
            return (True,rows)

    def delete(self, match={}, force=False):
        try:
            sql = "DELETE FROM " + self.modelname

            matchsection = ""
            for k in match:
                if isinstance(match[k], str):
                    match[k] = _wrap(match[k])
                matchsection += k + "=" + str(match[k]) + " AND "
            matchsection = matchsection[0:len(matchsection) - 5]

            if len(matchsection):
                sql += " WHERE " + matchsection
                force = True

            log.d(sql)

            if force:
                conn = mysql.connector.connect(**dbconfig.config)
                conn.get_warnings = True
                cursor = conn.cursor(dictionary=True)
                cursor.execute(sql)
                conn.commit()
                conn.close()
            else:
                msg = 'Delete all data needs to set force = True'
                raise Exception(msg)
        except Exception as e:
            return (False, e)
        else:
            return (True,)
