const express = require('express');
const path = require('path');
const hbs= require('hbs');
const bcrypt =require('bcryptjs');

const bodyParser= require('body-parser')
const port = process.env.PORT || 4000;
require("./db/conn");
const Student = require("./model/students")

const app = express();


const publicPath = path.join(__dirname,"../public");
const template_Path = path.join(__dirname,"../templates/views");
const partial_Path = path.join(__dirname,"../templates/partial");
app.use(express.static(publicPath));


app.set("view engine","hbs");
app.set("views",template_Path);
hbs.registerPartials(partial_Path);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/register",(req,res)=>{
    res.render("register");
});
app.post("/register",async(req,res)=>{
    try{
       
        const reg= new Student({
            
            name:req.body.name1,
            email:req.body.email1,
            mobile:req.body.mobileno1,
            password:req.body.pass1
        })
       
        const createStd = await reg.save();
        console.log(createStd);
        res.status(201).render("login");

    }catch(err){
        res.send(err)
    }
});
app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",async(req,res)=>{
    try{
        const email1=req.body.email2;
        const pass1 =req.body.pass2;
        

        
        const login34 = await Student.findOne({email:email1});
        console.log(login34);
        const isMatch =await bcrypt.compare(pass1,login34.password);
        console.log(isMatch);
        
        // if(login34.password===pass1){
        //     res.status(202).send("login succesfull");
        // }
        // else{
        //     res.status(404).send("not valid")
            
        //     }

        if(isMatch){
            res.status(202).send("login succesfull");
        }
        else{
            res.status(404).send("not valid")
            
            }


    }catch(err){
        res.send(err)
    }
});

app.get("/forgatPass",(req,res)=>{
    res.render("forgatPass");
});

app.post("/forgatPass",async(req,res)=>{
    try {
        console.log(req.body);
        const email1 = req.body.email;
        console.log("hi");
        
        const pass1 = req.body.password;
        console.log(pass1);
        // const st1 = new Student(req.body);
        // const getEmail = await Student.findOne({email:email1});
        // var _id=getEmail._id;
        // console.log(_id);
        const passwordHash = await bcrypt.hash(pass1, 10);
        const updateData = await Student.findOneAndUpdate({email:email1},{$set:{password:passwordHash}},{new:true,useFindAndModify:false});
        
        res.render("index");
    } catch (err) {
        res.status(400).send(err);
    }
});




app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})