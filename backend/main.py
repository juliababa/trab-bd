from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from enum import Enum
from fastapi.middleware.cors import CORSMiddleware

from connector import cursor, commit, fetchall_as_dict
from session import Session

class EvaluationType(str, Enum):
    turma =  "turma"
    professor = "professor"
    
class ReportStatus(str, Enum):
    pendente = "Pendente"
    ignorado = "Ignorado"

class UserRole(str, Enum):
    Administrador = "Administrador"
    Aluno = "Aluno"

class User(BaseModel):
    nome: str
    matricula: int
    email: str
    senha: str
    curso: str
    cargo: UserRole
    imagem: str
    
class Evaluation(BaseModel):
    cod: int
    comentario: str
    tipo: EvaluationType

class EditUser(BaseModel):
    email: str
    senha: str
    imagem: str

class Report(BaseModel):
    cod: int
    motivo: str
    tipo: EvaluationType

app = FastAPI()

session = Session()

def check_logged():
    user = session.get_user()
    if not user:
        raise HTTPException(status_code=401, detail="Usuário não logado")
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    
@app.post("/login")
async def login(matricula: int, senha: str):
    query = "SELECT * FROM estudante WHERE matricula = %s and senha = %s"
    values = (matricula, senha)
    try:
        cursor.execute(query, values)
        user = cursor.fetchone()
        if user:
            session.set_user(user)
            return {"message": "Usuario logado com sucesso"}
        raise Exception
    except:
        raise HTTPException(status_code=401, detail="Falha ao realizar login")

@app.post("/users")
async def create_user(user: User):
    image = user.imagem.encode()
    query = "CALL CreateStudentWithTurmas(4, %s, %s, %s, %s, %s, %s, %s)"
    values = (user.matricula, user.senha, user.email, user.curso, user.cargo, user.nome, image)
    try:
        cursor.execute(query, values)
        if cursor.rowcount > 0:
            commit()
            return {"message": "Usuario criado com sucesso"}
        raise Exception
    except:
        raise HTTPException(status_code=500, detail="Erro ao criar usuário")
    
@app.delete("/users")
async def delete_user(matricula: str):
    query = "DELETE FROM estudante where matricula = %s"
    values = (matricula,)
    try:
        cursor.execute(query, values)
        commit()
        return {"message": "Usuario excluído com sucesso"}
    except:
        raise HTTPException(status_code=500, detail="Erro ao excluir usuário")

@app.get("/users/me")
async def get_user_info():
    check_logged()
    user = session.get_user()
    return user

@app.put("/users/me")
async def update_user_info(edit_info: EditUser):
    check_logged()
    user = session.get_user()
    query = "UPDATE estudante SET email = %s, senha = %s, imagem = %s where matricula = %s"
    values = (edit_info.email, edit_info.senha, edit_info.imagem.encode(), user['matricula'])
    try:
        cursor.execute(query, values)
        if cursor.rowcount > 0:
            user = session.update_user(edit_info.email, edit_info.senha, edit_info.imagem)
            commit()
            if user:
                user["senha"]
            return user
        
        raise Exception        
    except:
        raise HTTPException(status_code=500, detail="Erro ao atualizar dados")
    
@app.get("/classes/me")
def list_classes():
    check_logged()
    query = """SELECT t.cod turma, di.nome materia, p.nome professor FROM
        disciplina di
        JOIN turma t on t.FK_COD_DISC = di.cod
        JOIN turmas_usuarios tu on tu.TURMA_COD = t.cod
        JOIN professor p on p.cod = t.fk_cod_prof
        where tu.ESTUDANTE_MATRICULA = %s"""
    matricula = session.get_matricula()
    try:
        cursor.execute(query, (matricula,))
        return fetchall_as_dict()
    except:
        raise HTTPException(status_code=500, detail="Erro ao listar turmas")
    
@app.post("/evaluate")
def evaluate(evaluation: Evaluation):
    check_logged()
    values = (evaluation.comentario, evaluation.cod, session.get_matricula())
    query = ""
    if evaluation.tipo == EvaluationType.turma:
        query = "INSERT INTO avaliacao_turma(COMENTARIO, FK_COD_TURMA, FK_MATRICULA_ESTD) values(%s, %s, %s)"

    if evaluation.tipo == EvaluationType.professor:
        query = "INSERT INTO avaliacao_professor(COMENTARIO, FK_COD_PROF, FK_MATRICULA_ESTD) values(%s, %s, %s)"

    try:
        cursor.execute(query, values)
        commit()
        return { "message": "Avaliação criada com sucesso" }
    except:
        raise HTTPException(status_code=500, detail="Erro ao criar avaliacao")
    
@app.get("/teachers/me")
def list_teachers():
    check_logged()
    query = """SELECT p.cod, p.nome professor FROM
        turma t
        JOIN turmas_usuarios tu on tu.TURMA_COD = t.cod
        JOIN professor p on t.FK_COD_PROF = p.cod 
        where tu.ESTUDANTE_MATRICULA = %s"""
    matricula = session.get_matricula()
    try:
        cursor.execute(query, (matricula,))
        return fetchall_as_dict()
    except:
        raise HTTPException(status_code=500, detail="Erro ao listar professores")

@app.get("/evaluations")
def list_evaluations():
    check_logged()
    query_turmas = """SELECT t.cod cod, di.nome nome, e.nome estudante, e.imagem, av.comentario, av.cod cod_avaliacao
        FROM avaliacao_turma av
        JOIN turma t on av.FK_COD_TURMA = t.cod
        JOIN disciplina di on di.cod = t.FK_COD_DISC
        JOIN estudante e on e.matricula = av.FK_MATRICULA_ESTD"""
    
    query_professores = """SELECT p.cod cod, p.nome nome, e.nome estudante, e.imagem, av.comentario, av.cod cod_avaliacao
        FROM avaliacao_professor av
        JOIN professor p on p.cod = av.FK_COD_PROF
        JOIN estudante e on av.FK_MATRICULA_ESTD = e.matricula"""

    try:
        cursor.execute(query_turmas)
        turmas = fetchall_as_dict()
        
        for turma in turmas:
            turma["tipo"] = "turma"
        
        cursor.execute(query_professores)
        professores = fetchall_as_dict()
        
        for professor in professores:
            professor["tipo"] = "professor"
        
        return turmas + professores
    except:
        raise HTTPException(status_code=500, detail="Erro ao listar avaliações")    

@app.get("/evaluations/me")
def list_current_user_evaluations():
    check_logged()
    query_turmas = """SELECT t.cod cod, di.nome nome, e.nome estudante, e.imagem, av.comentario, av.cod cod_avaliacao
        FROM avaliacao_turma av
        JOIN turma t on av.FK_COD_TURMA = t.cod
        JOIN disciplina di on di.cod = t.FK_COD_DISC
        JOIN estudante e on e.matricula = av.FK_MATRICULA_ESTD
        WHERE e.matricula = %s"""
    
    query_professores = """SELECT p.cod cod, p.nome nome, e.nome estudante, e.imagem, av.comentario, av.cod cod_avaliacao
        FROM avaliacao_professor av
        JOIN professor p on p.cod = av.FK_COD_PROF
        JOIN estudante e on av.FK_MATRICULA_ESTD = e.matricula
        WHERE e.matricula = %s"""
    
    value = (session.get_matricula(),)
    
    try:
        cursor.execute(query_turmas, value)
        turmas = fetchall_as_dict()
        
        for turma in turmas:
            turma["tipo"] = EvaluationType.turma
        
        cursor.execute(query_professores, value)
        professores = fetchall_as_dict()
        
        for professor in professores:
            professor["tipo"] = EvaluationType.professor
        
        return turmas + professores
    except:
        raise HTTPException(status_code=500, detail="Erro ao listar avaliações")
    
@app.put("/evaluations/me")
def edit_evaluation(evaluation: Evaluation):
    check_logged()
    
    query = ""
    values = (evaluation.comentario, evaluation.cod)
    
    if evaluation.tipo == EvaluationType.turma:
        query = "UPDATE avaliacao_turma set comentario = %s where cod = %s"
        
    if evaluation.tipo == EvaluationType.professor:
        query = "UPDATE avaliacao_professor set comentario = %s where cod = %s"

    try:
        cursor.execute(query, values)
        commit()
        return {"message": "Avaliação editada com sucesso"}
    except:
        raise HTTPException(status_code=500, detail="Erro ao editar avaliação")

@app.delete("/evaluations")
def delete_evaluation(cod: int, tipo: EvaluationType):
    check_logged()
    values = (cod,)
    query = ""
    if tipo == EvaluationType.turma:
        query = "DELETE from avaliacao_turma where cod = %s"
    
    if tipo == EvaluationType.professor:
        query = "DELETE from avaliacao_professor where cod = %s"
    
    try:
        cursor.execute(query, values)
        commit()
        return {"message": "Avaliação excluída com sucesso"}
    except:
        raise HTTPException(status_code=500, detail="Erro ao excluir avaliação")
    
@app.post("/evaluations/report")
def create_report(report: Report):
    check_logged()
    values = (report.cod, report.motivo, ReportStatus.pendente, session.get_matricula())
    query = ""
    if report.tipo == EvaluationType.turma:
        query = """INSERT INTO denuncia_turma(FK_COD_AVAL_TURMA, Motivo, Status, FK_MATRICULA_ESTD)
            VALUES (%s, %s, %s, %s)"""
    
    if report.tipo == EvaluationType.professor:
        query = """INSERT INTO denuncia_professor(FK_COD_AVAL_PROF, Motivo, Status, FK_MATRICULA_ESTD)
            VALUES (%s, %s, %s, %s)"""
        
    try:
        cursor.execute(query, values)
        commit()
        return { "message": "Denúncia criada com sucesso" }
    except Exception:
        raise HTTPException(status_code=500, detail=f"Erro ao criar denúncia")
    
@app.get("/reports")
def list_reports():
    check_logged()
    query_teacher_reports = """SELECT av.cod, av.comentario, dp.motivo, e.nome estudante, e.imagem, e.matricula, p.nome, dp.FK_COD_AVAL_PROF cod_denuncia
        FROM denuncia_professor dp
        JOIN avaliacao_professor av on av.cod = dp.FK_COD_AVAL_PROF
        JOIN professor p on p.cod = av.FK_COD_PROF
        JOIN estudante e on e.matricula = av.FK_MATRICULA_ESTD
        WHERE status = %s"""
    
    query_class_reports = """SELECT av.cod, av.comentario, dt.motivo, e.nome estudante, e.imagem, e.matricula, d.nome, dt.FK_COD_AVAL_TURMA cod_denuncia
        FROM denuncia_turma dt
        JOIN avaliacao_turma av on av.cod = dt.FK_COD_AVAL_TURMA
        JOIN turma t on t.cod = av.FK_COD_TURMA
        JOIN disciplina d on d.cod = t.FK_COD_DISC
        JOIN estudante e on e.matricula = av.FK_MATRICULA_ESTD
        WHERE status = %s"""
    
    values = (ReportStatus.pendente, )
    
    try:
        cursor.execute(query_teacher_reports, values)
        teacher_reports = fetchall_as_dict()
        
        cursor.execute(query_class_reports, values)
        class_reports = fetchall_as_dict()
        
        for report in teacher_reports:
            report["tipo"] = EvaluationType.professor

        for report in class_reports:
            report["tipo"] = EvaluationType.turma
        
        return class_reports + teacher_reports
    except:
        raise HTTPException(status_code=500, detail="Erro ao listar denúncias")
    
@app.put("/reports/ignore")
def ignore_report(cod: int, matricula: int, tipo: EvaluationType):
    check_logged()
    
    values = (ReportStatus.ignorado, cod, matricula)
    query = ""
    if tipo == EvaluationType.turma:
        query = """UPDATE denuncia_turma SET `status` = %s
            WHERE FK_COD_AVAL_TURMA = %s and FK_MATRICULA_ESTD = %s"""
        
    if tipo == EvaluationType.professor:
        query = """UPDATE denuncia_professor SET `status` =  %s
            WHERE FK_COD_AVAL_PROF = %s and FK_MATRICULA_ESTD = %s"""

    try:
        cursor.execute(query, values)
        commit()
        return { "message": "Denúncia ignorada com sucesso" }
    except:
        raise HTTPException(status_code=500, detail="Erro ao ignorar denúncia")