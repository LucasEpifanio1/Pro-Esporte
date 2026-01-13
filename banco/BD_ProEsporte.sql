create database if not exists ProEsporte;
use ProEsporte;

create table if not exists Pessoa_Fisica(
	CPF char(11) primary key
);

create table if not exists Pessoa_Juridica(
	CNPJ char(14) primary key
);

create table if not exists Organizador(
	ID_Organizador int,
    nome varchar(100),
    Email varchar(100),
    Senha varchar(100),
    CPF char(11),
    CNPJ char(14),
    primary key(Id_Organizador, CPF, CNPJ),
    foreign key (CPF) references Pessoa_Fisica(CPF),
    foreign key (CNPJ) references Pessoa_Juridica(CNPJ)
);

create table if not exists Evento(
	ID_Evento int primary key,
	Nome varchar(100),
    Data date,
    Categoria varchar(100),
    CEP char(8),
    Rua varchar(100),
    Bairro varchar(100),
    Numero varchar(10),
    FK_Empresa varchar(14),
    FK_Servidor varchar(11)
);

ALTER TABLE Evento 
ADD CONSTRAINT fk_evento_empresa 
FOREIGN KEY (FK_Empresa) REFERENCES empresa(CNPJ) 
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE Evento 
ADD CONSTRAINT fk_evento_servidor 
FOREIGN KEY (FK_Servidor) REFERENCES servidor_publico(CPF) 
ON DELETE SET NULL ON UPDATE CASCADE;

describe evento;

create table if not exists Organiza(
	ID_Organizador int,
    ID_Evento int,
    primary key(ID_Organizador, ID_Evento),
    foreign key (ID_Organizador) references Organizador(ID_Organizador),
    foreign key (ID_Evento) references Evento(ID_Evento)
);

create table if not exists Cidadao(
	ID_Cidadao int primary key,
    nome varchar(100),
    Email varchar(100),
    Senha varchar(100),
    Peso float,
    Altura float,
    Objetivo varchar(255)
);

create table if not exists Participa(
	ID_Cidadao int,
    ID_Evento int,
    primary key(ID_Cidadao, ID_Evento),
    foreign key (ID_Cidadao) references Cidadao(ID_Cidadao),
    foreign key (ID_Evento) references Evento(ID_Evento)
);

-- 1. Exercício (A escada de progressão)
CREATE TABLE if not exists Exercicio (
    id_exercicio INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nivel INT NOT NULL, 
    descricao TEXT,
    grupo_muscular VARCHAR(100),
    tipo ENUM('estático', 'dinâmico'), 
    id_progressao INT, 
    id_regressao INT,  
    CONSTRAINT fk_progressao FOREIGN KEY (id_progressao) REFERENCES Exercicio(id_exercicio),
    CONSTRAINT fk_regressao FOREIGN KEY (id_regressao) REFERENCES Exercicio(id_exercicio)
);

-- 2. Equipamento (O catálogo de equipamentos)
CREATE TABLE if not exists Equipamento (
    id_equipamento INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) 
);

-- 3. Exercicio_Equipamento (Quais exercícios precisam de quais materiais)
CREATE TABLE if not exists Exercicio_Equipamento (
    id_exercicio INT,
    id_equipamento INT,
    PRIMARY KEY (id_exercicio, id_equipamento),
    FOREIGN KEY (id_exercicio) REFERENCES Exercicio(id_exercicio),
    FOREIGN KEY (id_equipamento) REFERENCES Equipamento(id_equipamento)
);

-- 4. Cidadao_Equipamento (O que o utilizador tem em casa/praça)
CREATE TABLE if not exists Cidadao_Equipamento (
    id_cidadao INT,
    id_equipamento INT,
    PRIMARY KEY (id_cidadao, id_equipamento),
    FOREIGN KEY (id_cidadao) REFERENCES Cidadao(id_cidadao),
    FOREIGN KEY (id_equipamento) REFERENCES Equipamento(id_equipamento)
);

-- 5. Rotina_Treino (O plano gerado pelo KNN)
CREATE TABLE if not exists Rotina_Treino (
    id_rotina_treino INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(255),
    nivel INT, 
    id_cidadao INT,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cidadao) REFERENCES Cidadao(id_cidadao)
);

-- 6. Seleciona (Parâmetros de cada exercício na rotina)
CREATE TABLE if not exists Seleciona (
    id_rotina_treino INT,
    id_exercicio INT,
    series INT,
    repeticoes_ou_tempo INT, 
    ordem_execucao INT, 
    PRIMARY KEY (id_rotina_treino, id_exercicio),
    FOREIGN KEY (id_rotina_treino) REFERENCES Rotina_Treino(id_rotina_treino),
    FOREIGN KEY (id_exercicio) REFERENCES Exercicio(id_exercicio)
);

-- 7. Registro_Treino (Histórico de performance)
CREATE TABLE if not exists Registro_Treino (
    id_registro INT PRIMARY KEY AUTO_INCREMENT,
    id_rotina_treino INT,
    id_exercicio INT, 
    data_execucao DATETIME DEFAULT CURRENT_TIMESTAMP,
    series_realizadas INT,
    reps_realizadas INT,
    percepcao_esforco INT, 
    FOREIGN KEY (id_rotina_treino) REFERENCES Rotina_Treino(id_rotina_treino),
    FOREIGN KEY (id_exercicio) REFERENCES Exercicio(id_exercicio)
);

-- SET FOREIGN_KEY_CHECKS = 0;
-- DROP TABLE rotina_treino, registro_treino, guarda, exercicio, seleciona, equipamento, pode_usar; -- Apaga múltiplas tabelas em um único comando
-- SET FOREIGN_KEY_CHECKS = 1;

show tables
;