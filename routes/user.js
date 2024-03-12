//[Dependencies and Modules]
const express = require("express");

//[Routing Component]
const router = express.Router();
const userController = require("../controllers/user.js");
const { verify, isLoggedIn } = require("../auth.js");




//[Routes]

/*








*/



router.get("/details", verify, userController.getProfile);



//[Export Route System]

module.exports = router;