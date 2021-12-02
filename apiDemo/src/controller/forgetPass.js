const express = require('express');
const router = new express.Router();
const Student = require("../models/students");
const {successResponse,errorResponse} = require("./mesage");
const bcrypt = require('bcryptjs');
const forgatPass= async (req, res) => {
   try {
        console.log(req.body);
        const email1 = req.body.email;
        console.log("hi");
        
        const pass1 = req.body.password;
        console.log(pass1);
       
        try{
            const passwordHash = await bcrypt.hash(pass1, 10);
            const updateData = await Student.findOneAndUpdate({email:email1},{$set:{password:passwordHash}},{new:true,useFindAndModify:false});
            res.send(successResponse("Success","Password Update Successfull","203"));
        }catch(err){
            res.send(errorResponse("error","isnvalid datails","405"));
        }
       
        
    } catch (err) {
        res.send(errorResponse("error","Techncal Error fro forget pass word","406"));
    }
    };
    module.exports=forgatPass;
    