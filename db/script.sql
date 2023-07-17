-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `Estudante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Estudante` (
  `Matricula` INT NOT NULL,
  `Senha` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `Curso` VARCHAR(255) NOT NULL,
  `Cargo` VARCHAR(45) NOT NULL,
  `Nome` VARCHAR(255) NOT NULL,
  `Imagem` LONGBLOB NOT NULL,
  PRIMARY KEY (`Matricula`));


-- -----------------------------------------------------
-- Table `Departamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Departamento` (
  `COD` INT NOT NULL,
  `Nome` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`COD`));


-- -----------------------------------------------------
-- Table `Professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Professor` (
  `COD` INT NOT NULL AUTO_INCREMENT,
  `FK_COD_DPTO` INT NOT NULL,
  `Nome` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`COD`),
  INDEX `FK_COD_DPTO_idx` (`FK_COD_DPTO` ASC),
  CONSTRAINT `FK_COD_DPTO`
    FOREIGN KEY (`FK_COD_DPTO`)
    REFERENCES `Departamento` (`COD`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `Disciplina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Disciplina` (
  `COD` VARCHAR(45) NOT NULL,
  `Nome` VARCHAR(255) NOT NULL,
  `FK_COD_DPTO` INT NOT NULL,
  PRIMARY KEY (`COD`),
  INDEX `FK_DPTO_DISC_idx` (`FK_COD_DPTO` ASC),
  CONSTRAINT `FK_DPTO_DISC`
    FOREIGN KEY (`FK_COD_DPTO`)
    REFERENCES `Departamento` (`COD`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `Turma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Turma` (
  `COD` INT NOT NULL AUTO_INCREMENT,
  `FK_COD_DISC` VARCHAR(45) NOT NULL,
  `FK_COD_PROF` INT NOT NULL,
  PRIMARY KEY (`COD`),
  INDEX `FK_DISC_TURMA_idx` (`FK_COD_DISC` ASC),
  INDEX `fk_Turma_Professor1_idx` (`FK_COD_PROF` ASC),
  CONSTRAINT `FK_DISC_TURMA`
    FOREIGN KEY (`FK_COD_DISC`)
    REFERENCES `Disciplina` (`COD`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Turma_Professor1`
    FOREIGN KEY (`FK_COD_PROF`)
    REFERENCES `Professor` (`COD`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `Avaliação Professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Avaliacao_Professor` (
  `COMENTARIO` VARCHAR(255) NOT NULL,
  `FK_COD_PROF` INT NOT NULL,
  `FK_MATRICULA_ESTD` INT NOT NULL,
  `COD` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`COD`),
  INDEX `FK_PROF_AVAL_idx` (`FK_COD_PROF` ASC),
  INDEX `FK_PROF_ESTD_AVAL_idx` (`FK_MATRICULA_ESTD` ASC),
  CONSTRAINT `FK_PROF_AVAL`
    FOREIGN KEY (`FK_COD_PROF`)
    REFERENCES `Professor` (`COD`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_PROF_ESTD_AVAL`
    FOREIGN KEY (`FK_MATRICULA_ESTD`)
    REFERENCES `Estudante` (`Matricula`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `Avaliação Turma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Avaliacao_Turma` (
  `COMENTARIO` VARCHAR(255) NOT NULL,
  `FK_COD_TURMA` INT NOT NULL,
  `COD` INT NOT NULL AUTO_INCREMENT,
  `FK_MATRICULA_ESTD` INT NOT NULL,
  PRIMARY KEY (`COD`),
  INDEX `FK_TURMA_AVAL_idx` (`FK_COD_TURMA` ASC),
  INDEX `FK_TURMA_ESTD_AVAL_idx` (`FK_MATRICULA_ESTD` ASC),
  CONSTRAINT `FK_TURMA_AVAL`
    FOREIGN KEY (`FK_COD_TURMA`)
    REFERENCES `Turma` (`COD`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `Denuncia Professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Denuncia_Professor` (
  `STATUS` VARCHAR(45) NULL,
  `MOTIVO` VARCHAR(255) NOT NULL,
  `FK_COD_AVAL_PROF` INT NOT NULL,
  `FK_MATRICULA_ESTD` INT NOT NULL,
  PRIMARY KEY (`FK_COD_AVAL_PROF`, `FK_MATRICULA_ESTD`),
  INDEX `FK_AVAL_USER_idx` (`FK_MATRICULA_ESTD` ASC),
  CONSTRAINT `FK_AVAL_DENUN`
    FOREIGN KEY (`FK_COD_AVAL_PROF`)
    REFERENCES `Avaliacao_Professor` (`COD`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_AVAL_USER`
    FOREIGN KEY (`FK_MATRICULA_ESTD`)
    REFERENCES `Estudante` (`Matricula`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `Denuncia Turma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Denuncia_Turma` (
  `FK_COD_AVAL_TURMA` INT NOT NULL,
  `Motivo` VARCHAR(255) NOT NULL,
  `Status` VARCHAR(45) NULL,
  `FK_MATRICULA_ESTD` INT NOT NULL,
  PRIMARY KEY (`FK_COD_AVAL_TURMA`, `FK_MATRICULA_ESTD`),
  INDEX `fk_Denuncia Turma_Usuário1_idx` (`FK_MATRICULA_ESTD` ASC),
  CONSTRAINT `fk_Denuncia Turma_Turma1`
    FOREIGN KEY (`FK_COD_AVAL_TURMA`)
    REFERENCES `Avaliacao_Turma` (`COD`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Denuncia Turma_Usuário1`
    FOREIGN KEY (`FK_MATRICULA_ESTD`)
    REFERENCES `Estudante` (`Matricula`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `Turmas Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Turmas_Usuarios` (
  `TURMA_COD` INT NOT NULL,
  `ESTUDANTE_MATRICULA` INT NOT NULL,
  PRIMARY KEY (`TURMA_COD`, `ESTUDANTE_MATRICULA`),
  INDEX `fk_Turma_has_Usuário_Usuário1_idx` (`ESTUDANTE_MATRICULA` ASC),
  CONSTRAINT `fk_Turma_has_Usuário_Turma1`
    FOREIGN KEY (`TURMA_COD`)
    REFERENCES `Turma` (`COD`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Turma_has_Usuário_Usuário1`
    FOREIGN KEY (`ESTUDANTE_MATRICULA`)
    REFERENCES `Estudante` (`Matricula`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);