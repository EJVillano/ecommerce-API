//[Dependencies and Modules]
const express = require("express");
//[Routing Component]
const router = express.Router();
const userController = require("../controllers/user.js");
const passport = require('passport');
//Import the auth module and deconstruct it to get our verify method
const { verify, isLoggedIn } = require("../auth.js");

//[Routes]

//[Post Route - /checkEmail]
// Route for checking if the user's email already exists in the database
// Invokes the "checkEmailExists" function from the controller file to communicate with our database
// Passes the "body" property of our "request" object to the corresponding controller function
// The "then" method uses the result from the controller function and sends it back to the client via the "res.send" method
// router.post("/checkEmail",(req,res)=>{
// 	userController.checkEmailExists(req.body).then(resultFromController=>res.send(resultFromController))
// });

router.post("/checkEmail", userController.checkEmailExists);

//[POST Route - /register]
//Route for user registration
// router.post("/register",(req,res)=>{

// 	userController.registerUser(req.body).then(resultFromController=>res.send(resultFromController))
	
// });

router.post("/register", userController.registerUser);


//[POST Route - /login]
//Route for user authentication
// router.post("/login",(req,res)=>{
// 	userController.loginUser(req.body).then(resultFromController=>res.send(resultFromController))
// })

router.post("/login", userController.loginUser);


//[S42 Activity]
//[POST Route - /details]
//Route for retrieving user details
// router.post("/details", (req,res)=>{
// 	console.log("Result from details route:")
// 	console.log(req.user);
// 	userController.getProfile(req.body).then(resultFromController => res.send(resultFromController));
// });

// router.post("/details", verify, (req,res)=>{
// 	console.log("Result from details route:")
// 	console.log(req.user);

// 	userController.getProfile(req.user.id).then(resultFromController => res.send(resultFromController));
// });

// Update the method to "get" since we won't be sending data from the request body anymore.
// The "getProfile" controller method is passed as middleware, the controller will have access to the "req" and "res" objects.
// This will also make our code look cleaner and easier to read as our routes no longer deal with logic.
// All business logic will now be handled by the controller.
router.get("/details", verify, userController.getProfile);

//[Route to enroll the user to a course]
router.post('/enroll',verify, userController.enroll);

//Route to get the user's enrollements array
router.get('/getEnrollments', verify, userController.getEnrollments);

//Google Login

//[Route for initiating the Google OAuth consent screen]
router.get('/google',
	//use the authenticate method of passport to verify the email credentials in the Google's API
    passport.authenticate('google', {
    	//scopes that are allowed when retrieving user data
        scope: ['email', 'profile'],
        //consent screen will be prompted
        prompt : "select_account"
    }
));

//[Route for callback URL for the Google OAuth Authentication]
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/users/failed',
    }),
    function (req, res) {
        res.redirect('/users/success')
    }
);

//Failed Authentication
router.get("/failed", (req, res) => {
    console.log('User is not authenticated');
    res.send("Failed")
})

//Successful Authentication
router.get("/success",isLoggedIn, (req, res) => {
    console.log('You are logged in');
    console.log(req.user);
    res.send(`Welcome ${req.user.displayName}`)
})


router.get("/logout", (req, res) => {
	//session destroy 
    req.session.destroy((err) => {
        if (err) {
            console.log('Error while destroying session:', err);
        } else {
            req.logout(() => {
                console.log('You are logged out');
                res.redirect('/');
            });
        }
    });
});

//[Export Route System]
//allows us to export the router object that will be accessed by index.js
module.exports = router;