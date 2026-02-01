const User = require('../models/user');

/* GET LA LISTE DES USERS*/
exports.getAll = async(req, res, next) => {

    try {
        
       let users = await User.find();

        if(users) {
            return res.status(200).json(users);
        }
        return res.status(404).json('users not found');
        }
        catch(error) {
            return res.status(501).json(error);
        }
}

/*GET UN USER*/
exports.getById = async(req, res, next) => {
    const email = req.params.email;

    try {
        let user = await User.findOne({'email': email}); 
        console.log(user)
        if(user) {
            return res.status(200).json(user);
        }
        return res.status(404).json('user not found');
    }
    catch(error) {
        return res.status(501).json(error);
    }
}

/*CREER UN USER*/
exports.add = async (req, res, next) => {
    const temp = ({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    });
    
    try {
        let user = await User.create(temp); 
        return res.redirect('/users-list');
    }
    catch(error) {
        return res.status(501).json(error);
    }
}

/*MODIFIER UN  USER*/
exports.update = async (req, res, next) => {
    const email = req.params.email

    const temp = ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        let user = await User.findOne({'email': email}); 

        if(user) {
            Object.keys(temp).forEach((key) => {
                if(!!temp[key]) {
                    user[key] = temp[key];
                }
            });

        await user.save();
        return res.status(201).json(user);
        }
    return res.status(404).json('user not found');
    }
    catch(error) {
        return res.status(501).json(error);
    }
}

/* SUPPRIMER UN USER */
exports.delete = async(req, res, next) => {
    const email = req.params.email

    try {
        await User.deleteOne({'email' : email}); 

        return res.status(204).json('delete ok');
    }
    catch(error) {
        return res.status(501).json(error);
    }
}