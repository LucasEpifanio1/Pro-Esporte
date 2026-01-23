-- ============================================================
-- BANCO DE DADOS PRO ESPORTE
-- ============================================================

CREATE DATABASE IF NOT EXISTS ProEsporte;
USE ProEsporte;

-- ============================================================
-- TABELA: empresa
-- Armazena informações das empresas cadastradas no sistema
-- ============================================================
CREATE TABLE IF NOT EXISTS empresa (
  CNPJ CHAR(14) NOT NULL,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(100) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (CNPJ)
)/*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci*/;

-- ============================================================
-- TABELA: servidor_publico
-- Armazena informações dos servidores públicos do sistema
-- ============================================================
CREATE TABLE IF NOT EXISTS servidor_publico (
  CPF CHAR(11) NOT NULL,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (CPF)
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci*/;

-- ============================================================
-- TABELA: Cidadao
-- Armazena informações dos cidadãos cadastrados no sistema
-- ============================================================
CREATE TABLE IF NOT EXISTS Cidadao (
  ID_Cidadao INT NOT NULL,
  nome VARCHAR(100),
  Email VARCHAR(100),
  Senha VARCHAR(100),
  Peso FLOAT,
  Altura FLOAT,
  Objetivo VARCHAR(255),
  respondeuQuestionario BOOLEAN DEFAULT FALSE,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (ID_Cidadao)
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci*/;

-- ============================================================
-- TABELA: evento
-- Armazena informações dos eventos esportivos
-- Integra as chaves estrangeiras FK_Empresa e FK_Servidor
-- ============================================================
CREATE TABLE IF NOT EXISTS evento (
  ID_Evento INT NOT NULL,
  titulo VARCHAR(255),
  modalidade VARCHAR(255),
  local VARCHAR(255),
  data DATE,
  horario TIME,
  vagas INT,
  descricao TEXT,
  imagem VARCHAR(255),
  FK_Empresa CHAR(14) NULL,
  FK_Servidor CHAR(11) NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (ID_Evento),
  CONSTRAINT fk_evento_empresa 
    FOREIGN KEY (FK_Empresa) REFERENCES empresa(CNPJ) 
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_evento_servidor 
    FOREIGN KEY (FK_Servidor) REFERENCES servidor_publico(CPF) 
    ON DELETE SET NULL ON UPDATE CASCADE
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci*/;

-- ============================================================
-- TABELA: Participa
-- Tabela de relacionamento N:N entre Cidadao e Evento
-- ============================================================
CREATE TABLE IF NOT EXISTS Participa (
  ID_Cidadao INT NOT NULL,
  ID_Evento INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (ID_Cidadao, ID_Evento),
  CONSTRAINT fk_participa_cidadao 
    FOREIGN KEY (ID_Cidadao) REFERENCES Cidadao(ID_Cidadao)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_participa_evento 
    FOREIGN KEY (ID_Evento) REFERENCES evento(ID_Evento)
    ON DELETE CASCADE ON UPDATE CASCADE
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci*/;

-- ============================================================
-- MÓDULO DE TREINOS
-- ============================================================

-- ============================================================
-- TABELA: Exercicio
-- Armazena a escada de progressão de exercícios
-- ============================================================
CREATE TABLE IF NOT EXISTS Exercicio (
  id_exercicio INT NOT NULL,
  nome VARCHAR(100) NOT NULL,
  nivel INT NOT NULL, 
  descricao TEXT,
  grupo_muscular VARCHAR(100),
  tipo ENUM('Habilidade', 'Dinâmico', 'Estático'), 
  id_progressao INT, 
  id_regressao INT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_exercicio),
  CONSTRAINT fk_progressao 
    FOREIGN KEY (id_progressao) REFERENCES Exercicio(id_exercicio)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_regressao 
    FOREIGN KEY (id_regressao) REFERENCES Exercicio(id_exercicio)
    ON DELETE SET NULL ON UPDATE CASCADE
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci*/;

-- ============================================================
-- TABELA: Equipamento
-- Catálogo de equipamentos disponíveis
-- ============================================================
CREATE TABLE IF NOT EXISTS Equipamento (
  id_equipamento INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  categoria VARCHAR(50),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_equipamento)
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci*/;

-- ============================================================
-- TABELA: Exercicio_Equipamento
-- Relacionamento N:N entre Exercicio e Equipamento
-- Define quais exercícios precisam de quais equipamentos
-- ============================================================
CREATE TABLE IF NOT EXISTS Exercicio_Equipamento (
  id_exercicio INT NOT NULL,
  id_equipamento INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_exercicio, id_equipamento),
  CONSTRAINT fk_exercicio_equipamento_exercicio
    FOREIGN KEY (id_exercicio) REFERENCES Exercicio(id_exercicio)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_exercicio_equipamento_equipamento
    FOREIGN KEY (id_equipamento) REFERENCES Equipamento(id_equipamento)
    ON DELETE CASCADE ON UPDATE CASCADE
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci*/;

-- ============================================================
-- TABELA: Cidadao_Equipamento
-- Relacionamento N:N entre Cidadao e Equipamento
-- Define quais equipamentos o cidadão possui
-- ============================================================
CREATE TABLE IF NOT EXISTS Cidadao_Equipamento (
  ID_Cidadao INT NOT NULL,
  id_equipamento INT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (ID_Cidadao, id_equipamento),
  CONSTRAINT fk_cidadao_equipamento_cidadao
    FOREIGN KEY (ID_Cidadao) REFERENCES Cidadao(ID_Cidadao)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_cidadao_equipamento_equipamento
    FOREIGN KEY (id_equipamento) REFERENCES Equipamento(id_equipamento)
    ON DELETE CASCADE ON UPDATE CASCADE
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci*/;

-- ============================================================
-- TABELA: Rotina_Treino
-- Armazena os planos de treino gerados pelo sistema
-- Integra todas as colunas adicionadas via ALTER TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS Rotina_Treino (
  id_rotina_treino INT NOT NULL,
  ID_Cidadao INT NOT NULL,
  descricao VARCHAR(255),
  nivel INT,
  perfil_identificado VARCHAR(100),
  objetivo VARCHAR(50),
  divisao VARCHAR(100),
  instrucoes_gerais TEXT,
  dados_treino JSON,
  data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_rotina_treino),
  CONSTRAINT fk_rotina_treino_cidadao
    FOREIGN KEY (ID_Cidadao) REFERENCES Cidadao(ID_Cidadao)
    ON DELETE CASCADE ON UPDATE CASCADE
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci*/;

-- ============================================================
-- TABELA: Seleciona
-- Relacionamento entre Rotina_Treino e Exercicio
-- Define os parâmetros de cada exercício na rotina
-- ============================================================
CREATE TABLE IF NOT EXISTS Seleciona (
  id_seleciona int not null,
  id_rotina_treino INT NOT NULL,
  id_exercicio INT NOT NULL,
  series VARCHAR(50),
  repeticoes_ou_tempo VARCHAR(50), 
  ordem_execucao INT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_seleciona),
  CONSTRAINT fk_seleciona_rotina_treino
    FOREIGN KEY (id_rotina_treino) REFERENCES Rotina_Treino(id_rotina_treino)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_seleciona_exercicio
    FOREIGN KEY (id_exercicio) REFERENCES Exercicio(id_exercicio)
    ON DELETE CASCADE ON UPDATE CASCADE
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci*/;

-- ============================================================
-- TABELA: Registro_Treino
-- Armazena o histórico de performance dos treinos
-- ============================================================
CREATE TABLE IF NOT EXISTS Registro_Treino (
  id_registro INT NOT NULL,
  id_rotina_treino INT NOT NULL,
  id_exercicio INT NOT NULL, 
  data_execucao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  series_realizadas INT,
  reps_realizadas INT,
  percepcao_esforco INT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_registro),
  CONSTRAINT fk_registro_treino_rotina
    FOREIGN KEY (id_rotina_treino) REFERENCES Rotina_Treino(id_rotina_treino)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_registro_treino_exercicio
    FOREIGN KEY (id_exercicio) REFERENCES Exercicio(id_exercicio)
    ON DELETE CASCADE ON UPDATE CASCADE
) /*ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci*/;

-- ============================================================
-- COMANDOS ALTER TABLE ORIGINAIS (COMENTADOS)
-- ============================================================
-- Os comandos abaixo foram integrados diretamente na criação
-- das tabelas acima. Mantidos aqui apenas para referência.
-- ============================================================

/*
-- Adição de colunas FK_Empresa e FK_Servidor na tabela evento
ALTER TABLE evento 
ADD COLUMN FK_Empresa CHAR(14) NULL,
ADD COLUMN FK_Servidor CHAR(11) NULL;

-- Criação dos relacionamentos (Constraints) na tabela evento
ALTER TABLE evento
ADD CONSTRAINT fk_evento_empresa 
  FOREIGN KEY (FK_Empresa) REFERENCES empresa(CNPJ) 
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE evento
ADD CONSTRAINT fk_evento_servidor 
  FOREIGN KEY (FK_Servidor) REFERENCES servidor_publico(CPF) 
  ON DELETE SET NULL ON UPDATE CASCADE;

-- Adição da coluna respondeuQuestionario na tabela Cidadao
ALTER TABLE Cidadao ADD COLUMN respondeuQuestionario BOOLEAN DEFAULT FALSE;

-- Adição de colunas na tabela Rotina_Treino
ALTER TABLE Rotina_Treino
ADD COLUMN perfil_identificado VARCHAR(100),
ADD COLUMN objetivo VARCHAR(50),
ADD COLUMN divisao VARCHAR(100),
ADD COLUMN instrucoes_gerais TEXT,
ADD COLUMN dados_treino JSON,
ADD COLUMN createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
*/

-- ============================================================
-- COMANDOS DE VERIFICAÇÃO (COMENTADOS)
-- ============================================================
-- Descomente os comandos abaixo para verificar a estrutura
-- ============================================================

-- DESCRIBE empresa;
-- DESCRIBE servidor_publico;
-- DESCRIBE Cidadao;
-- DESCRIBE evento;
-- DESCRIBE Participa;
-- DESCRIBE Exercicio;
-- DESCRIBE Equipamento;
-- DESCRIBE Exercicio_Equipamento;
-- DESCRIBE Cidadao_Equipamento;
-- DESCRIBE Rotina_Treino;
-- DESCRIBE Seleciona;
-- DESCRIBE Registro_Treino;
-- SHOW TABLES;

-- ============================================================
-- FIM DO ARQUIVO
-- ============================================================