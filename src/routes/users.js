const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');

/* GET users listing. */
router.get('/', service.getAll);
/* Ajouter un utilisateur*/
router.post('/', service.add);

/* GET infos d'un utilisateur*/
router.get('/:email', service.getById);

/* Modifier un utilisateur*/
router.put('/:email', service.update);
/* Supprime un utilisateur*/
router.delete('/:email', service.delete);

module.exports = router;
