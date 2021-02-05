const express = require('express');
const router = express.Router();
//connect to the mongoDB database using MongoDB atlas
const monk = require('monk');
//const db = monk('localhost:27017/farm');
const db = monk('mongodb+srv://kevin:1234@cluster0.togxk.mongodb.net/vegefruit?retryWrites=true&w=majority');

db.then(() => {
    console.log("connection success");
}).catch((e) => {
    console.error("Error!", e);
});


//for hashing to the database
const passwordHash = require('password-hash');


//get the users 
router.get('/',  function(req,res) {
    var collection = db.get('USERS');
	collection.find({}, function(err, users) {
		if (err) throw err;
		res.json(users);
	});
});



//add a new user
router.post('/add', function(req, res) {
    //server-side validation, validated on client side too
    var emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    var phoneRegEx = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
    //check empty fields and if email is in right form and password is strong enough
    if(!req.body.email.match(emailRegEx))
        return res.status(400).json({error: "Email is not valid"});
    if(!req.body.password.match(passwordRegEx))
        return res.status(400).json({error: "Password is not valid"});
    
    //check if phone is in correct format
    if( req.body.phone_number !== "" ) {
        if(typeof req.body.phone_number !== 'undefined') {
            if(!req.body.phone_number.match(phoneRegEx))
            return res.status(400).json({error: "Phone number is not in correct format"});
        }
    }

    //check if email exists
    var collection = db.get('USERS');
    collection.findOne({ email: req.body.email }, function(err, user) {
        if(err) {
            res.send({ success:false, message: "Server error"});
        }
        else {
            if(user) {
                res.status(400).json({ error: "Email already exists"});
            }
            else {
                //email doesn't exist, okay to add
                collection.insert({
                    email: req.body.email,
                    password: passwordHash.generate(req.body.password),
                    phone_number: req.body.phone_number,
                    address: req.body.address,
                    authority: false
                }, function(err, user) {
                    if (err) 
                        throw err;
                    else {
                        res.json({
                            id: user._id,
                            email: user.email,
                            authority: user.authority             
                        })             
                    }                       
                });
                }
            }
    });
});



//login the user
router.post('/login', function(req, res) {
    //server-side validation
    //check empty fields
    if(req.body.email == "")
        return res.status(400).json({error: "Email needed"});
    if(req.body.password == "")
        return res.status(400).json({error: "Password needed"});

    var collection = db.get('USERS');
    //check if user is registered by checking for email
    collection.findOne({ email: req.body.email }, function(err, user) {
        if(err) {
            res.send({ success:false, error: "Server error"});
        }
        else {
            if(user) {
                //check if passwords match
                if(!passwordHash.verify(req.body.password, user.password))
                    res.status(400).json({ success:false, error: "Password Error logging in"});
                else {
                    //Successful login
                    res.json({
                        id: user._id,
                        email: user.email,
                        authority: user.authority
                    })
                }
            }
            else //email not registered
                res.status(404).json({ success:false, error: "EMailError logging in"});
        }		
	})

}); 


module.exports = router;