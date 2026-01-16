const express = require('express');
const router = express.Router();

/* GET users listing. */
const service = require('../services/users');
/* GET infos d'un utilisateur*/
router.get('/:id', service.getById);
/* Ajouter un utilisateur*/
router.put('/add', service.add);
/* Modifier un utilisateur*/
router.patch('/:id', service.update);
/* Supprime un utilisateur*/
router.delete('/:id', service.delete);
/* Route authenticate*/
router.post('/authenticate', service.authenticate);


module.exports = router;
