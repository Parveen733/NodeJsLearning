const express = require('express');
const router = new express.Router();
const Student = require("../models/students");
const { successResponse, errorResponse } = require("./mesage");
const bcrypt = require('bcryptjs');


const login = async (req, res) => {
    console.log(req.body);
    try {
        const email1 = req.body.email;
        const pass1 = req.body.password;
        try {
            const data = await Student.findOne({ email: email1 });
            const isMatch = await bcrypt.compare(pass1, data.password);
            if (isMatch) {
                res.send(successResponse("Success", "login Successfully...!!!", "200"));;
            }
            else {
                res.send(errorResponse("error", "Email and Pasword Invalid...!!!", "401"));

            }
        }
        catch (err) {
            res.send(errorResponse("error", "Email and Pasword Invalid...!!!", "402"));
        }
    } catch (error) {
        res.send(errorResponse("error", "server side error...!!!", "403"));
    }


};

module.exports = login;