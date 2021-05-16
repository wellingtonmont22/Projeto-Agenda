exports.middlewareGlobal = (req, res, next) => {
    //variaveis locais para exibi as mensagens que estão no views/inicludes
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    console.log('Passou pelo middleware!');
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    console.log(err);
    if(err){
        console.log('Deu erro!')
        return res.render('404');
    }
    next();
}
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next()
}
exports.loginRequired = (req, res, next) => {
    if(!req.session.user){
        req.flash('errors', 'Você precisa fazer o login.');
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
}