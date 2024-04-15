const express = require('express');
const bodyParser = require('body-parser');
const clientesController = require('./api/controllers/clientesController');
const pedidosController = require('./api/controllers/pedidosController');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rotas para clientes
app.get('/clientes', clientesController.buscarClientes);
app.post('/criar_cliente', clientesController.criarCliente);
app.post('/desativar_cliente', clientesController.desativarCliente);

// Rotas para pedidos
app.get('/pedidos', pedidosController.buscarPedidos);
app.post('/criar_pedido', pedidosController.criarPedido);
app.post('/alterar_pedido', pedidosController.alterarStatusPedido);

module.exports = app;
