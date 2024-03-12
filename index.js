//[Dependencies and Modules]

const express = require("express");
const mongoose = require("mongoose");

// Google Login
const passport = require('passport');
const session = require('express-session');


//Allows our backend app to be available to our frontend app
const cors = require("cors");
//allows us to access routes defined within routes/user
const userRoutes = require("./routes/user.js");

//[Environment Setup]
const port = 4000;

//[Server Setup]
const app = express();
//[Middlewares]
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//Allows all resources to access our backend app
app.use(cors());



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



//[Server Gateway Response]
if(require.main === module){

	app.listen(process.env.PORT || port, ()=>{
		console.log(`API is now online on Port ${process.env.PORT || port}`)
	})
}

module.exports = {app, mongoose};