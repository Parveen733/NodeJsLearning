
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { allowedNodeEnvironmentFlags } = require("process");
const port = 3000;
var app = express();


const staticpath = path.join(__dirname,"./public");
const partialPath = path.join(__dirname,"/views/partials");
hbs.registerPartials(partialPath);
app.use(express.static(staticpath));

// set a view engine 
app.set("view engine", "hbs");


app.get("/", (req, res)=>{
    res.render('index');
})


app.get("/about",(req, res)=>{
    res.render('about');
});

app.get("/about/*",(req, res)=>{
    // res.render("404", {
    //     errorcomment: "Ops's  about page"
    // });
    res.render('404');
});

app.get("*",(req, res)=>{
    res.render("404", {
        errorcomment: "Ops's page"
    });
    // res.render('404');
});

app.listen(port,()=>{
    console.log(`Listning on port port ${port}`);
});
