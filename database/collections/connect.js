
const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.99.100/login',{ useNewUrlParser: true }, (err,res)=>{
    if(err) throw err;
    console.log('conexion a la base de datos establecida');
});

module.exports = mongoose

