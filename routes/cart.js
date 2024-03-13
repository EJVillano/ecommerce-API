//[Dependencies and Modules]
const express = require("express");


//[Routing Component] 

const router = express.Router();
const cartController = require("../controllers/cart");
const {verify, verifyAdmin} = require("../auth");


router.get("/get-cart", verify, cartController.getCart);

router.post("/add-to-cart", verify, cartController.addToCart);

router.patch("/update-cart-quantity", verify, verifyAdmin, cartController.updateCart);

module.exports = router;