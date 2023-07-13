import get_connector
import session

def render_interface():
    matricula = input("Matricula: ")
    senha = input("Senha: ")

    query = "SELECT * FROM estudante WHERE matricula = %s and senha = %s"
    values = (matricula, senha)
    get_connector.cursor.execute(query, values)
    session.user = session.format_user(get_connector.cursor.fetchone())