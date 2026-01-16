var express = require('express');
var router = express.Router();

/* GET users listing. */
const service = require('../services/catways');
/* GET infos d'un catway*/
router.get('/:id', service.getById);
/* Ajouter un catway*/
router.put('/add', service.add);
/* Modifier un catway*/
router.patch('/:id', service.update);
/* Supprime un catway*/
router.delete('/:id', service.delete);


module.exports = router;
