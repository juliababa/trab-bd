USE `mydb`;
DELIMITER //

CREATE PROCEDURE CreateStudentWithTurmas(IN p_TurmasCount INT, IN p_Matricula INT, IN p_Senha VARCHAR(45), IN p_Email VARCHAR(255), IN p_Curso VARCHAR(255), IN p_Cargo VARCHAR(45), IN p_Nome VARCHAR(255), IN p_Imagem LONGBLOB)
BEGIN
    DECLARE turmaCount INT;
    DECLARE turmaID varchar(45);

    -- Get the number of turmas available in the department
    SELECT COUNT(*) INTO turmaCount FROM Turma;

    IF turmaCount < p_TurmasCount THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Insufficient turmas available in the department.';
    ELSE
	-- Insert the student record into the Estudante table
        INSERT INTO Estudante (Matricula, Senha, Email, Curso, Cargo, Nome, Imagem) VALUES (p_Matricula, p_Senha, p_Email, p_Curso, p_Cargo, p_Nome, p_Imagem);

        -- Iterate through the turmas and assign them to the student
        REPEAT
            -- Get a random turma ID from the department
            SET turmaID = (SELECT turma.COD FROM turma
                join disciplina on disciplina.cod = turma.FK_COD_DISC
                where disciplina.fk_cod_dpto not in (
                    SELECT disciplina.fk_cod_dpto FROM turmas_usuarios
						join turma on turma.cod = turmas_usuarios.TURMA_COD
						join disciplina on disciplina.cod = turma.FK_COD_DISC
						WHERE turmas_usuarios.ESTUDANTE_MATRICULA = p_Matricula
                ) and turma.COD NOT IN (
					SELECT TURMA_COD FROM turmas_usuarios
						join turma on turma.cod = turmas_usuarios.TURMA_COD
						join disciplina on disciplina.cod = turma.FK_COD_DISC
						WHERE turmas_usuarios.ESTUDANTE_MATRICULA = p_Matricula
				) ORDER BY rand() limit 1);

            -- Associate the student with the turma by inserting into the Matriculas table
            INSERT INTO turmas_usuarios(TURMA_COD, ESTUDANTE_MATRICULA) VALUES (turmaID, p_Matricula);

            SET p_TurmasCount = p_TurmasCount - 1;
        UNTIL p_TurmasCount <= 0 END REPEAT;
    END IF;
END //

DELIMITER ;