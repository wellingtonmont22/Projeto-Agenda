
exports.paginaInicial = (req, res) => {
    res.render('index', {
        titulo: '<span style="color: red;">Injetado</span>',
        numeros: [1,2,3]
    });
};
exports.trataPost = (req, res) => {
    res.send('Sou sua no rota de post!')
}