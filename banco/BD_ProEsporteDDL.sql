use ProEsporte;

INSERT INTO Equipamento (id_equipamento, nome, categoria) VALUES
(1, 'Barra Fixa/Porta', 'Puxar/Empurrar'),
(2, 'Barras Paralelas', 'Empurrar'),
(3, 'Paralelas Baixas/Médias (Paraletes)', 'Empurrar/Core'),
(4, 'Argolas Olímpicas', 'Misto'),
(5, 'Equipamento de Praça/Prefeitura', 'Geral');

insert into equipamento (id_equipamento, nome, categoria) values
(6, 'Chão/solo', 'Geral');

UPDATE equipamento 
SET nome = 'Chão/solo/parede' 
WHERE id_equipamento = 6;

SELECT * FROM proesporte.equipamento;

-- Inserção de Exercícios de Empurrar com Descrição
INSERT INTO Exercicio (id_exercicio, nome, nivel, tipo, descricao, id_regressao, id_progressao) VALUES
-- Nível 1
(101, 'Flexão na Parede', 1, 'Dinâmico', 'Flexão feita com as mãos apoiadas na parede e corpo inclinado.', NULL, 102),

-- Nível 2
(102, 'Flexão Inclinada', 2, 'Dinâmico', 'Mãos apoiadas em uma superfície alta (banco/mesa), pés no chão.', 101, 104),
(103, 'Tríceps Banco', 2, 'Dinâmico', 'De costas para um banco, desça o corpo flexionando os cotovelos.', NULL, 107),

-- Nível 3
(104, 'Flexão Padrão', 3, 'Dinâmico', 'Corpo reto, mãos no chão na largura dos ombros, peito até o chão.', 102, 105),
(105, 'Flexão Aberta', 3, 'Dinâmico', 'Mãos posicionadas além da largura dos ombros para focar no peito.', 104, 108),
(106, 'Dip (Paralelas)', 3, 'Dinâmico', 'Sustente o corpo nas barras paralelas e desça flexionando os braços.', 103, 112),

-- Nível 4
(107, 'Extensão de Tríceps', 4, 'Dinâmico', 'Flexão focada nos cotovelos, levando a testa em direção às mãos.', 103, NULL),
(108, 'Flexão Declinada', 4, 'Dinâmico', 'Pés apoiados em superfície alta, mãos no chão. Aumenta carga nos ombros.', 105, 110),
(109, 'Flexão Diamante', 4, 'Dinâmico', 'Mãos juntas formando um diamante, foco intenso no tríceps.', 104, 110),
(110, 'Flexão Pike', 4, 'Habilidade', 'Quadril elevado formando um V invertido, descendo o topo da cabeça.', 108, 113),

-- Nível 5
(111, 'Flexão Arqueiro', 5, 'Dinâmico', 'Uma mão esticada para o lado enquanto o outro braço faz a flexão.', 108, 114),
(112, 'Pseudo Flexão na Prancha', 5, 'Habilidade', 'Mãos na altura do quadril com inclinação do corpo para frente.', 108, 114),

-- Nível 6
(113, 'Handstand (Estático)', 6, 'Habilidade', 'Equilíbrio de cabeça para baixo sobre as mãos (pode ser na parede).', 110, 118),
(114, 'Flexão Russa', 6, 'Dinâmico', 'Flexão que transiciona para o apoio dos cotovelos no chão.', 108, 117),

-- Nível 7
(115, 'Tuck Planche', 7, 'Habilidade', 'Sustentar o corpo apenas nas mãos com joelhos recolhidos no peito.', 112, 116),
(116, 'Tuck Planche Avançada', 7, 'Habilidade', 'Tuck planche mas com as costas retas e joelhos afastados do peito.', 115, 117),

-- Nível 8
(117, 'One Leg Planche', 8, 'Habilidade', 'Planche com uma perna esticada e a outra recolhida.', 116, 119),
(118, 'Flexão na Handstand (HSPU)', 8, 'Dinâmico', 'Flexão vertical completa estando na posição de parada de mão.', 113, NULL),

-- Nível 9
(119, 'Straddle Planche', 9, 'Habilidade', 'Corpo paralelo ao chão com pernas esticadas e abertas.', 117, 120),

-- Nível 10
(120, 'Full Planche', 10, 'Habilidade', 'Corpo totalmente paralelo ao chão, braços esticados e pernas juntas.', 119, 121),
(121, 'Maltesa', 10, 'Habilidade', 'Planche com braços bem abertos, posição de cruz na argola ou chão.', 120, NULL);

UPDATE Exercicio 
SET grupo_muscular = 'Empurrar' 
WHERE id_exercicio BETWEEN 100 AND 199;

UPDATE Exercicio 
SET tipo = 'habilidade' 
WHERE tipo IS NULL OR tipo = '';

select * from exercicio where grupo_muscular = 'Empurrar';

-- INSERÇÃO DE EXERCÍCIOS DE PUXAR

INSERT INTO Exercicio (id_exercicio, nome, nivel, tipo, grupo_muscular, descricao, id_regressao, id_progressao) VALUES
(201, 'Pendurada Passiva', 1, 'Estático', 'Puxar', 'Segurar na barra com braços esticados e corpo relaxado.', NULL, 204),
(202, 'Remada com Toalha', 1, 'Dinâmico', 'Puxar', 'Remada horizontal usando uma toalha presa em um ponto fixo.', NULL, 205),
(203, 'Rear Delts no Chão', 1, 'Dinâmico', 'Puxar', 'Deitado de costas, empurre os cotovelos contra o chão para subir o peito.', NULL, 205),
(204, 'Ativação Escapular', 2, 'Dinâmico', 'Puxar', 'Pendurado, mova apenas as escápulas para cima e para baixo.', 201, 206),
(205, 'Barra Australiana', 2, 'Dinâmico', 'Puxar', 'Remada horizontal em barra baixa com pés no chão.', 202, 206),
(206, 'Barra Fixa', 3, 'Dinâmico', 'Puxar', 'Puxar o corpo até o queixo passar a barra.', 205, 207),
(207, 'Skin the Cat', 4, 'Habilidade', 'Puxar', 'Girar o corpo entre os braços pendurado na barra.', 206, 208),
(208, 'Tuck Back Lever', 5, 'Habilidade', 'Puxar', 'Sustentação de costas para o chão com joelhos no peito.', 207, 210),
(209, 'Tuck Front Lever', 5, 'Habilidade', 'Puxar', 'Sustentação de frente para a barra com joelhos no peito.', 206, 211),
(210, 'Back Lever', 8, 'Habilidade', 'Puxar', 'Corpo totalmente esticado e paralelo ao chão, de costas para baixo.', 208, NULL),
(211, 'Front Lever', 9, 'Habilidade', 'Puxar', 'Corpo totalmente esticado e paralelo ao chão, de frente para a barra.', 209, 212),
(212, 'Victorian', 10, 'Habilidade', 'Puxar', 'Sustentação horizontal abaixo das barras/argolas (nível elite).', 211, NULL);

UPDATE Exercicio 
SET tipo = 'estático' 
WHERE tipo IS NULL OR tipo = '';

select * from exercicio where grupo_muscular = 'Puxar';

INSERT INTO Exercicio
(id_exercicio, nome, nivel, tipo, grupo_muscular, descricao, id_regressao, id_progressao)
VALUES

-- NÍVEL 1
(300, 'Agachamento no Sofá', 1, 'Dinâmico', 'Pernas',
 'Agachamento utilizando o sofá como referência de altura para sentar e levantar.',
 NULL, 302),

(301, 'Elevação com Panturrilha', 1, 'Dinâmico', 'Pernas',
 'Elevação do corpo apoiando-se na ponta dos pés para ativação de panturrilhas.',
 NULL, 302),

-- NÍVEL 2
(302, 'Agachamento Padrão', 2, 'Dinâmico', 'Pernas',
 'Agachamento tradicional com pés afastados na largura dos ombros.',
 300, 304),

-- NÍVEL 3
(303, 'Agachamento Sumô', 3, 'Dinâmico', 'Pernas',
 'Agachamento com base ampla e pés apontados para fora.',
 302, 306),

(304, 'Agachamento com Salto', 3, 'Dinâmico', 'Pernas',
 'Agachamento explosivo seguido de salto vertical.',
 302, 307),

-- NÍVEL 4
(305, 'Agachamento Cossack', 4, 'Dinâmico', 'Pernas',
 'Agachamento lateral profundo com transferência de peso.',
 303, 308),

-- NÍVEL 5
(306, 'Pistol Squat com Apoio', 5, 'Dinâmico', 'Pernas',
 'Agachamento unilateral com apoio das mãos ou suporte externo.',
 305, 309),

(307, 'Agachamento Camarão (Inicial)', 5, 'Dinâmico', 'Pernas',
 'Agachamento unilateral com joelho posterior flexionado e leve apoio.',
 305, 310),

-- NÍVEL 6
(308, 'Pistol Squat', 6, 'Dinâmico', 'Pernas',
 'Agachamento unilateral completo sem apoio.',
 306, 311),

(309, 'Flexão Nórdica Inversa', 6, 'Dinâmico', 'Pernas',
 'Controle excêntrico dos isquiotibiais inclinando o corpo para trás.',
 307, 312),

-- NÍVEL 7
(310, 'Pistol na Ponta dos Pés', 7, 'Dinâmico', 'Pernas',
 'Pistol squat executado apoiando-se apenas na ponta do pé.',
 308, 313),

(311, 'Half Dragon Squat', 7, 'Dinâmico', 'Pernas',
 'Agachamento unilateral profundo com maior exigência de mobilidade.',
 308, 314),

-- NÍVEL 8
(312, 'Sissy Squat', 8, 'Dinâmico', 'Pernas',
 'Agachamento com tronco inclinado para trás enfatizando quadríceps.',
 309, 315),

-- NÍVEL 9
(313, 'Flexão Nórdica', 9, 'Dinâmico', 'Pernas', 'Execução completa da flexão nórdica com controle excêntrico e concêntrico.', 309, 316),

-- NÍVEL 10
(314, 'Dragon Squat', 10, 'Dinâmico', 'Pernas', 'Agachamento unilateral avançado com grande exigência de força e mobilidade.', 311, NULL);

select * from exercicio where grupo_muscular = 'Pernas';


INSERT INTO Exercicio 
(id_exercicio, nome, nivel, tipo, grupo_muscular, descricao, id_regressao, id_progressao) 
VALUES

-- NÍVEL 1
(400, 'Toque no Calcanhar', 1, 'Dinâmico', 'Abdômen',
 'Deitado, joelhos flexionados, toque alternadamente os calcanhares com as mãos.',
 NULL, 403),

(401, 'Abdominal Supra', 1, 'Dinâmico', 'Abdômen',
 'Elevação parcial do tronco focando na contração do abdômen superior.',
 NULL, 404),

(402, 'Abdominal Infra', 1, 'Dinâmico', 'Abdômen',
 'Elevação do quadril mantendo lombar no chão, focando no abdômen inferior.',
 NULL, 406),

-- NÍVEL 2
(403, 'Canoinha', 2, 'Estático', 'Abdômen',
 'Posição em V com braços e pernas elevadas, mantendo equilíbrio e contração.',
 400, 409),

(404, 'Abdominal Russo', 2, 'Dinâmico', 'Abdômen',
 'Sentado, tronco levemente inclinado, rotações laterais do tronco.',
 401, 410),

(405, 'Abdominal Bicicleta', 2, 'Dinâmico', 'Abdômen',
 'Movimento alternado de cotovelo com joelho oposto em rotação.',
 401, 411),

-- NÍVEL 3
(406, 'Prancha em Quatro Apoios', 3, 'Estático', 'Abdômen',
 'Prancha apoiando joelhos e mãos, mantendo tronco alinhado.',
 402, 412),

(407, 'Prancha Alta', 3, 'Estático', 'Abdômen',
 'Prancha com apoio nas mãos e pés, corpo alinhado.',
 406, 413),

(408, 'Abdominal Alpinista', 3, 'Dinâmico', 'Abdômen',
 'Em prancha alta, traga os joelhos alternadamente ao peito.',
 405, 414),

(409, 'Alpinista Cruzado', 3, 'Dinâmico', 'Abdômen',
 'Versão cruzada do alpinista, levando joelho ao cotovelo oposto.',
 408, 415),

(410, 'Elevação de Pernas Dobradas na Barra', 3, 'Dinâmico', 'Abdômen',
 'Suspenso na barra, eleve os joelhos mantendo controle.',
 402, 416),

-- NÍVEL 4
(411, 'Elevação de Pernas Esticadas na Barra', 4, 'Dinâmico', 'Abdômen',
 'Suspenso, eleve as pernas estendidas até a horizontal.',
 410, 418),

(412, 'Tuck L-Sit', 4, 'Estático', 'Abdômen',
 'Apoiado nas mãos, mantenha joelhos recolhidos e corpo suspenso.',
 403, 419),

(413, 'Prancha Lateral', 4, 'Estático', 'Abdômen',
 'Prancha apoiada em um antebraço, corpo alinhado lateralmente.',
 407, 420),

-- NÍVEL 5
(414, 'One Leg L-Sit', 5, 'Estático', 'Abdômen',
 'L-sit com uma perna estendida e outra recolhida.',
 412, 421),

-- NÍVEL 6
(415, 'L-Sit', 6, 'Estático', 'Abdômen',
 'Suspensão com pernas estendidas a 90 graus do tronco.',
 414, 422),

(416, 'Tuck Dragon Flag', 6, 'Dinâmico', 'Abdômen',
 'Dragon flag com joelhos recolhidos, controlando a descida.',
 412, 423),

-- NÍVEL 7
(417, 'One Leg Dragon Flag', 7, 'Dinâmico', 'Abdômen',
 'Dragon flag com uma perna estendida e outra flexionada.',
 416, 424),

(418, 'Straddle Dragon Flag', 7, 'Dinâmico', 'Abdômen',
 'Dragon flag com pernas abertas para reduzir alavanca.',
 416, 424),

-- NÍVEL 8
(419, 'Dragon Flag', 8, 'Dinâmico', 'Abdômen',
 'Elevação e descida do corpo mantendo alinhamento rígido.',
 417, 425),

(420, 'Bandeira Negativa', 8, 'Dinâmico', 'Abdômen',
 'Descida controlada da posição de bandeira.',
 419, 426),

-- NÍVEL 9
(421, 'Bandeira com Pernas Abertas', 9, 'Estático', 'Abdômen',
 'Bandeira mantendo pernas afastadas para maior controle.',
 420, 427),

(422, 'Tuck V-Sit', 9, 'Estático', 'Abdômen',
 'Posição V com joelhos recolhidos e equilíbrio sobre as mãos.',
 415, 428),

-- NÍVEL 10
(423, 'Bandeira', 10, 'Estático', 'Abdômen',
 'Corpo totalmente horizontal sustentado pelos braços.',
 421, NULL),

(424, 'V-Sit', 10, 'Estático', 'Abdômen',
 'Posição em V com pernas estendidas e corpo suspenso.',
 422, NULL);

select * from exercicio where grupo_muscular = 'Abdômen';

-- TABELA EXERCICIO_EQUIPAMENTO:
INSERT INTO exercicio_equipamento (id_exercicio, id_equipamento) VALUES

-- EMPURRAR
(102, 3), -- Flexão inclinada (paraletes/banco)
(103, 3), -- Tríceps banco
(106, 2), -- Dip nas paralelas
(106, 4), -- Dip nas argolas
(107, 3), -- Extensão de tríceps
(110, 3), -- Flexão Pike
(113, 1), -- Handstand na parede
(113, 5), -- Handstand em estrutura
(118, 1), -- HSPU na parede
(118, 5), -- HSPU em estrutura
(121, 4), -- Maltesa nas argolas

-- PUXAR
(201, 1), -- Pendurada passiva
(201, 4), -- Pendurada nas argolas
(202, 5), -- Remada com toalha
(204, 1), -- Ativação escapular
(205, 1), -- Barra australiana
(205, 5), -- Barra australiana em praça
(206, 1), -- Barra fixa
(206, 4), -- Barra nas argolas
(207, 1), -- Skin the cat
(207, 4),
(208, 1), -- Back lever progressões
(208, 4),
(209, 1), -- Front lever progressões
(209, 4),
(210, 1), -- Back lever
(210, 4),
(211, 1), -- Front lever
(211, 4),
(212, 4), -- Victorian (argolas)
(212, 2), -- Victorian (paralelas)

-- PERNAS
(309, 5), -- Flexão nórdica inversa
(313, 5), -- Flexão nórdica
(312, 3), -- Sissy squat com apoio
(306, 3), -- Pistol com apoio
(307, 3), -- Camarão com apoio

-- ABDÔMEN
(410, 1), -- Elevação de pernas na barra
(410, 4),
(411, 1),
(411, 4),
(412, 3), -- Tuck L-sit
(412, 4),
(414, 3), -- One leg L-sit
(414, 4),
(415, 3), -- L-sit
(415, 4),
(416, 5), -- Dragon flag
(417, 5),
(418, 5),
(419, 5),
(420, 5),
(421, 5),
(423, 5),
(424, 3), -- V-sit
(424, 4);

INSERT INTO exercicio_equipamento (id_exercicio, id_equipamento) VALUES

-- EMPURRAR (chão)
(101, 6),
(102, 6),
(103, 6),
(104, 6),
(105, 6),
(107, 6),
(108, 6),
(109, 6),
(110, 6),
(111, 6),
(112, 6),
(113, 6), -- handstand no chão/parede
(114, 6),
(115, 6),
(116, 6),
(117, 6),
(118, 6),
(119, 6),
(120, 6),
(121, 6),

-- PERNAS (todos no chão)
(300, 6),
(301, 6),
(302, 6),
(303, 6),
(304, 6),
(305, 6),
(306, 6),
(307, 6),
(308, 6),
(309, 6),
(310, 6),
(311, 6),
(312, 6),
(313, 6),
(314, 6),

-- ABDÔMEN (solo)
(400, 6),
(401, 6),
(402, 6),
(403, 6),
(404, 6),
(405, 6),
(406, 6),
(407, 6),
(408, 6),
(409, 6),
(412, 6),
(413, 6),
(414, 6),
(415, 6),
(416, 6),
(417, 6),
(418, 6),
(419, 6),
(420, 6),
(421, 6),
(422, 6),
(423, 6),
(424, 6);

select * from exercicio_equipamento;