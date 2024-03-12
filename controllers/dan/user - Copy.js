//[Dependencies and Modules]
const bcrypt = require("bcrypt")
const User = require("../models/User.js");
const Enrollment = require("../models/Enrollment.js");
const auth = require("../auth.js")


module.exports.registerUser = (req,res) => {

    let newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        mobileNo : req.body.mobileNo,
        password : bcrypt.hashSync(req.body.password, 10)
    })

    return newUser.save()
    .then((result) => res.status(201).send(result))
    .catch(err => res.status(500).send(err))

};

module.exports.authenticationUser = (req,res) => {


    if(req.body.email.includes("@")){

        return User.find({ email : req.body.email })
        .then(result => {

            if (result.length > 0) {
                return res.status(409).send({message : "Duplicate Email Found"});
            } else {
                return res.status(404).send({message : "Email not found"});
            };
        })
        .catch(err => res.status(400).send({message : "Invalid email"}));           

    }else{
        res.status(500).send({message : "Invalid email"});
    }

};