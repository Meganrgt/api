const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt');

const User = new Schema({
    username: {
        type : String, 
        trim : true, 
        unique : true,
        required : [true, 'Le username est requis']
    },
    email: {
        type : String,
        trim :  true,
        unique : true, 
        required : [true, "L'adresse email est requise"]
    },
    password: {
        type : String,
        trim : true,
        required : [true, 'Un mot de passe est requis']
    }
},{
    timestamps: true
});

/*Crypte le mot de passe*/
User.pre('save', function(next){
    if(!this.isModified('password')) {
        return next();  
    }
    this.password = bcrypt.hashSync(this.password, 10);

    next();
});


module.exports = mongoose.model('User', User);