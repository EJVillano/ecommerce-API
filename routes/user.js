//[Dependencies and Modules]
const express = require("express");

//[Routing Component]
const router = express.Router();
const userController = require("../controllers/user.js");

const { verify, verifyAdmin } = require("../auth.js");



//[Routes]
router.post("/register", userController.registerUser);

// router.post("/authenticationUser", userController.checkEmailExists);

router.get("/details", verify, userController.getProfile);

router.patch("/:userId/set-as-admin", verify, verifyAdmin, userController.setAsAdmin);

router.patch("/update-password", verify, userController.updatePassword);



//[Export Route System]

module.exports = router;