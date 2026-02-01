const Reservation = require('../models/reservation');
const User = require ('../models/user');
const bcrypt =  require ('bcrypt');
const jwt = require('jsonwebtoken');

/* GET LA LISTE DES RESERVATIONS */
exports.getAll = async(req, res, next) => {
    try {
        
       let reservations = await Reservation.find();

        if(reservations) {
            return res.status(200).json(reservations);
        }
        return res.status(404).json('reservations not found');
        }
        catch(error) {
            return res.status(501).json(error);
        }
}

/* GET LA LISTE DES RESERVATIONS */
exports.getAllForACatway = async(req, res, next) => {
    const id = req.params.id;
    try {
        
       let reservations = await Reservation.find({'catwayNumber': id});

        if(reservations) {
            return res.status(200).json(reservations);
        }
        return res.status(404).json('reservations not found');
        }
        catch(error) {
            return res.status(501).json(error);
        }
}

/*GET UNE RESERVATION*/
exports.getById = async(req, res, next) => {
    const id = req.params.id;

    try {
        let reservation = await Reservation.findOne({'_id': id}); 
        console.log(reservation)
        if(reservation) {
            return res.status(200).json(reservation);
        }
        return res.status(404).json('reservation not found');
    }
    catch(error) {
        return res.status(501).json(error);
    }
}

/*CREER UNE RESERVATION*/
exports.add = async (req, res, next) => {
    const temp = ({
        catwayNumber : req.body.catwayNumber,
        clientName : req.body.clientName,
        boatName : req.body.boatName,
        startDate : req.body.startDate,
        endDate : req.body.endDate
    });
    
    try {
        let reservation = await Reservation.create(temp); 

        return res.redirect('/reservations-list');
    }
    catch(error) {
        return res.status(501).json(error);
    }
}

/*MODIFIER UN  USER*/
exports.update = async (req, res, next) => {
    const id = req.params.id
    const idReservation = req.params.idReservation

    const temp = ({
        catwayNumber : req.body.catwayNumber,
        clientName : req.body.clientName,
        boatName : req.body.boatName,
        startDate : req.body.startDate,
        endDate : req.body.endDate
    });

    try {
        let reservation = await Reservation.findOne({'_id' : idReservation, 'catwayNumber' : id}); 

        if(reservation) {
            Object.keys(temp).forEach((key) => {
                if(!!temp[key]) {
                    reservation[key] = temp[key];
                }
            });

        await reservation.save();
        return res.status(201).json(reservation);
        }
    return res.status(404).json('reservation not found');
    }
    catch(error) {
        return res.status(501).json(error);
    }
}

/* SUPPRIMER UNE RESERVATION */
exports.delete = async(req, res, next) => {
    const id = req.params.id
    const idReservation = req.params.idReservation

    try {
        await Reservation.deleteOne({'_id' : idReservation, 'catwayNumber' : id}); 

        return res.status(204).json('delete ok');
    }
    catch(error) {
        return res.status(501).json(error);
    }
}

exports.authenticate = async(req,res,next) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({'email' : email} , '-__v -createdAt -updatedAt');
        if(user){
            bcrypt.compare(password, user.password, function(err, response) {
                if(err) {
                    throw new Error(err);
                }
                if(response) {
                    delete user._doc.password;

                    const expireIn = 24 * 60 * 60;
                    const token = jwt.sign({
                        user : user
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });

                    res.header('Authorization', 'Bearer' + token);

                    return res.status(200).json('authenticate_succeed');
            }
            return res.status(403).json('wrong_credentials');
            });
        }
        else{
            return res.status(404).json('user_not_found'); 
        }
    }
    catch (error) {
        console.log(error)
        return res.status(501).json(error);
    }
}
