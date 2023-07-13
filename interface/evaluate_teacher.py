import get_connector
import session

def render_interface():
    query = """SELECT p.nome, di.nome, d.nome, p.cod FROM
        departamento d
        JOIN disciplina di on d.cod = di.FK_COD_DPTO
        JOIN turma t on t.FK_COD_DISC = di.cod
        JOIN turmas_usuarios tu on tu.TURMA_COD = t.cod
        JOIN professor p on t.FK_COD_PROF = p.cod 
        where tu.ESTUDANTE_MATRICULA = %s"""
    get_connector.cursor.execute(query, tuple([session.user["matricula"]]))
    professores = get_connector.cursor.fetchall()

    print("================ Avaliacao de Professores ================")
    print("Professores de Turmas Matriculadas:")
    if not professores:
        print("Nenhuma turma matriculada")
        return

    print("        Professor | Disciplina | Departamento")
    for i, professor in enumerate(professores):
        print(f"[{i + 1}] ", "-> ", professor[0], '|', professor[1], '|', professor[2])

    print("[-1] Voltar")
    print("=====================================================")

    professor = int(input("Selecione um professor para avaliar: "))
    professor = professores[professor - 1][3]

    if professor == -1:
        return
    
    avaliacao = input("Escreva sua avaliacao: ")

    query = "insert into avaliacao_professor(COMENTARIO, FK_COD_PROF, FK_MATRICULA_ESTD) values(%s, %s, %s)"
    values = (avaliacao, professor, session.user["matricula"])
    get_connector.cursor.execute(query, values)

    if get_connector.cursor.rowcount > 0:
        print("Avaliacao Realizada com Sucesso")
    else:
        print("Erro ao realizar avaliacao")
    get_connector.commit()