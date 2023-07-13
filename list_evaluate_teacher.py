import get_connector
import session

def render_interface():
    query = """SELECT p.nome, d.nome, e.nome, av.comentario, av.cod FROM avaliacao_professor av
        JOIN professor p on p.cod = av.FK_COD_PROF
        JOIN departamento d on d.cod = p.FK_COD_DPTO
        JOIN estudante e on av.FK_MATRICULA_ESTD = e.matricula"""

    get_connector.cursor.execute(query)
    avaliacoes = get_connector.cursor.fetchall()
    print("===================== Avaliacoes de Professores =======================")
    if not avaliacoes:
        print("Nenhuma avalicao cadastrada")
        return
    
    print("        Professor | Departamento | Aluno | Avaliacao")
    for i, avaliacao in enumerate(avaliacoes):
        print(f"[{i + 1}] ", "-> ", avaliacao[0], '|', avaliacao[1], '|', avaliacao[2], '|', avaliacao[3])
    print("=================================================================")
    print("[0] Denunciar Avalicao")
    print("[-1] Voltar")
    option = int(input("R: "))

    if option == -1:
        return
    
    codigo_avaliacao = int(input("Avaliacao a ser denunciada: "))
    motivo = input("Motivo: ")
    avaliacao = avaliacoes[codigo_avaliacao - 1][4]

    query = "insert into denuncia_professor(FK_COD_AVAL_PROF, Motivo, Status, FK_MATRICULA_ESTD) values (%s, %s, %s, %s)"
    values = (avaliacao, motivo, "Pendente", session.user["matricula"])

    get_connector.cursor.execute(query, values)
    if get_connector.cursor.rowcount > 0:
        print("Denuncia criada com sucesso")
    else:
        print("Erro ao criar denuncia")
    get_connector.commit()