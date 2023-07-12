import get_connector
import session

def render_interface():
    query = """SELECT t.cod, di.nome, d.nome FROM
        departamento d
        JOIN disciplina di on d.cod = di.FK_COD_DPTO
        JOIN turma t on t.FK_COD_DISC = di.cod
        JOIN turmas_usuarios tu on tu.TURMA_COD = t.cod
        where tu.ESTUDANTE_MATRICULA = %s"""
    get_connector.cursor.execute(query, tuple([session.user["matricula"]]))
    turmas = get_connector.cursor.fetchall()

    print("================ Avaliacao de Turmas ================")
    print("Turmas Matriculadas:")
    if not turmas:
        print("Nenhuma turma matriculada")
        return

    print("        Turma | Disciplina | Departamento")
    for i, turma in enumerate(turmas):
        print(f"[{i + 1}] ", "-> ", turma[0], '|', turma[1], '|', turma[2])

    print("[-1] Voltar")
    print("=====================================================")

    turma = int(input("Selecione uma turma para avaliar: "))
    turma = turmas[turma - 1][0]

    if turma == -1:
        return
    
    avaliacao = input("Escreva sua avaliacao: ")

    query = "insert into avaliacao_turma(COMENTARIO, FK_COD_TURMA, FK_MATRICULA_ESTD) values(%s, %s, %s)"
    values = (avaliacao, turma, session.user["matricula"])
    get_connector.cursor.execute(query, values)

    if get_connector.cursor.rowcount > 0:
        print("Avaliacao Realizada com Sucesso")
    else:
        print("Erro ao realizar avaliacao")
    get_connector.commit()