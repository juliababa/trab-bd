from typing import Any
from mysql.connector import connect # type: ignore

cnx: Any = connect(
    host='localhost',
    user='root',
    password='B@ba8474',
    database='mydb'
)

cursor: Any = cnx.cursor(buffered=True)

def commit():
    cnx.commit()
    
def fetchall_as_dict() -> list[Any]:
    columns = [column[0] for column in cursor.description]
    rows = cursor.fetchall()
    
    results: list[Any] = []
    for row in rows:
        results.append(dict(zip(columns, row)))
    
    return results

def close():
    cnx.close()