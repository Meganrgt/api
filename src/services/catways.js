const Catway = require('../models/catway');

/* GET LA LISTE DES CATWAYS*/
exports.getAll = async(req, res, next) => {

    try {
        
       let catways = await Catway.find();

        if(catways) {
            return res.status(200).json(catways);
        }
        return res.status(404).json('catways not found');
        }
        catch(error) {
            return res.status(501).json(error);
        }
}

/*GET UN CATWAY*/
exports.getById = async(req, res, next) => {
    const id = req.params.id;

    try {
        let catway = await Catway.findOne({'catwayNumber': id}); 
        console.log(catway)
        if(catway) {
            return res.status(200).json(catway);
        }
        return res.status(404).json('catway not found');
    }
    catch(error) {
        return res.status(501).json(error);
    }
}

/*CREER UN CATWAY*/
exports.add = async (req, res, next) => {
    const temp = ({
        catwayNumber : req.body.catwayNumber,
        catwayType : req.body.catwayType,
        catwayState : req.body.catwayState
    });
    
    try {
        let catway = await Catway.create(temp); 

        return res.redirect('/catways-list');
    }
    catch(error) {
        return res.status(501).json(error);
    }
}

/*MODIFIER UN  USER*/
exports.update = async (req, res, next) => {
    const id = req.params.id

    const temp = ({
        catwayNumber : req.body.catwayNumber,
        catwayType : req.body.catwayType,
        catwayState : req.body.catwayState
    });

    try {
        let catway = await Catway.findOne({'catwayNumber': id}); 

        if(catway) {
            Object.keys(temp).forEach((key) => {
                if(!!temp[key]) {
                    catway[key] = temp[key];
                }
            });

        await catway.save();
        return res.status(201).json(catway);
        }
    return res.status(404).json('catway not found');
    }
    catch(error) {
        return res.status(501).json(error);
    }
}

/* SUPPRIMER UN USER */
exports.delete = async(req, res, next) => {
    const id = req.params.id

    try {
        await Catway.deleteOne({'catwayNumber' : id}); 

        return res.status(204).json('delete ok');
    }
    catch(error) {
        return res.status(501).json(error);
    }
}