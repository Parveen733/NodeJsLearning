const express = require('express');
require("./db/conn.js");
const Student = require("./models/students");
const mongoose = require('mongoose');
const router = require("./router/user");
const cors = require('cors');
const port = process.env.PORT || 3000;



const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
// to read jason file
app.use(express.json());
// to use router
app.use(router);
// app.use(express.urlencoded({extended: true}));


app.listen(port, () => {
    console.log(`Listning on port ${port}`);
});