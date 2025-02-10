const express=require('express')
const router=express.Router();
const pedidoControler=require('../controller/pedidocontroller');
 
router.get('/pedido', pedidoControler.listarpedido);
 
router.get('/pedido/:idpedido', pedidoControler.listarpedidosid);
 
router.post('/pedido', pedidoControler.adicionarPedido);
 
router.put('/pedido/idpedido',pedidoControler.adicionarPedido )
 
router.delete('/pedido/:idpedido', pedidoControler.deletarpedido)
 
module.exports = router