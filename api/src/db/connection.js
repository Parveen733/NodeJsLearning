const mongoose= require('mongoose');
mongoose.connect("mongodb://localhost:27017/studentDB",{ useNewUrlParser:true})
.then(()=>{
    console.log("connected successfully");
}).catch((err)=>{
    console.log(err);
});