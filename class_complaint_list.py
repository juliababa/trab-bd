import get_connector

def render_interface():
    query = """SELECT av.comentario, dt.motivo, dt.FK_COD_AVAL_TURMA, dt.FK_MATRICULA_ESTD, av.FK_MATRICULA_ESTD
        FROM denuncia_turma dt
        JOIN avaliacao_turma av on av.cod = dt.FK_COD_AVAL_TURMA
        WHERE status = 'Pendente'"""

    get_connector.cursor.execute(query)
    denuncias = get_connector.cursor.fetchall()
    print("===================== Denuncias de Avalicoes de Turmas =======================")
    if not denuncias:
        print("Nenhuma denuncia a ser avaliada")
        return
    
    print("        Comentario da Avaliacao | Motivo da Denuncia")
    for i, avaliacao in enumerate(denuncias):
        print(f"[{i + 1}] ", "-> ", avaliacao[0], '|', avaliacao[1])

    print("=================================================================")
    print("[0] Avaliar")
    print("[-1] Voltar")
    option = int(input("R: "))

    if option == -1:
        return
    
    code_denuncia = int(input("Qual denuncia deseja avaliar: "))
    denuncia = denuncias[code_denuncia - 1]

    print("[1] Aceitar e apagar comentario")
    print("[2] Aceitar, Apagar comentario e apagar usuario")
    print("[3] Ignorar")

    option = int(input("R: "))

    if option == 3:
        query = "UPDATE denuncia_turma set `status` = 'Ignorado' WHERE FK_COD_AVAL_TURMA = %s and FK_MATRICULA_ESTD = %s"
        values = (denuncia[2], denuncia[3])
        get_connector.cursor.execute(query, values)
        if get_connector.cursor.rowcount > 0:
            print("Denuncia ignorada com sucesso")
        else:
            print("Erro ao ignorar denuncia")
        get_connector.commit()
        return

    query = "DELETE FROM avaliacao_turma WHERE FK_MATRICULA_ESTD = %s"
    values = tuple([denuncia[4]])
    get_connector.cursor.execute(query, values)

    if option == 1:
        print("Denuncia aceita e comentario apagado")

    if option == 2:
        query = "DELETE FROM turmas_usuarios where ESTUDANTE_MATRICULA = %s"
        values = tuple([denuncia[4]])
        get_connector.cursor.execute(query, values)

        query = "DELETE FROM avaliacao_professor WHERE FK_MATRICULA_ESTD = %s"
        values = tuple([denuncia[4]])
        get_connector.cursor.execute(query, values)

        query = "DELETE FROM estudante where matricula = %s"
        values = tuple([denuncia[4]])
        get_connector.cursor.execute(query, values)

        print("Denuncia aceita, comentario e usuario apagado")

    get_connector.commit()

