const express = require('express');

require("./db/connection");
const Student = require("./models/students");

var cors = require('cors');


const mongoose = require('mongoose');
const router = require('./router/students');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const port = process.env.PORT || 3000;




app.use(router);

app.listen(port, () => {
    console.log(`listebn on port ${port}`);
});

