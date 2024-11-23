const express = require('express');
const router = express.Router();
const Veiculo = require("../models/Veiculo");

// Busca todos os veículos (GET)
router.get('/', async (req, res) => {
    try {
        const veiculos = await Veiculo.find();
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cadastra um novo veículo (POST)
router.post('/', async (req, res) => {
    try {
        const { placa, ano, marca, modelo, mensalidade, id_proprietario } = req.body;
        const newVeiculo = new Veiculo({ placa, ano, marca, modelo, mensalidade, id_proprietario });
        await newVeiculo.save();
        res.status(201).json({ message: 'Veículo cadastrado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Busca um veículo por ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const veiculo = await Veiculo.findById(req.params.id);
        res.status(200).json(veiculo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Deleta um veículo por ID (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Veiculo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Veículo excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Atualiza um veículo por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const { placa, ano, marca, modelo, mensalidade, id_proprietario } = req.body;
        await Veiculo.findByIdAndUpdate(req.params.id, { placa, ano, marca, modelo, mensalidade, id_proprietario });
        res.status(200).json({ message: 'Veículo atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
