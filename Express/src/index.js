const express = require('express');
const path = require('path');
var app= express();

// console.log();
const staticPath = path.join(__dirname,"../public");

app.use(express.static(staticPath));

app.get("/",(req,res)=>{
    res.send("Hello from Parveen yadav");
});
app.get("/about",(req,res)=>{
    res.send("Hello from Parveen yadav about");
});

app.listen(3000,()=>{
    console.log("lintning on port 3000");
});