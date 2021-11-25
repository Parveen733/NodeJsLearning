const { create } = require('hbs');
const mongoose = require('mongoose');
const validator =require('validator');


mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true , })
    .then(() => console.log("Connected succesfully")).catch((err) => console.log(err));


const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: [3, "minimum 3 length"],
        maxlength: [30, "max 30 character"]
    },
    rating: {
        type: Number,
        // validate(value) {
        //     if (value < 0) {
        //         throw new Error("Rating is not negative");

        //     }
        // }
        validate:{
        validator : function(val){
            return val.length < 0
        },
        message: "Rating is not negative"
        // validate(Number);
    }
    },
    review: String,
    email: {
        type: String,
        required: true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Email is not valid");
            }
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Fruit = mongoose.model("Fruit", fruitSchema);
const createfun = async () => {
    try {
        const fruit = new Fruit({
            name: "    Pinapple",
            rating: 9.9,
            review: "jakaas",
            email: "py74@gmail.c"
        });

        const result = await fruit.save();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
createfun();
