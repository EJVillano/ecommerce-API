//[Dependencies and Modules]
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");

// Google Login
const passport = require('passport');
const session = require('express-session');
require('./passport.js');

//Allows our backend app to be available to our frontend app
const cors = require("cors");
//allows us to access routes defined within routes/user
const userRoutes = require("./routes/user.js");
const courseRoutes = require("./routes/course.js");
//[Environment Setup]
const port = 4000;

//[Server Setup]
const app = express();
//[Middlewares]
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//Allows all resources to access our backend app
app.use(cors());

// [Google Login]
// Create a session wiht the given data
// resave prevents the session form overwriting while session is active
// saveUnitialized prevents tha data from stroring data in the session while the data has not yet been inititalized

app.use(session({

	secret: process.env.clientSecret,
	resave: false,
	saveUnitialized: false

}))
// initializs tyhe password package when the application runs
app.use(passport.initialize());
// creates a session using 
app.use(passport.session());

//[Database Connection]
mongoose.connect("mongodb+srv://admin:admin1234@wdc028-course-booking.ozpncap.mongodb.net/course-booking-API?retryWrites=true&w=majority&appName=WDC028-Course-Booking");
let db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error"));
db.once("open",()=>console.log("Now connected to MongoDB Atlas!"));

//[Backend Routes]
//Group all routes in routes/user under /users
//[/users]
app.use("/users",userRoutes);
//[/courses]
app.use("/courses", courseRoutes);


//[Server Gateway Response]
if(require.main === module){

	app.listen(process.env.PORT || port, ()=>{
		console.log(`API is now online on Port ${process.env.PORT || port}`)
	})
}

module.exports = {app, mongoose};