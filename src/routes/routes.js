const express = require('express')
const router = express.Router();

// exemplo de uma rota GET
router.get('/usuario', (req, res) => {
    res.send('Rota do usuario');
});
router.get('/cervan', (req,res)=> {res.send('rota do cervan');});
// exporte o roteador para que ele possa ser usado  no index.js
module.exports = router;