USE `mydb` ;
SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

CREATE VIEW vagas_ocupadas_disciplinas as
SELECT d.nome "Departamento", COUNT(e.Matricula) "Vagas Ocupadas", t.cod "Código da Turma", di.nome "Disciplina", p.nome "Professor"
FROM departamento d
JOIN disciplina di on d.cod = di.FK_COD_DPTO
JOIN turma t on t.FK_COD_DISC = di.cod
JOIN turmas_usuarios tu on tu.TURMA_COD = t.cod
JOIN estudante e on e.Matricula = tu.ESTUDANTE_MATRICULA
JOIN professor p on p.cod = t.FK_COD_PROF
GROUP BY di.nome;

select * from vagas_ocupadas_disciplinas;