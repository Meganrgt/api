const catway = require('../models/catway');

/*GET UN USER*/
exports.getById = async(req, res, next) => {
    const id = req.params.id

    try {
        let catway = await catway.findById(id); 

        if(catway) {
            return res.status(200).json(catway);
        }
        return res.status(404).json('catway not found');
    }
    catch(error) {
        return res.status(501).json(error);
    }
}

/*CREER UN USER*/
exports.add = async (req, res, next) => {
    const temp = ({
        catwayNumber: req.body.catwayNumber,
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState
    });

    try {
        let catway = await catwayNumber.create(temp); 

        return res.status(201).json(catway);
    }
    catch(error) {
        return res.status(501).json(error);
    }
}

/*MODIFIER UN  USER*/
exports.update = async (req, res, next) => {
    const id = req.params.id

    const temp = ({
        catwayNumber: req.body.catwayNumber,
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState
    });

    try {
        let catway = await catway.findOne({_id : id}); 

        if(user) {
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
        await catway.deleteOne({_id : id}); 

        return res.status(204).json('delete ok');
    }
    catch(error) {
        return res.status(501).json(error);
    }
}