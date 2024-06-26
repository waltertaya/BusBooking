const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const mysql = require('mysql');
const routes = require('./routes/routes');
const api = require('./routes/api');
// const newData = require('./dummyData/data');
require('dotenv').config()

// newData();


// const db = mysql.createConnection({
//     host: process.env.HOST,
//     password: process.env.PASSWORD,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
// }).connect((error) => {
//     if (error) {
//         throw error
//     }
//     console.log('MySQL database connected Successfully');
// });

// Mongoose database connection

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

try {
    mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@waltertayadb.y2nbk2w.mongodb.net/BusBooking?retryWrites=true&w=majority`)
    console.log('Mongoose database connected successfully')
} catch (error) {
    throw new Error('Database refused to connect')
}

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use('/api', api);
app.use('/', routes);

app.listen(port, () => {
    console.log(`The server running http://127.0.0.1:${port}`);
})
