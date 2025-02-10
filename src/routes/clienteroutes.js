const express = require('express');
const router = express.Router();
const clienteControler = require('../controller/clientecontroller');
 
router.get('/clientes', clienteControler.listarCliente);
router.get('/clientes/:cpf', clienteControler.listarClienteCpf);
router.post('/clientes', clienteControler.adicionarCliente);
router.put('/clientes/:cpf', clienteControler.atualizarCliente);
router.delete('/cliente/:cpf', clienteControler.deletarCliente);
 
module.exports = router;