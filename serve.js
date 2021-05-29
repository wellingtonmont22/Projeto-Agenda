require('dotenv').config();//variaveis de ambiente
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const routes = require('./routers');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');
 

mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.emit('Pronto');
    console.log('conectou a base de dados!');
})
.catch(e => console.log(e));


app.use(helmet())//Segurança
app.use(express.urlencoded({extended: true}));//configuação para que o express exiba o conteudo do parametro
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));//definindo pasta do contéudo estatico

//Configuração das sessions

const sessionOptions = session({
    secret: '445454hkhkhkfjffjjfhddhhshhstetetetet',
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

//definindo pasta do views e qual é a engine
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

//middleware
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

//use as rotas
app.use(routes);

//Ouvi o emit do express que é responsavel por saber se o mongo está conectado
app.on('Pronto', () => {
    app.listen(process.env.PORT || 3000, () => console.log('Executando servidor...'));
})




