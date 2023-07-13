import session
import get_connector

def render_interface():
    query = """SELECT t.cod, di.nome, d.nome, av.comentario, av.cod FROM avaliacao_turma av
        JOIN turma t on av.FK_COD_TURMA = t.cod
        JOIN disciplina di on di.cod = t.FK_COD_DISC
        JOIN departamento d on d.cod = di.FK_COD_DPTO
        JOIN estudante e on e.matricula = av.FK_MATRICULA_ESTD
        WHERE e.matricula = %s"""
    
    values = tuple([session.user["matricula"]])

    get_connector.cursor.execute(query, values)
    avaliacoes = get_connector.cursor.fetchall()
    print("===================== Minhas Avaliacoes de Turmas =======================")
    if not avaliacoes:
        print("Nenhuma avalicao cadastrada")
        return
    
    print("        Turma | Disciplina | Departamento | Avaliacao")
    for i, avaliacao in enumerate(avaliacoes):
        print(f"[{i + 1}] ", "-> ", avaliacao[0], '|', avaliacao[1], '|', avaliacao[2], '|', avaliacao[3])
    print("=================================================================")
    print("[1] Editar Avalicao")
    print("[2] Excluir Avaliacao")
    print("[-1] Voltar")
    option = int(input("R: "))

    if option == -1:
        return
    
    if option == 1:
        codigo_avaliacao = int(input("Avaliacao a ser editada: "))
        avaliacao = avaliacoes[codigo_avaliacao - 1][4]

        comentario = input("Novo comentário: ")

        query = "update avaliacao_turma set comentario = %s where cod = %s"
        values = (comentario, avaliacao)

        get_connector.cursor.execute(query, values)
        if get_connector.cursor.rowcount > 0:
            print("Avaliacao Editada com sucesso")
        else:
            print("Erro ao editar avaliacao")


    if option == 2:
        codigo_avaliacao = int(input("Avaliacao a ser excluida: "))
        avaliacao = avaliacoes[codigo_avaliacao - 1][4]

        query = "DELETE from avaliacao_turma where cod = %s"
        values = tuple([avaliacao])

        get_connector.cursor.execute(query, values)
        if get_connector.cursor.rowcount > 0:
            print("Avaliacao excluida com sucesso")
        else:
            print("Erro ao excluir avaliacao")
    
    get_connector.commit()