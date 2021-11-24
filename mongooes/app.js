const { create } = require('hbs');
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected succesfully")).catch((err) => console.log(err));


const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: Number,
    review: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Fruit = mongoose.model("Fruit", fruitSchema);
const createfun = async () => {
    try {
        const fruit = new Fruit({
            name: "banana",
            rating: 8,
            review: "awesome"
        });

        const result = await fruit.save();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
createfun();
