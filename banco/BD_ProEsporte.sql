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

-- ALTER TABLE Evento ADD COLUMN FK_Empresa varchar(14);
-- ALTER TABLE Evento ADD COLUMN FK_Servidor varchar(11);

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

create table if not exists Rotina_Treino(
	ID_Rotina_Treino int,
    Descricao varchar(255),
    Nivel varchar(50),
    ID_Cidadao int,
    primary key (ID_Rotina_Treino, ID_Cidadao),
    foreign key (ID_Cidadao) references Cidadao(ID_Cidadao)
);

create table if not exists Registro_Treino(
	ID_Registro_Treino int primary key,
    data date
);

create table if not exists Guarda(
	ID_Rotina_Treino int,
    ID_Registro_Treino int,
    primary key (ID_Rotina_Treino, ID_Registro_Treino),
    foreign key (ID_Rotina_Treino) references Rotina_Treino(ID_Rotina_Treino),
    foreign key (ID_Registro_Treino) references Registro_Treino(ID_Registro_Treino)
);

create table if not exists Exercicio(
	ID_Exercicio int primary key,
    Nome varchar(100),
    Nivel varchar(50),
    Descricao varchar(255),
    Grupo_Muscular varchar(100)
);

create table if not exists Seleciona(
	ID_Rotina_Treino int,
    ID_Exercicio int,
    primary key (ID_Rotina_Treino, ID_Exercicio),
    foreign key (ID_Rotina_Treino) references Rotina_Treino(ID_Rotina_Treino),
    foreign key (ID_Exercicio) references Exercicio(ID_Exercicio)
);

create table if not exists Equipamento(
	ID_Equipamento int primary key,
    Nome varchar(100),
    Peso float
);

create table if not exists Pode_Usar(
	ID_Equipamento int,
    ID_Exercicio int,
    primary key(ID_Equipamento, ID_Exercicio),
    foreign key (ID_Equipamento) references Equipamento (ID_Equipamento),
    foreign key (ID_Exercicio) references Exercicio (ID_Exercicio)
);

show tables
;