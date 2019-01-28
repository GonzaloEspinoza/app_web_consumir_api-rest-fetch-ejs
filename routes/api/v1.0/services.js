const express = require('express');
const route = express.Router();
const passport = require('passport');
const fetch = require('node-fetch')

route.get('/', (req, res, next)=>{
    //res.send({message:'hello wordl'})
    res.render('index');
});


//signup--------------
route.get('/signup', (req, res, next)=>{
    res.render('signup');
});

route.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));


//signin------------
route.get('/signin', (req, res, next)=>{
    res.render('signin');


});

route.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));


route.get('/profile', (req, res, next)=>{

res.status(200).send({message: 'api-rest'});
});


///aplicaion de externa de web--- consumir  api-rest-----------------------

route.get('/signin-web', (req, res, next)=>{

    // route appi: https://mindicador.cl/api
    const datos = fetch('https://mindicador.cl/api')
    .then(res => res.json())
    .then(body => console.log(body));

    res.render('app_web_login',{data: datos});
    

})



route.get('/texto', (req, res, next)=>{

           fetch('http://localhost:4030/user')
           .then(data => data.json())
           .then(data=>{
               console.log(data);

               res.render('app_web_login',{data: data});
           })


})


route.get('/userlist',(req, res, next)=>{

    fetch('http://localhost:4030/user')
    .then(resp => resp.json())
    .then(resp =>{
        //console.log(resp)
        res.render('list-users',{resp:resp});
    })
})


route.get('/perfil',(req, res, next)=>{
    fetch('https://randomuser.me/api/')
    .then(user => user.json())
    .then(user =>{
        
    })
})

module.exports = route;
