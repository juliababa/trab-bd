import get_connector

def get_cargo(cargo_id):
    if (cargo_id == 0):
        return "Aluno"
    else:
        return "Administrador"

def render_interface():
    print("Criacao de usuario")
    matricula = input("Matricula: ")
    nome = input("Nome: ")
    email = input("Email: ")
    senha = input("Senha: ")
    curso = input("Curso: ")
    cargo = get_cargo(int(input("Cargo [0]Aluno [1]Administrador: ")))
    query = "CALL CreateStudentWithTurmas(5, %s, %s, %s, %s, %s, %s)"
    values = (matricula, senha, email, curso, cargo, nome)
    get_connector.cursor.execute(query, values)
    if get_connector.cursor.rowcount > 0:
        print("Usuario criado com sucesso")
    else:
        print("Nao foi possivel criar o usuario")
    get_connector.commit()

    