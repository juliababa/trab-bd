USE `mydb`;

INSERT INTO DEPARTAMENTO(COD, Nome) VALUES(640, "CENTRO DE DESENVOLVIMENTO SUSTENTÁVEL");
INSERT INTO DEPARTAMENTO(COD, Nome) VALUES(314, "CENTRO DE EXCELÊNCIA EM TURISMO");
INSERT INTO DEPARTAMENTO(COD, Nome) VALUES(508, "DEPTO CIÊNCIAS DA COMPUTAÇÃO");
INSERT INTO DEPARTAMENTO(COD, Nome) VALUES(443, "DEPTO ENGENHARIA ELETRICA");

-- INSERT INTO estudante(Matricula, Senha, Email, Curso, Cargo, Nome)
-- VALUES
--     ('190057921', 'password123', 'john.doe@example.com', 'Ciência da Computação', 'Aluno', 'John Doe'),
--     ('190065432', 'password456', 'jane.smith@example.com', 'Engenharia Elétrica', 'Aluno', 'Jane Smith'),
--     ('190073845', 'password789', 'david.johnson@example.com', 'Engenharia Mecânica', 'Aluno', 'David Johnson'),
--     ('200012345', 'passwordabc', 'sarah.davis@example.com', 'Engenharia Civil', 'Aluno', 'Sarah Davis'),
--     ('200023456', 'passworddef', 'michael.wilson@example.com', 'Engenharia Química', 'Aluno', 'Michael Wilson'),
--     ('210034567', 'passwordghi', 'emily.brown@example.com', 'Ciência da Computação', 'Aluno', 'Emily Brown'),
--     ('210045678', 'passwordjkl', 'daniel.taylor@example.com', 'Engenharia Elétrica', 'Aluno', 'Daniel Taylor'),
--     ('210056789', 'passwordmno', 'olivia.martinez@example.com', 'Engenharia Mecânica', 'Aluno', 'Olivia Martinez'),
--     ('220067890', 'passwordpqr', 'sophia.anderson@example.com', 'Engenharia Civil', 'Aluno', 'Sophia Anderson'),
--     ('220078901', 'passwordstu', 'william.clark@example.com', 'Engenharia Química', 'Aluno', 'William Clark'),
--     ('230089012', 'passwordvwx', 'emma.walker@example.com', 'Ciência da Computação', 'Aluno', 'Emma Walker'),
--     ('230090123', 'passwordyz1', 'liam.green@example.com', 'Engenharia Elétrica', 'Aluno', 'Liam Green'),
--     ('240101234', 'password234', 'ava.hall@example.com', 'Engenharia Mecânica', 'Administrador', 'Ava Hall'),
--     ('240112345', 'password567', 'noah.adams@example.com', 'Engenharia Civil', 'Administrador', 'Noah Adams'),
--     ('250123456', 'password890', 'mia.turner@example.com', 'Engenharia Química', 'Administrador', 'Mia Turner');

INSERT INTO professor(Nome, FK_COD_DPTO)
VALUES
    ('PEDRO DE AZEVEDO BERGER', 508),
    ('JORGE CARLOS LUCERO', 508),
    ('THIAGO DE PAULO FALEIROS', 508),
    ('MARCUS VINICIUS LAMAR', 508),
    ('LUIS PAULO FAINA GARCIA', 508),
    ('GIOVANNI ALMEIDA SANTOS', 508),
    ('FABRICIO ATAIDES BRAZ', 508),
    ('JOHN LENON CARDOSO GARDENGHI', 508),
    ('DANIEL SUNDFELD LIMA', 508),
    ('FABIANA FREITAS MENDES', 508),
    ('BRUNO CESAR RIBAS', 508),
    ('TIAGO ALVES DA FONSECA', 508),
    ('GUILHERME NOVAES RAMOS', 508),
    ('FRANK NED SANTA CRUZ DE OLIVEIRA', 508),
    ('CARLA DENISE CASTANHO', 508),
    ('LUCAS RODRIGUES COSTA', 508),
    ('ALINE BARROS DE SOUSA', 508),
    ('MARISTELA TERTO DE HOLANDA', 508),
    ('EDISON ISHIKAWA', 508),
    ('VINICIUS RUELA PEREIRA BORGES', 508),
    ('NILTON CORREIA DA SILVA', 508),
    ('MARIA DE FATIMA RAMOS BRANDAO', 508),
    ('CAMILO CHANG DOREA', 508),
    ('ROBERTA BARBOSA OLIVEIRA', 508);
INSERT INTO professor (FK_COD_DPTO, Nome)
VALUES
    ('443', 'FRANCISCO DAMASCENO FREITAS'),
    ('443', 'RAFAEL AMARAL SHAYANI'),
    ('443', 'AMAURI GUTIERREZ MARTINS BRITTO'),
    ('443', 'ALCIDES LEANDRO DA SILVA'),
    ('443', 'EDUARDO STOCKLER TOGNETTI'),
    ('443', 'LELIO RIBEIRO SOARES JUNIOR'),
    ('443', 'EDUARDO STOCKLER TOGNETTI'),
    ('443', 'FLAVIO ELIAS GOMES DE DEUS'),
    ('443', 'VINICIUS PEREIRA GONCALVES'),
    ('443', 'LUCIANO MAURO ARLEY SUP');
    
INSERT INTO professor (Nome, FK_COD_DPTO)
VALUES
    ('LAURA ANGELICA FERREIRA DARNET', 640),
    ('MAURO GUILHERME MAIDANA CAPPELLARO', 640),
    ('CRISTIANE GOMES BARRETO', 640),
    ('DORIS ALEIDA VILLAMIZAR SAYAGO', 640),
    ('ANA KARINE PEREIRA', 640),
    ('FREDERIC ADELIN GEORGES MERTENS', 640),
    ('ANA KARINE PEREIRA', 640),
    ('STEPHANIE CAROLINE NASUTI', 640),
    ('SAULO RODRIGUES PEREIRA FILHO', 640),
    ('MAURICIO DE CARVALHO AMAZONAS', 640);

INSERT INTO professor (FK_COD_DPTO, Nome)
VALUES
    ('314', 'MARIANA TOMAZIN'),
    ('314', 'AYLANA LAISSA MEDEIROS BORGES'),
    ('314', 'JEFFERSON LORENCINI GAZONI'),
    ('314', 'MARUTSCHKA MARTINI MOESCH'),
    ('314', 'ALESSANDRA SANTOS DOS SANTOS'),
    ('314', 'CAROLINA MENEZES PALHARES'),
    ('314', 'FAGNO TAVARES DE OLIVEIRA'),
    ('314', 'JOAO PAULO FARIA TASSO'),
    ('314', 'NEUZA DE FARIAS ARAUJO'),
    ('314', 'THIAGO SEBASTIANO DE MELO'),
    ('314', 'ANGELA TEBERGA DE PAULA'),
    ('314', 'LANA MAGALY PIRES'),
    ('314', 'ANA ROSA DOMINGUES DOS SANTOS'),
    ('314', 'LUIZ CARLOS SPILLER PENA'),
    ('314', 'EUZAMARA DE CARVALHO');

INSERT INTO disciplina (cod, Nome, FK_COD_DPTO)
VALUES
    ('CDS0004', 'AGRICULTURA E MEIO AMBIENTE', 640),
    ('CDS0007', 'INTRODUÇÃO AO DESENVOLVIMENTO SUSTENTÁVEL', 640),
    ('CDS0008', 'MEIO AMBIENTE, CULTURA E SOCIEDADE', 640),
    ('CDS0010', 'TRABALHO INTERDISCIPLINAR INTEGRADO 1', 640),
    ('CDS0011', 'SISTEMAS SOCIOAMBIENTAIS E COMPLEXIDADE', 640),
    ('CDS0012', 'POLÍTICAS PÚBLICAS E MEIO AMBIENTE', 640),
    ('CDS0013', 'POPULAÇÃO E MEIO AMBIENTE', 640),
    ('CDS0015', 'INDICADORES DE DESENVOLVIMENTO SUSTENTÁVEL', 640),
    ('CDS0019', 'PRÁTICA DE PESQUISA 1', 640);

INSERT INTO disciplina (cod, Nome, FK_COD_DPTO)
VALUES
    ('CIC0002', 'FUNDAMENTOS TEÓRICOS DA COMPUTAÇÃO', 508),
    ('CIC0003', 'INTRODUÇÃO AOS SISTEMAS COMPUTACIONAIS', 508),
    ('CIC0004', 'ALGORITMOS E PROGRAMAÇÃO DE COMPUTADORES', 508),
    ('CIC0005', 'FORMAÇÃO DOCENTE EM COMPUTAÇÃO', 508),
    ('CIC0007', 'INTRODUÇÃO À CIÊNCIA DA COMPUTAÇÃO', 508),
    ('CIC0087', 'TOPICOS AVANCADOS EM COMPUTADORES', 508),
    ('CIC0090', 'ESTRUTURAS DE DADOS', 508),
    ('CIC0093', 'LINGUAGENS DE PROGRAMACAO', 508),
    ('CIC0095', 'TEORIA DA COMPUTACAO', 508),
    ('CIC0097', 'BANCOS DE DADOS', 508),
    ('CIC0099', 'ORGANIZAÇÃO E ARQUITETURA DE COMPUTADORES', 508),
    ('CIC0101', 'SISTEMAS DE INFORMACAO', 508),
    ('CIC0104', 'SOFTWARE BASICO', 508),
    ('CIC0105', 'ENGENHARIA DE SOFTWARE', 508),
    ('CIC0108', 'SISTEMAS OPERACIONAIS', 508),
    ('CIC0124', 'REDES DE COMPUTADORES', 508);

INSERT INTO disciplina (cod, Nome, FK_COD_DPTO)
VALUES
    ('ENE0001', 'ELETRICIDADE BÁSICA', 443),
    ('ENE0002', 'LABORATÓRIO DE ELETRICIDADE BÁSICA', 443),
    ('ENE0004', 'CONTROLE DE PROCESSOS', 443),
    ('ENE0005', 'INSTRUMENTAÇÃO DE CONTROLE DE PROCESSOS', 443),
    ('ENE0006', 'LABORATÓRIO DE CONTROLE DE PROCESSOS', 443),
    ('ENE0011', 'LABORATÓRIO DE REDES', 443),
    ('ENE0013', 'ALGORITMOS E ESTRUTURA DE DADOS', 443),
    ('ENE0015', 'FUNDAMENTOS DE REDES 2', 443),
    ('ENE0016', 'GERÊNCIA DE REDES E SISTEMAS', 443);

INSERT INTO disciplina (cod, Nome, FK_COD_DPTO)
VALUES
    ('CET0001', 'PLANEJAMENTO E GESTÃO EM TURISMO 1', 314),
    ('CET0002', 'LEGISLAÇÃO TURÍSTICA', 314),
    ('CET0005', 'PLANEJAMENTO E GESTÃO EM TURISMO 2', 314),
    ('CET0006', 'FUNDAMENTOS DE ESTATÍSTICA APLICADO AO TURISMO', 314),
    ('CET0007', 'PROJETO INTEGRADOR EM TURISMO 3', 314),
    ('CET0012', 'ENOTURISMO', 314),
    ('CET0013', 'PESQUISA EM TURISMO', 314),
    ('CET0014', 'ESTRUTURAÇÃO E PROMOÇÃO DE DESTINOS', 314);

INSERT INTO turma(FK_COD_DISC, FK_COD_PROF)
SELECT t1.cod, t2.cod
FROM (
    SELECT cod, FK_COD_DPTO
    FROM disciplina
    ORDER BY RAND()
) AS t1
JOIN (
    SELECT cod, FK_COD_DPTO
    FROM professor
    ORDER BY RAND()
) AS t2
ON t1.FK_COD_DPTO = t2.FK_COD_DPTO;