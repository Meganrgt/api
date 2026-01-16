const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const catway = new Schema({
    catwayNumber: {
        type : Number, 
        trim : true, 
        unique : true,
        required : [true, 'Le numéro du catway est requis']
    },
    catwayType: {
        type : String,
        trim :  true, 
        required : [true, "Le type est requise"]
    },
    catwayState: {
        type : String,
        trim : true,
        required : [true, "L'état est requis"]
    }
},{
    timestamps: true
});

module.exports = mongoose.model('user', user);