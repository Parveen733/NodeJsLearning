const mongoose =require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[3,"min 3 character require"],
        maxlength:[30,"max 30 character"],
        trim:true,
        
        match:/^[a-zA-Z ]+$/
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        validate(val){
             if(!validator.isEmail(val)){
                 throw new Error("Are you Mad...!!!");
             }
        }
    }

});




const Student=  new mongoose.model('Student',studentSchema);
module.exports=Student;
// const std=  async()=>{
//     try{
//         const std1= new Student({
//             name: "Viku",
//             email :"py74237@Outlooks.COM"
//         })
//        const result =await std1.save();
//        console.log(result);
      
//     }catch(err){
//         console.log(err);
//     }
// }

// std();