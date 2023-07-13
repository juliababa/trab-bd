import mysql.connector
cnx = mysql.connector.connect(
    host='localhost',
    user='escrever_seu_usuario',
    password='escrever_sua_senha',
    database='mydb'
)

cursor = cnx.cursor(buffered=True)

def commit():
    cnx.commit()

def close():
    cnx.close()