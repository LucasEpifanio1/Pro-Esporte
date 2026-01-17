USE ProEsporte;

-- 1. Inserir uma Empresa (Organizadora do Evento)
INSERT INTO empresa (CNPJ, nome, email, senha, createdAt, updatedAt)
VALUES (
    '12345678000199', 
    'Barz Calistenia Club', 
    'contato@barzclub.com.br', 
    'senha123', 
    NOW(), 
    NOW()
);

-- 2. Inserir um Servidor Público
INSERT INTO servidor_publico (CPF, nome, email, senha, createdAt, updatedAt)
VALUES (
    '11122233344', 
    'Roberto Gestor', 
    'roberto.prefeitura@gov.br', 
    'admin123', 
    NOW(), 
    NOW()
);

-- 3. Inserir um Cidadão
INSERT INTO Cidadao (ID_Cidadao, nome, Email, Senha, Peso, Altura, Objetivo, respondeuQuestionario)
VALUES (
    1111111, 
    'Gustavo', 
    'gustavo@email.com', 
    'minhasenha', 
    72.5, 
    1.78, 
    'Força', 
    TRUE
);

-- 4. Inserir o Evento de Calistenia
-- Vinculado à Empresa criada acima (FK_Empresa)
INSERT INTO evento (
    ID_Evento, 
    titulo, 
    modalidade, 
    local, 
    data, 
    horario, 
    vagas, 
    descricao, 
    imagem, 
    createdAt, 
    updatedAt, 
    FK_Empresa, 
    FK_Servidor
)
VALUES (
    10010001, 
    'Aulão de Introdução à Calistenia', 
    'Calistenia',
    'Parque Ecológico - Área de Barras', 
    '2026-02-15', 
    '09:00:00',
    30, 
    'Venha aprender os fundamentos do Street Workout: Flexão, Barra Fixa e Paralelas. Aberto para iniciantes!',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIC1RRyE45nrqldun6Deg0jpDMWom_lO9Qbw&s',
    NOW(),
    NOW(), 
    '12345678000199',
    NULL 
);

INSERT INTO Participa (ID_Cidadao, ID_Evento)
VALUES (1111111, 10010001);