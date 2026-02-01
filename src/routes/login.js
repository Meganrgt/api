const express = require('express');
const router = express.Router();

const service = require('../services/login');

router.post('/', service.authenticate);


module.exports = router;