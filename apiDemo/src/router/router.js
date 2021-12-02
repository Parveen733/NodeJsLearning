const express = require('express');
const router = new express.Router();
const Student = require("../models/students");

// import controller path
const register = require("../controller/register");
const login = require("../controller/login");
const forgetPass = require("../controller/forgetPass");


router.post("/register",register);
router.post("/userLogin",login);
router.post("/forgetPass",forgetPass);


module.exports= router;


