const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const port = 8000;
const ejs = require ('ejs');
const cookieSession = require('cookie-session');

const mongo = require ('./db/mongo');

const usersRouter = require('./src/routes/users');
const catwaysRouter = require('./src/routes/catways');
const reservationsRouter = require('./src/routes/reservations');
const loginRouter = require('./src/routes/login');
const pagesRouter = require('./src/routes/pages');

const app = express();

app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession ({
    name: 'session',
    keys: ['keys1','keys2']
}));

app.use('/users', usersRouter);
app.use('/catways', catwaysRouter);
app.use('/catways', reservationsRouter);
app.use('/login', loginRouter);
app.use ('/', pagesRouter);

app.set("views", "./views");
app.set("view engine", "ejs");



mongo.initClientDbConnection();

app.use(function(req, res, next){
    res.status(404).json({name: 'api', version: '1.0', status: 404, message: 'not found'});
})
app.listen(port, () => {
    console.log('Server app listening on port ' + port)
});

module.exports = app;
