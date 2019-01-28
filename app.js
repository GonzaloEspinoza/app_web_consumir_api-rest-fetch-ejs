const express = require('express');
const morgan = require('morgan');   // muestra todas las peticiones que se realizan a los servicios
const engine = require('ejs-mate');   //para que muestre las paginas web
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');



//initialization
const app = express();
require('./database/collections/connect');
require('./passport/local-auth');

//public static (botstrap)
app.use(express.static('public'));

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));      // para recibir datos desde el cliente html
app.use(session({
    secret: 'mysecretsession',
    resave: false,                              //---> configuracion de sesssion
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    next();
});



//ROUTES
const service = require('./routes/api/v1.0/services')


//setting
app.engine('ejs', engine);
app.set('view engine', 'ejs')


//service
app.use('/', service)

//listen
app.set('port', process.env.PORT || 3060);

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})