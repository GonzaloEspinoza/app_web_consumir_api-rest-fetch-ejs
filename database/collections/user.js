const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose; 

const userSchema = new Schema({
    email: String,
    password: String
});

//metodo para cifrar la contraceña
userSchema.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// metodo de descifrado de la contaceña
userSchema.methods.comparePassword = function (password){
   return bcrypt.compareSync(password, this.password);     // sin la contrace que llega es igual al de la base 
                                                            // ...de base de datos veuelve un true y si un false
};



module.exports = mongoose.model('users', userSchema);

  

