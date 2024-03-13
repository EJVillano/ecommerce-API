
const express = require("express");
const productController = require("../controllers/product");
const {verify, verifyAdmin} = require("../auth");

//[Routing Component] 

const router = express.Router();

router.post("/", verify, verifyAdmin, productController.addProduct);

router.get("/all", verify, verifyAdmin, productController.getAllProducts);

router.get("/", productController.getAllActive);

router.get("/:productId", productController.getProduct);

router.patch("/:productId/update",verify,verifyAdmin,productController.updateProduct);

router.patch("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);

router.patch("/:productId/activate",verify,verifyAdmin,productController.activateProduct);




module.exports = router;
