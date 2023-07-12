import mysql.connector
cnx = mysql.connector.connect(
    host='localhost',
    user='root',
    password='B@ba8474',
    database='mydb'
)

cursor = cnx.cursor()

def commit():
    cnx.commit()

def close():
    cnx.close()

# cursor.execute("SELECT * FROM departamento")
# rows = cursor.fetchall()
# for row in rows:
#     print(row)
