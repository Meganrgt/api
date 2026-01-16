var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');

/* GET home page. */
router.get('/', async(req, res) => {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRoute);
/*router.use('/users/add', userRoute);*/

module.exports = router;
