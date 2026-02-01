const express = require('express');
const router = express.Router();

const service = require('../services/catways');
const private = require('../middlewares/private');

/* GET users listing. */
router.get('/', service.getAll);
/* Ajouter un catway*/
router.post('/', service.add);

/* GET infos d'un catway*/
router.get('/:id', service.getById);

/* Modifier un catway*/
router.put('/:id', service.update);
/* Supprime un catway*/
router.delete('/:id', service.delete);


module.exports = router;
