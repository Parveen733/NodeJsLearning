const express = require('express');

require("./db/connection");
const Student = require("./models/students");

const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// app.post("/students",(req,res)=>{
//     const std = new Student(req.body);
//     console.log(std);
//     std.save().then(()=>{
//         res.status(201).send(std);
//     }).catch((err)=>{
//        res.status(400).send(err);
//     });
//     // res.send("Hello for post side");
// });

// use async

app.post("/students", async (req, res) => {

    try {
        const std = new Student(req.body);
        const createStd = await std.save();
        console.log(std);
        res.status(201).send(createStd);

    } catch (err) {
        res.status(400).send(err);
    }
});

app.get("/students", async (req, res) => {
    try {
        // const std = new Student(req.body);
        const createStd = await Student.find();
        console.log(createStd);
        res.status(201).send(createStd);

    } catch (err) {
        res.status(400).send(err);
    }


});


app.get("/students/:name", async (req, res) => {
    try {
        // const 
        const idF = req.params.name;
        const createStd = await Student.findOne({idF});
        if (!createStd) {
            return res.status(400).send();
        } else {
            console.log(createStd);
            res.send(createStd);
        }


    } catch (err) {
        res.status(400).send(err);
    }


});

//update by id patch and put
app.patch("/students/:id", async (req, res) => {
    try {
        // const std = new Student(req.body);
        // var naam ="Sachin"
        const idF = req.params.id;
        const updateStd = await Student.findByIdAndUpdate(idF,req.body,{new:true,useFindAndModify:false});
        if (!updateStd) {
            return res.status(400).send();
        } else {
            console.log(updateStd);
            res.send(updateStd);
        }


    } catch (err) {
        res.status(400).send(err);
    }


});

// for delete
app.delete("/students/:id", async (req, res) => {
    try {
        // const std = new Student(req.body);
        const deleteStd = await Student.findByIdAndDelete(req.params.id);
        if (!deleteStd) {
            return res.status(400).send();
        } else {
            console.log(deleteStd);
            res.status(200).send(deleteStd);
        }
       
       

    } catch (err) {
        res.status(400).send(err);
    }


});


app.listen(port, () => {
    console.log(`listebn on port ${port}`);
});