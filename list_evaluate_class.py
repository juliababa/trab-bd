import get_connector
import session

def render_interface():
    query = """SELECT t.cod, di.nome, d.nome, e.nome, av.comentario, av.cod FROM avaliacao_turma av
        JOIN turma t on av.FK_COD_TURMA = t.cod
        JOIN disciplina di on di.cod = t.FK_COD_DISC
        JOIN departamento d on d.cod = di.FK_COD_DPTO
        JOIN estudante e on e.matricula = av.FK_MATRICULA_ESTD"""

    get_connector.cursor.execute(query)
    avaliacoes = get_connector.cursor.fetchall()
    print("===================== Avalicoes de Turmas =======================")
    if not avaliacoes:
        print("Nenhuma avalicao cadastrada")
        return
    
    print("        Turma | Disciplina | Departamento | Aluno | Avaliacao")
    for i, avaliacao in enumerate(avaliacoes):
        print(f"[{i + 1}] ", "-> ", avaliacao[0], '|', avaliacao[1], '|', avaliacao[2], '|', avaliacao[3], '|', avaliacao[4])
    print("=================================================================")
    print("[0] Denunciar Avalicao")
    print("[-1] Voltar")
    option = int(input("R: "))

    if option == -1:
        return
    
    codigo_avaliacao = int(input("Avaliacao a ser denunciada: "))
    motivo = input("Motivo: ")
    avaliacao = avaliacoes[codigo_avaliacao - 1][5]

    query = "insert into denuncia_turma(FK_COD_AVAL_TURMA, Motivo, Status, FK_MATRICULA_ESTD) values (%s, %s, %s, %s)"
    values = (avaliacao, motivo, "Pendente", session.user["matricula"])

    get_connector.cursor.execute(query, values)
    if get_connector.cursor.rowcount > 0:
        print("Denuncia criada com sucesso")
    else:
        print("Erro ao criar denuncia")
    get_connector.commit()