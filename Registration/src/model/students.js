const mongoose =require('mongoose');
const validator = require('validator');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    },
    mobile:{
        type: String,
        required:true,
        unique:true,
        minlength:[10,"length should be 10"],
        maxlength:[10,"length should be 10"],
        // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/

      
       },
    password:{
        type: String,
        required:true,

    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
 }]
});
// token part

studentSchema.methods.generateAuthToken = async function(){
 try{
    const token = jwt.sign({_id:this._id.toString()}, "mynameisParveenYadav");
    this.tokens = this.tokens.concat({token:token});
     await this.save();
    return token;
 }catch(error){
     res.send("the error "+ error);
 }
}

studentSchema.pre("save", async function(next){
    // const passwordHash = await bcrypt.hash(password, 10);
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
      
    }
    next();
})




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