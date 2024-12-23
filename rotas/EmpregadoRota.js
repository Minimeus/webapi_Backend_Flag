const express = require("express");

const Empregado = require("../modelos/Empregado");

const router = express.Router();

//Usando asynch, para permitir tempos de espera e eventuais errors.

// listar todos os empregads
app.get("/empregados", async (req, res) => {
    try {
      const empregados = await Empregado.find();
      res.status(200).json(empregados);
    } catch (error) {
      res.status(500).send("Houve um erro ao buscar os empregados");
    }
  });
  
  // listar empregados por relacao a matrícula
  app.get("/empregados/:matricula", async (req, res) => {
    const { matricula } = req.params;
    try {
      const empregados = await Empregado.find({ matricula: matricula });
      if (empregados.length > 0) {
        res.status(200).json(empregados);
      } else {
        res.status(404).send("Nenhum empregado associado a esse veiculo");
      }
    } catch (error) {
      res.status(500).send("Erro");
    }
  });
  
  // Criacao de um novo empregado com post
  app.post("/empregados", async (req, res) => {
    const { nome, matriculaCarro, funcao } = req.body;
    const novoEmpregado = new Empregado({ nome, matriculaCarro, funcao });
    try {
      await novoEmpregado.save();
      res.status(201).send("Novo empregado ");
    } catch (error) {
      res.status(400).send("Erro ao adicionar empregado");
    }
  });
  
  // Editar e atualizar empregado
  app.put("/empregados/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const atualizado = await Empregado.findByIdAndUpdate(id, req.body, { new: true });
      if (atualizado) {
        res.status(200).send("Empregado atualizado");
      } else {
        res.status(404).send("Empregado não encontrado");
      }
    } catch (error) {
      res.status(400).send("Erro ao atualizar empregado");
    }
  });