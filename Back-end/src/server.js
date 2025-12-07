const express = require('express');
const cors = require('cors'); //(22/11)
const routes = require('./routes');
require('./database'); // carrega a conexão + models

const app = express(); 

app.use(cors()); //(22/11)

// Para receber dados de formulários HTML
app.use(express.urlencoded({ extended: true }));

// Para receber dados JSON (ex: via fetch do front-end)
app.use(express.json());

// Suas rotas
app.use(routes);

app.listen(3333, () => console.log('🔥 servidor está funcionando'));
