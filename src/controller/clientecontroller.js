const db = require('../db/db')
const joi = require('joi')
const bcrypt = require('bcrypt')

const clienteSchema = joi.object({
cpf: joi.string().length(11).required(),
nome: joi.string().required().max(50), 
endereco: joi.string().required().max(80),
bairro: joi.string().required().max(30),
cidade: joi.string().required().max(30),
cep: joi.string().required(),
telefone: joi.string().required(), 
email: joi.string().required().max(50),
senha: joi.string().required().max(50)
})

exports.listarCliente = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM cliente');
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

exports.listarClienteCpf = async (req, res) => {
    const { cpf } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf =?' , [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
 
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Eroo ao buscar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
 
    }
}
 
//adicinar novo cliente
exports.adicionarCliente = async (req, res) => {
    const { cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha } = req.body;
    //validação de dados
 
    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
 
    }
    try {
        const hash = await bcrypt.hash(senha, 10);
        const novoCliente = { cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha};
        await db.query('INSERT INTO cliente SET ?', novoCliente);
 
        res.json({ message: 'Cliente adicionado om sucesso' });
 
    } catch (err) {
        console.error('Erro ao adicionar clietne:', err);
        res.status(500).json({ error: 'Erro ao adicionar cliente' });
 
    }
};
 
//Atualizar um cliente
 
exports.atualizarCliente = async (req, res) => {
    const { cpf } = req.params
    const { nome, endereco, bairro, cidade, cep, telefone, email, senha } = req.body;
    const { error } = clienteSchema.validate({ nome, endereco, bairro, cidade, cep, telefone, email, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        //Criptografando senhas
        const hash = await bcrypt.hash(senha, 10);
        const clienteatualizado = { nome, endereco, bairro, cidade, cep, telefone, email, senha: hash };
        await db.query('UPDATE cliente SET ? WHERE cpf = ?', [clienteatualizado, cpf]);
        res.json({ message: 'Cliente atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err);
        res.status(500).json({ error: 'Erro ao atualizar clienete' });
    }
};
 
//Deletar cliente
exports.deletarCliente = async (req, res) => {
    const { cpf } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        await db.query('DELETE FROM cliente WHERE cpf = ?', [cpf]);
        res.json({ message: 'Cliente deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar cliente:', err)
        res.status(500).json({ error: 'Erro ao deletar cliente' })
    }
};