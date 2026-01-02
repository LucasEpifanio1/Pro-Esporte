create database if not exists ProEsporte;
use ProEsporte;

create table if not exists Pessoa_Fisica(
	CPF char(11) primary key
);

create table if not exists Pessoa_Juridica(
	CNPJ char(14) primary key
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
    Numero varchar(10)
);



