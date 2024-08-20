const {
  getFiltre,
  getAllProduits,
  updateFiltre,
  updateInventaire,
  postNouveauProduit,
  upload,
  deleteProduit,
} = require("./handlers");

const router = require("express").Router();

router.get("/getFiltre/:section", getFiltre);
router.get("/getAllProduits/:section", getAllProduits)

router.patch("/updateFiltre/:section", updateFiltre)
router.patch("/updateInventaire/:inventaire", updateInventaire)

router.post("/nouveauProduit", upload.single('img'), postNouveauProduit);

router.delete("/deleteProduit/:_id/:inventaire", deleteProduit)

module.exports = router;
