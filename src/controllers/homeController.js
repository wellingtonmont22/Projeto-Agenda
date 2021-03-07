const { loginRequired } = require('../middlewares/middleware');
const Contato = require('../models/ContatoModel');
exports.index = async function(req, res) {
    try{
        
        /* Por buscaContatos ser um metodo estatico não precisa ser instanciado*/
        const contatos = await Contato.buscaContatos();
        res.render('index', { contatos });
    }catch(e){
        console.log(e);
        res.render('404');
    }

};
