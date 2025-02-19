require('dotenv').config();
const express = require('express');
const session = require('express-session'); 
const mongoConfig = require('./Config/mongoConfig');

const app = express(); // Connect to MongoDB

mongoConfig();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session
    ({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
    });

app.use(express.static('public')); //last middleware

app.set('view engine', 'ejs'); //set engine
