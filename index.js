const express = require("express");
const mongoose = require("mongoose");


const app = express();
const port = 8080;

const RotaEmpregados = require("./rotas/EmpregadoRota");

mongoose.connect("mongodb://localhost:27017/empregadosCarros")
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(console.error("Erro na conexão"));


app.use(express.json());
app.use(RotaEmpregados);

//Log no middleware como na aula
app.use((req, res, next) => {
  console.log(`Pedido ${req.method} para ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://127.0.0.1:${port}`);
});
