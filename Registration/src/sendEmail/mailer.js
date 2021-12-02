
var nodemailer = require('nodemailer');
const cookieParser = require("cookie-parser");
const express = require('express');
const sessions = require('express-session');
const app =express();
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir768",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// var sess = (req,res)=>{
//     //  session =req.session.email;
//      var to_email= (req.session.ema;
//      var otp = req.session.otp_mess;
// }
// sess();


var transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  auth: {
    user: 'praveen.yadav@aryavratinfotech.com',
    pass: '17EAXCS021@AB'
  }
});

var mailOptions = {
    
  from: 'praveen.yadav@aryavratinfotech.com',
  to: `dfgegfd`,
  subject : 'Sending Email using Node.js',
  text: `dsfdff`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

module.exports =transporter;