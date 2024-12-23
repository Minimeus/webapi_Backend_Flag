const express = require('express');
const VeiculoEmpregado = require('../modelos/VeiculoEmpregado');
const Empregado = require('../modelos/Empregado');

const app = express.Router();

  // listar empregados por relacao a matrícula
  app.get("/veiculo-empregado", async (req, res) => {
    try {
        const registros = await VeiculoEmpregado.find().populate('empregado_id');
        res.status(200).json(registros);
    } catch (error) {

        //é 500 nao 400
        res.status(500).send("Erro ao buscar registros");
    }
});

//POST para uma nova associacao
app.post('/veiculo-empregado', async (req, res) => {
    //returilizando mysql
    const { empregado_id, veiculo_id, data_inicio, kms_inicial } = req.body;

    try {
        const empregado = await Empregado.findById(empregado_id);
        if (!empregado) {
            return res.status(404).send("Empregado nao foi encontrado");
        }

        const novoRegistro = new VeiculoEmpregado({
            empregado_id,
            veiculo_id,
            data_inicio,
            kms_inicial
        });

        await novoRegistro.save();
        res.status(201).json(novoRegistro);
    } catch (error) {
        res.status(400).send("Erro ao associar veiculo com empregado");
    }
});

//GET
app.get('/veiculo-empregado', async (req, res) => {
    try {
        const registros = await VeiculoEmpregado.find().populate('empregado_id');
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).send("Erro ao procurar registros");
    }
});

// GET Filtrado
app.get('/veiculo-empregado/:veiculo_id', async (req, res) => {
    const { veiculo_id } = req.params;
    try {
        const registros = await VeiculoEmpregado.find({ veiculo_id }).populate('empregado_id');
        if (registros.length > 0) {
            res.status(200).json(registros);
        } else {
            res.status(404).send("Nenhum registro encontrado");
        }
    } catch (error) {
        res.status(500).send("Filtro falhou");
    }
});

module.exports = app;
