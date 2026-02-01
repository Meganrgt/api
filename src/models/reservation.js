const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const Reservation = new Schema({
    catwayNumber: {
        type : Number, 
        trim : true, 
        required : [true, 'Le numéro du catway est requis']
    },
    clientName: {
        type : String,
        trim :  true, 
        required : [true, "Le nom du client est requis"]
    },
    boatName: {
        type : String,
        trim : true,
        required : [true, "Le nom du bateau est requis"]
    },
    startDate: {
        type : Date,
        trim : true,
        required : [true, "La date de début de réservation est requise"]
    },
    endDate: {
        type : Date,
        trim : true,
        required : [true, "La date de fin de réservation est requise"]
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Reservation', Reservation);