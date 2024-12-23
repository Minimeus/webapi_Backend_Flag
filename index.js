const express = require("express");
const mongoose = require("mongoose");

const RotaEmpregados = require("./rotas/EmpregadoRota");
const RotaRegistros =  require("./rotas/VeiculoEmpregadoRota");

const app = express();
const port = 8080;
app.use(express.json());

  mongoose.connect('mongodb://localhost:27017/WebAPI')
  .then(() => {
      //ele diz me que ha um erro mas conecta-se mesmo assim... qual é  o erro...
        console.log("Conexao reussite!");
    }).catch((error) => {
        //agora funcionou....... o meu codigo devia estar mal, e simplesmente a enviar o console log
        console.error(`Erro na conexão: ${error}`);
    });


app.use(RotaEmpregados);
app.use(RotaRegistros);

//Log no middleware como na aula
app.use((req, res, next) => {

  //mudar de guillemets porque esta me a vir o console log, sem haver substituicao => com obtenho ` : Pedido GET para /favicon.ico

  console.log(`Pedido ${req.method} para ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log("Servidor conectado");
});
