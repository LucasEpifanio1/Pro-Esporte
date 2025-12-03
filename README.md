<p align="center">
  <img src="./front_end/img/Logo.png" alt="" width="200"\>
</p\>

# Apresentação do Projeto Interdisciplinar — ProEsporte Sabará

## Título e Identificação

Título: ProEsporte Sabará: Plataforma Digital para a Gestão e Personalização Esportiva Municipal
Curso: Bacharelado em Sistemas de Informação
Disciplinas Integradas: Banco de Dados I, Engenharia de Software I, Web II
Período: Semestre Letivo 2025/2

## Justificativa: A Dor Pública

O Desafio da Gestão Esportiva Municipal

A Prefeitura de Sabará busca estruturar um programa esportivo abrangente, que contemple diferentes modalidades e faixas etárias. No entanto, enfrenta dificuldades como:

Dispersão das Informações: dados e atividades esportivas espalhadas entre diferentes setores.

Baixa Adesão: falta de divulgação centralizada e ausência de ferramentas que estimulem a participação da população.

Subutilização da Infraestrutura: academias ao ar livre e aparelhos públicos pouco utilizados ou usados de forma incorreta, por falta de orientação.

Nossa Resposta

O ProEsporte Sabará surge como uma plataforma web integrada, que funcionará como o núcleo digital do programa esportivo municipal, tornando as ações esportivas acessíveis, transparentes e personalizadas para cada cidadão.

## 🎯 Objetivo

Objetivo Geral

Promover saúde, bem-estar e engajamento esportivo na população sabaraense, capacitando indivíduos a manter uma rotina de treinos físicos com base na infraestrutura pública disponível, por meio de uma plataforma digital inteligente.

MVP (Entrega Principal)

Desenvolver uma Aplicação Web Responsiva com duas funcionalidades principais:

Gestão e Divulgação de Atividades Esportivas:
Módulo que permite à Prefeitura cadastrar eventos e ao cidadão consultar atividades esportivas disponíveis.

Módulo Inovador — Street Workout:
Sistema que gera planos de treino personalizados, adaptados aos equipamentos públicos de praças e parques, com foco em calistenia e street workout.

## 🛠️ 4. Arquitetura e Tecnologias

O projeto foi planejado para entrega em um semestre, priorizando a robustez da lógica central e o alinhamento interdisciplinar entre as três disciplinas.

| **Componente**                 | **Tecnologia**                                                            | **Função no Projeto**                                                                                                  | **Disciplina Relacionada** |
| ------------------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| **Backend / Motor de Treinos** | NODE, JavaScript                                                          | Sistema de geração de treinos utiizando distância euclidiana, ou uso de KNN e funcionalidades para cadastro de eventos |                            |
| **Banco de Dados**             | (ORM) -Sequelize e MYSQL - Workbench                                      | Armazena atividades, dados de exercícios e progresso do usuário, eventos cadastrados                                   | Banco de Dados I           |
| **Frontend / Interface**       | HTML, CSS, JavaScript                                                     | Aplicação Web responsiva para geração e acompanhamento de treinos e participação em eventos                            | Web II                     |
| **Modelagem da Aplicação**     | Diagrama UML, casos de uso, levantamento de requisitos, reuniões em grupo | Organizar nossas ideias e nos permitir bolar um plano de desenvolvimento padronizado da nossa aplicação                | Engenharia de Software I   |

## 🚀 Como executar

### ✅ Pré-requisitos

Antes de começar, é fundamental ter a versão correta do Node.js. Recomendamos o uso do **nvm** (Node Version Manager) para gerenciar as versões. Este projeto utiliza a versão **20.11.1**.

Se você não tiver o nvm, pode instalá-lo a partir do [repositório oficial](https://github.com/nvm-sh/nvm).

Caso esteja utilizando windows, é necessário instalar o nvm 10.2.4, pois a versão mais atual está tendo conflito com a versão do node v20.11.1
[Link de download do nmv-windows](https://nodejs.org/en/download/current)

Depois de instalar o nvm, execute os seguintes comandos no seu terminal para garantir que está usando a versão correta:

_Instale a versão 20.11.1 (caso ainda não a tenha)_

```bash
nvm install 20.11.1
```

_Use a versão 20.11.1_

```bash
nvm use 20.11.1
```

### ⚙️ Instalação

Com o ambiente configurado, clone o repositório:

```bash
git clone https://github.com/LucasEpifanio1/Pro-Esporte.git
```

### Onde o projeto fica salvo?

O projeto é salvo exatamente no diretório onde você rodou o git clone e geralmente é este caminho

```bash
C:\Users\nomeDoUsuario\Documents\Pro-Esporte
```

### Abrir o projeto no VS Code

🔹 Opção 1 — Abrir pelo terminal (melhor forma)

Entre na pasta:

```bash
cd Pro-Esporte
```

Agora abra no VS Code:

```bash
code .
```

O VS Code vai abrir o projeto completo (backend e frontend).

### Opção 2 — Abrir pelo VS Code manualmente

- 1- Abra o Visual Studio Code

- 2- Clique em File (Arquivo)

- 3- Clique em Open Folder… (Abrir pasta...)

- 4- Navegue até a pasta onde o Git salvou o projeto

Exemplo:

```bash
C:\Users\Lucas\Pro-Esporte
```

Selecione a pasta Pro-Esporte e clique Abrir

### Como acessar backend e frontend

Dentro da pasta Pro-Esporte, você verá:

```bash
Pro-Esporte/
 ├── backend/
 └── frontend/
```

No VS Code, basta abrir o Explorer (lado esquerdo) e clicar nas pastas.

## 🤝 Como Contribuir

Este é um projeto de desenvolvimento contínuo e aberto a contribuições. Se você tem interesse em ajudar, seja com código, documentação ou sugestões, por favor, leia nosso **[🚀Guia de Contribuição](CONTRIBUTING.md)** para começar.

> Agradecemos por qualquer feedback ou sugestão\! 💡
