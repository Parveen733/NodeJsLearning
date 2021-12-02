const Student = require("../models/students");
const {successResponse,errorResponse} = require("./mesage");
const register = async (req, res) => {

    try {
        console.log(req.body);
        const user_email = req.body.email;
        const user_mobile = req.body.mobile;
        if (await Student.findOne({ email: user_email })) {
            res.send(errorResponse("error","Email already exist","206"));
        }
        else if (data = await Student.findOne({ mobile: user_mobile })) {
            res.send(errorResponse("error","Mobile Number already exist","207"));
        }
        else {
            try {
                const st1 = new Student({
                    name: req.body.username,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    password: req.body.password
                })
               
                const createSt = await st1.save();
              
                res.send(successResponse("Success","registration Successfull","201"));
            }
        
            catch (error) {
                res.send(errorResponse("error","Technical error in server","407"));
            }
        }
            
    } catch (err) {
        res.send(errorResponse("error","Technical error in registeration page","400"));
    }
};
// register();
module.exports = register;