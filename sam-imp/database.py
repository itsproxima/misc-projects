import pymysql

class Database:

    def __init__(self):
        print("inside of database connector constructor")
        self.user_name = "root"
        self.passwd = "HelloDude"
        self.hostname = "localhost"
        self.port = 3306
        self.db = "mobile"
        self.conn = pymysql.connect(host= self.hostname, user = self.user_name, passwd = self.passwd, db = self.db, cursorclass=pymysql.cursors.DictCursor)
        self.cur = self.conn.cursor()

    def get_connection(self):
        return self.cur

    def execute_query(self, query = None, format = True):
        if not query:
            print("Provide a valid query")
            return None
        self.cur.execute(query)
        self.conn.commit()
        return self.cur.fetchall()



