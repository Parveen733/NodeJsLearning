const express = require('express');

var app= express();
const port =8000;

app.get("/",(req,res)=>{
    res.send("Hello from Parveen yadav");
});
app.get("/about",(req,res)=>{
    res.status(200).send("Hello from Parveen yadav aboutfff");
});
app.get("/temp",(req,res)=>{
    res.send([
        {
            id:1,
            name:"Parveen"
        },
        {
            id:2,
            name:"Vikrant"
        },
    ]);
});


app.listen(port,()=>{
    console.log(`lintning on port ${port}`);
});