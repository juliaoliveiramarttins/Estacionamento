const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definindo o esquema do modelo Proprietario com os campos data_cadastro e data_alteracao
const ProprietarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        match: /^[0-9]{11}$/ // Regex para validar CPF
    },
    veiculos: [{
        placa: {
            type: String,
            required: true
        },
        ano: {
            type: Number,
            required: true
        },
        mensalidade: {
            type: Number,
            required: true
        }
    }]
}, { 
    collection: 'Proprietario', 
    timestamps: { createdAt: 'data_cadastro', updatedAt: 'data_alteracao' } // Personalizando os nomes dos campos de data
});

// Criando o modelo Proprietario baseado no esquema
const Proprietario = mongoose.model("Proprietario", ProprietarioSchema);

module.exports = Proprietario;
