const express = require("express");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const routes = require("./routes");
const swaggerDocs = require("./swagger.json");

require("./database");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas da API
app.use(routes);

app.listen(3333, () => {
  console.log("🔥 Servidor rodando em http://localhost:3333");
  console.log("📚 Swagger em http://localhost:3333/api-docs");
});
