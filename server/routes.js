const {
  getFiltre,
  getAllProduits
} = require("./handlers");

const router = require("express").Router();

router.get("/getFiltre/:section", getFiltre);
router.get("/getAllProduits/:section/:produit", getAllProduits)

// router.get("/products", getProducts);
// router.get("/products/recommended", getRecommendedProducts);

// router.get("/cart", getCart);
// router.post("/addToCart", addToCart);
// router.patch("/updateCart", updateCart);
// router.delete("/removeFromCart", removeFromCart);
// router.get("/getOneItem/:_id", getSingularItem)

module.exports = router;
