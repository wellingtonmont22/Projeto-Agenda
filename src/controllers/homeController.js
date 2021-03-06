const Contato = require('../models/ContatoModel');
exports.index = async function(req, res) {
    /* Por buscaContatos ser um metodo estatico não precisa ser instanciado*/
    const contatos = await Contato.buscaContatos();
    res.render('index', { contatos });
};
