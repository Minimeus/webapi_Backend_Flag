const express = require("express");
const mongoose = require("mongoose");


const app = express();
const port = 8080;

const RotaEmpregados = require("./rotas/EmpregadoRota");

mongoose.connect("mongodb://localhost:27017/VeiculoEmpregado")
  .then(() => console.log("Conexao reussite!"))

  //ele diz me que ha um erro mas conecta-se mesmo assim... qual é  o erro...
  .catch((error) => console.error(`Erro na conexão: ${error}`));
  //agora funcionou....... o meu codigo devia estar mal, e simplesmente a enviar o console log


app.use(express.json());
app.use(RotaEmpregados);

//Log no middleware como na aula
app.use((req, res, next) => {

  //mudar de guillemets porque esta me a vir o console log, sem haver substituicao => com obtenho ` : Pedido GET para /favicon.ico

  console.log(`Pedido ${req.method} para ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log("Servidor conectado");
});
