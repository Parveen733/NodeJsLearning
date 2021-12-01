
const express = require('express');
const router =  new express.Router();
const Student = require("../models/students");





router.post("/students", async (req, res) => {

    try {
        console.log(req.body);
        const st1 = new Student({
            username :req.body.username,
             email : req.body.email,
             mobile : req.body.mobile,
             password : req.body.password
          })
        // const st1 = new Student(req.body);
        const createSt = await st1.save();
        console.log(createSt);
        // res.status(201).send("registration Successfull"); 
        res.status(201).send(createSt);
    } catch (err) {
        res.status(400).send(err);
    }
});
// login
router.get("/students/login", async(req,res)=>{
    try{
        console.log(req.body);
        const email1 = req.body.email;
        const password = req.body.password;
  
        const userlogin = await Student.findOne({email:email1});
  
          console.log(userlogin);
          if(userlogin.password === password){
                res.status(202).send("Login Success");
          }else{
              res.status(400).send("Invalid user name and password");
          }
    }catch(err){
        res.status(400).send("Invalid id/pass");
    }
});

// get data from database
router.get("/students", async (req, res) => {
    try {
        // const st1 = new Student(req.body);
        const getStudents = await Student.find();
        console.log(getStudents);
        res.send(getStudents);
    } catch (err) {
        res.status(400).send(err);
    }
});


// get from database by name
router.get("/students/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const studentData = await Student.findOne({ username });
        if (!studentData) {
            return res.status(404).send();
        } else {
            console.log(studentData);
            res.send(studentData);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update from databse
router.patch("/students/:id", async (req, res) => {
    try {
        const st1 = req.body;
        const idd = req.params.id;
        const updateData = await Student.findByIdAndUpdate(idd,st1,{new: true, useFindAndModify: true});
        if (!updateData) {
            return res.status(404).send();
        } else {
            console.log(updateData);
            res.status(200).send(updateData);
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
module.exports = router;