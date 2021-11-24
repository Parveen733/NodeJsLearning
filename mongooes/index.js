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
        const fruit1 = new Fruit({
            name: "greapes",
            rating: 9,
            review: "nice"
        });
        const fruit2 = new Fruit({
            name: "mango",
            rating: 5,
            review: "great"
        });
        const fruit3 = new Fruit({
            name: "lamon",
            rating: 8,
            review: "nice"
        });
        const fruit4 = new Fruit({
            name: "Orange",
            rating: 6,
            review: "nice"
        });

        const result = await Fruit.insertMany([fruit1,fruit2,fruit3,fruit4]);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

const readDataFun = async () =>{
    try{
        const result1= await Fruit.find({name: "banana"}).select({name:1});
        console.log(result1);
    }catch(err){
        console.log(err);
    }
}

// const updateData = async (_id) =>{
//     try{
//         const result1= await Fruit.updateOne({_id},{$set:{name:"Save"}});
//         console.log(result1);
//     }catch(err){
//         console.log(err);
//     }

const updateData = async (_id) =>{
    try{
        const result2= await Fruit.findByIdAndUpdate({_id},{$set:{name:"SaveGang"}},{new:true,useFindAndModify:false});
        console.log(result2);
    }catch(err){
        console.log(err);
    }


}

updateData("619ccd3b29499b95038086a9");
console.log("hello");
