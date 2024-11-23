const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8087;

// Importação dos controladores
const proprietarioController = require('./controllers/ProprietarioControlls.js');
const veiculoController = require('./controllers/VeiculoControlls.js'); // Controlador de Veiculos

// Middleware para tratar JSON
app.use(bodyParser.json());

// Middleware para habilitar o CORS
app.use(cors());

// Rota de teste
app.get('/', (req, res) => res.send('Estou aqui'));

// Rotas para os controladores
app.use('/proprietario', proprietarioController);
app.use('/veiculos', veiculoController); // Rota para Veiculos

// Middleware para tratamento de erros global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// Iniciar o servidor na porta especificada
app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`));
