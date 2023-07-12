import get_connector
import session

def render_interface():
    print("======================= Perfil =========================")
    print(f"Matrícula: {session.user['matricula']}")
    print(f"Email: {session.user['email']}")
    print(f"Curso: {session.user['curso']}")
    print(f"Cargo: {session.user['cargo']}")
    print(f"Nome: {session.user['nome']}")

    print("[1] Editar Email e Senha")
    print('[-1] Voltar')
    print("========================================================")
    code = int(input("R: "))

    if code == -1:
        return
    
    email = input("Novo Email: ")
    senha = input("Nova Senha: ")

    query = "update estudante set email = %s, senha = %s where matricula = %s"
    values = (email, senha, session.user['matricula'])

    get_connector.cursor.execute(query, values)
    if get_connector.cursor.rowcount > 0:
        session.user['email'] = email
        session.user['senha'] = senha
        print("Dados alterados com sucesso")
    else:
        print("Ocorreu um erro ao alterar os dados")
    get_connector.commit()