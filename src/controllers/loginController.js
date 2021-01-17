const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    res.render('login');
};

exports.register = async function(req, res) {
    try{
        
        //instanciando o modelo login
        const login = new Login(req.body);
        //aguandando a execução do método register(validação, transfomação em string e inclusão no model do mongoose)
        await login.register();
        //Verifica se o método retonou algum erro
        if(login.errors.length > 0){
            //se houver, o flash exibira uma mensagem de error e a sessão sera salva
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('index');
        });
        return;
    }
    req.flash('success', 'Seu usuario foi salvo com sucesso!');
    req.session.save(function() {
        return res.redirect('index');
    });
    }catch(e){
        console.log(e);
        return res.render('404');
    }
    
}