const express = require('express');
const mysql = require('mysql');
const routes = require('./routes/routes');
require('dotenv').config()


const db = mysql.createConnection({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    user: process.env.USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).connect((error) => {
    if (error) {
        throw error
    }
    console.log('MySQL database connected Successfully');
});


const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`The server running http://127.0.0.1:${port}`);
})
