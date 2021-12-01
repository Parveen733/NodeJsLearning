const mongoose = require('mongoose');
const validator = require('validator');


const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [3, "Length shoulds be greater than 3 char"],
        maxlength: [30, "Inviled"],
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        sparse:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                return new Error("Enter Valid Email");
            }
        },
    },
    mobile:{
        type:Number,
        // minlength:10,
        // maxlength:10,
        match: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
    },
    password:{
         type: String,
         minlength:[6 , "Minimum Lenght is 6"],
         maxlength:[16 , "Enter valid length Password"]
    },
    date:{
        type: Date,
        default: Date.now
    }
});



const Student = new mongoose.model('Student',studentSchema);

module.exports = Student;
