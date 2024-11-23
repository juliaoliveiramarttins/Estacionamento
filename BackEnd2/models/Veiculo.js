// Veiculo.js
const db = require('./db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Proprietario = require('./Proprietario'); // Importando o modelo Proprietario

// Definindo o esquema do modelo Veiculo
const VeiculoSchema = new Schema({
    placa: { 
        type: String, 
        required: true 
    },
    ano: { 
        type: Number, 
        required: true 
    },
    marca: { 
        type: String, 
        required: true 
    },
    modelo: { 
        type: String, 
        required: true 
    },
    mensalidade: { 
        type: Number, 
        required: true 
    },
    id_proprietario: { 
        type: Schema.Types.ObjectId, 
        ref: 'Proprietario', // Referência ao modelo Proprietario
        required: true
    }
}, { collection: 'Veiculos' }); // Especificando a coleção 'Veiculos'

const Veiculo = mongoose.model("Veiculo", VeiculoSchema);

module.exports = Veiculo;
