const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../database/collections/user');


passport.serializeUser(async(user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    const user = await User.findById(id);
    done(null, user);
});


passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',                  //tipo de datos qur recibe
    passReqToCallback: true
}, async (req, email, password, done)=>{

    const user = await User.findOne({ email: email });
    console.log({message:user});

    if(user){
        return done(null, false, req.flash('signupMessage','El email ya existe'));
    } else {
        const NewUser = new User();
        NewUser.email = email;
        NewUser.password = NewUser.encryptPassword(password);    //funcion que NewUser.encryptPassword(password) que encripta
        await NewUser.save();
        done(null, NewUser);
    };
    
})); 


passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done)=>{
    const user = await User.findOne({ email: email });
    

    if(!user){
        console.log(user)
        return done(null, false, req.flash('signinMessage', 'El usuario no existe.'));
        
    }
    if(!user.comparePassword(password)){
        //console.log(user)
        return done(null, false, req.flash('signinMessage','Clave incorrecta'))
    }
    return done(null, user);
}));