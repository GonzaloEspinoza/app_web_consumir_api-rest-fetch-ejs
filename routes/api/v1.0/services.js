const express = require('express');
const route = express.Router();
const passport = require('passport');


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
    res.render('profile');
});

module.exports = route;
