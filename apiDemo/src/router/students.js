const express = require('express');
const router = new express.Router();
const Student = require("../models/students");
const bcrypt = require('bcryptjs');



router.get("/register", async (req, res) => {
    const userlogin = await Student.find();
    res.send(userlogin)
        ;
});

router.post("/register", async (req, res) => {

    try {
        console.log(req.body);
        const st1 = new Student({
            name: req.body.username,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password
        })
        // const st1 = new Student(req.body);
        console.log("heloo");
        const createSt = await st1.save();
        console.log("bye");
        console.log(createSt);
        // res.status(201).send("registration Successfull"); 
        res.status(201).send(createSt);
    } catch (err) {
        res.status(400).send(err);
    }
});
// login
router.post("/login", async (req, res) => {
    try {

        console.log(req.body);
        const email1 = req.body.email;
        const pass1 = req.body.password;

        const data = await Student.findOne({ email: email1 });

        console.log(data);
        //       if(userlogin.password === password){
        //             res.status(202).send("Login Success");
        //       }else{
        //           res.status(400).send("Invalid user name and password");
        //       }
        // }catch(err){
        //     res.status(400).send("Invalid id/pass");
        // }

        const isMatch = await bcrypt.compare(pass1, data.password);
        console.log("hello");
        console.log(isMatch);
        if (isMatch) {
            res.status(202).send("login succesfull");
        }
        else {
            res.status(400).send("not valid")

        }
    }
    catch (err) {
        res.status(400).send("Invalid id/pass");
    }

});
// get data from database
router.post("/forget", async (req, res) => {
//     try {
//         console.log(req.body);
//         const email1 = req.body.email;
//         console.log("hi");

//         const pass1 = req.body.password;
//         console.log(pass1);
//         // const st1 = new Student(req.body);
//         // const getEmail = await Student.findOne({email:email1});
//         // var _id=getEmail._id;
//         // console.log(_id);
//         const updateData = await Student.findOneAndUpdate({ email: email1 }, { $set: { password: pass1 } }, { new: true, useFindAndModify: false });
//         console.log("jhgd");
//         res.send(updateData);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });



try {
    console.log(req.body);
    const email1 = req.body.email;
    console.log("hi");
    
    const pass1 = req.body.password;
    console.log(pass1);
    // const st1 = new Student(req.body);
    // const getEmail = await Student.findOne({email:email1});
    // var _id=getEmail._id;
    // console.log(_id);
    const passwordHash = await bcrypt.hash(pass1, 10);
    const updateData = await Student.findOneAndUpdate({email:email1},{$set:{password:passwordHash}},{new:true,useFindAndModify:false});
   
    res.send(updateData);
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
        const updateData = await Student.findByIdAndUpdate(idd, st1, { new: true, useFindAndModify: true });
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