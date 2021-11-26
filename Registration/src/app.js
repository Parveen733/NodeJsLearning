const express = require('express');
const path = require('path');
const hbs= require('hbs');
const bodyParser= require('body-parser')
const port = process.env.PORT || 3000;
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


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})