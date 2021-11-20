const express= require('express');
const path = require('path');
const bodyparser= require('body-parser');
var app=express();
  


 const staticPath=path.join(__dirname,"/public");
 app.use(express.static(staticPath));

 app.use(bodyparser.urlencoded({extended: true}));

app.post("/",(req,res)=>{
    var num1 =Number(req.body.value1);
    var num2 =Number(req.body.value2);
    var result = num1 + num2;
    var result1= num1- num2;
    res.send("Result  sum is "+result+"<br>"+"Result  sub is "+result1);
    
});

app.listen(3000,()=>{
    console.log("listening port 3000");
});