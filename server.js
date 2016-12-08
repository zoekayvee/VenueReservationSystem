'use strict'

const express = require('express');
const router = require('./routes/router');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: 'useless',
	resave: false,
	saveUninitialized: false
}));

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/app'));
app.use(router);

app.listen(3000);
console.log('Server running...')