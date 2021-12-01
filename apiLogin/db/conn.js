const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/studentApiDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected succesfully")).catch((err) => console.log("Connection is not successfull"));




