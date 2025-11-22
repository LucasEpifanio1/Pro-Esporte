const express = require('express');
const routes = require('./routes');
require('./database'); // conecta ao banco

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send('ProEsporte Sabará rodando 🚀');
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
