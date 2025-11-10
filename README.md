# Apresentação do Projeto Interdisciplinar — ProEsporte Sabará
## 1. Título e Identificação

Título: ProEsporte Sabará: Plataforma Digital para a Gestão e Personalização Esportiva Municipal
Curso: Bacharelado em Sistemas de Informação
Disciplinas Integradas: Banco de Dados I, Engenharia de Software I, Web II
Período: Semestre Letivo 2025/2

##  2. Justificativa: A Dor Pública
O Desafio da Gestão Esportiva Municipal

A Prefeitura de Sabará busca estruturar um programa esportivo abrangente, que contemple diferentes modalidades e faixas etárias. No entanto, enfrenta dificuldades como:

Dispersão das Informações: dados e atividades esportivas espalhadas entre diferentes setores.

Baixa Adesão: falta de divulgação centralizada e ausência de ferramentas que estimulem a participação da população.

Subutilização da Infraestrutura: academias ao ar livre e aparelhos públicos pouco utilizados ou usados de forma incorreta, por falta de orientação.

Nossa Resposta

O ProEsporte Sabará surge como uma plataforma web integrada, que funcionará como o núcleo digital do programa esportivo municipal, tornando as ações esportivas acessíveis, transparentes e personalizadas para cada cidadão.

 ## 3. Objetivo do Projeto
Objetivo Geral

Promover saúde, bem-estar e engajamento esportivo na população sabaraense, capacitando indivíduos a manter uma rotina de treinos físicos com base na infraestrutura pública disponível, por meio de uma plataforma digital inteligente.

MVP (Entrega Principal)

Desenvolver uma Aplicação Web Responsiva com duas funcionalidades principais:

Gestão e Divulgação de Atividades Esportivas:
Módulo que permite à Prefeitura cadastrar eventos e ao cidadão consultar atividades esportivas disponíveis.

Módulo Inovador — Street Workout:
Sistema que gera planos de treino personalizados, adaptados aos equipamentos públicos de praças e parques, com foco em calistenia e street workout.

## 4. Arquitetura e Tecnologias

O projeto foi planejado para entrega em um semestre, priorizando a robustez da lógica central e o alinhamento interdisciplinar entre as três disciplinas.

| **Componente**                 | **Tecnologia**           | **Função no Projeto**                                               | **Disciplina Relacionada** |
| ------------------------------ | ------------------------ | ------------------------------------------------------------------- | -------------------------- |
| **Backend / Motor de Treinos** | Python (Flask)           | Sistema de regras (SE/ENTÃO) para geração de treinos personalizados | Engenharia de Software I   |
| **Banco de Dados**             | Firebase Cloud Firestore | Armazena atividades, dados de exercícios e progresso do usuário     | Banco de Dados I           |
| **Frontend / Interface**       | HTML, CSS, JavaScript    | Aplicação Web responsiva para consulta e exibição de treinos        | Web II                     |

## 5. Módulos e Funcionalidades do MVP
Módulo I — Catálogo Esportivo Municipal (Cidadão)

 - Consulta Inteligente: pesquisa e filtro por modalidade, local e faixa etária.

- Detalhes de Eventos: exibe horários, endereço e informações do instrutor responsável.

**_Módulo II — Street Workout (O Diferencial)_**

Simula um personal trainer digital, solucionando a subutilização de aparelhos públicos.

Questionário Adaptativo: o usuário informa: Quantas repetições consegue fazer (ou se nunca tentou);
Seu **_objetivo (força, resistência, emagrecimento);
Quais equipamentos estão disponíveis (“Apenas chão e banco”, “Tem barras fixas”, etc)._**

💡 Ideia extra: incluir fotos dos aparelhos das praças para facilitar a identificação visual.

Geração do Treino: o motor em Python processa as respostas e cria um plano seguro, progressivo e adaptado ao ambiente.
Acompanhamento: registro básico das séries e repetições, permitindo visualizar evolução ao longo do tempo.


