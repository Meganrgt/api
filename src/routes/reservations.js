const express = require('express');
const router = express.Router();

const service = require('../services/reservations');
const private = require('../middlewares/private');


/* GET la liste des réservations */
router.get('/:id/reservations/all', service.getAll);
/* GET la liste des réservations */
router.get('/:id/reservations', service.getAllForACatway);
/* Ajouter une réservation*/
router.post('/:id/reservations', service.add);

/* GET infos d'une réservation*/
router.get('/:id/reservations/:idReservation', service.getById);

/* Modifier une réservation*/
router.put('/:id/reservations/:idReservation', service.update);
/* Supprime une réservation*/
router.delete('/:id/reservations/:idReservation', service.delete);


module.exports = router;
