exports.middlewareGlobal = (req, res, next) => {
    //variaveis locais para exibi as mensagens que estão no views/inicludes
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    console.log('Passou pelo middleware!');
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err){
        return res.render('404');
    }
    console.log('Check Error: Ok');
    next();
}
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next()
}