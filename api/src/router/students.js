const express = require('express');
const router =  new express.Router();


const Student = require("../models/students");


router.post("/students", async (req, res) => {

    try {
        const std = new Student(req.body);
        const createStd = await std.save();
        console.log(std);
        res.status(201).send(createStd);

    } catch (err) {
        res.status(400).send(err);
    }
});

router.get("/students", async (req, res) => {
    try {
        // const std = new Student(req.body);
        const createStd = await Student.find();
        console.log(createStd);
        res.status(201).send(createStd);

    } catch (err) {
        console.log(err);
        res.status(400).send("catch block");
    }


});


router.get("/students/:name", async (req, res) => {
    try {
        // const 
        const idF = req.params.name;
        const createStd = await Student.findOne({name:idF});
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
router.patch("/students/:id", async (req, res) => {
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
router.delete("/students/:id", async (req, res) => {
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
module.exports =router;
