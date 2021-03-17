const path = require('path');
const express = require('express');
const session = require('express-session');
const hbs = require('hbs');
const passport = require('passport');
const db = require('../db/dbConfig')

require('dotenv').config();
require('./passport')(passport, db);

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Middleware
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Express routes
app.get('', (req, res) => {
    res.render('index', {
        title: "Home",
        text: "Use this app to get weather data."
    });
})

app.listen(3000, () => {
    console.log("App listening on port 3000");
})