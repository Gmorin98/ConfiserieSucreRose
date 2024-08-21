const {
  getFiltre,
  getAllProduits,
  updateFiltre,
  updateInventaire,
  postNouveauProduit,
  upload,
  deleteProduit,
  deleteFiltre,
} = require("./handlers");

const router = require("express").Router();

router.get("/getFiltre/:section", getFiltre);
router.get("/getAllProduits/:section", getAllProduits)

router.patch("/updateFiltre/:section", updateFiltre)
router.patch("/updateInventaire/:inventaire", updateInventaire)

router.post("/nouveauProduit", upload.single('img'), postNouveauProduit);
router.post("/ajoutFiltre/:_id/:inventaire")

router.delete("/deleteProduit/:_id/:inventaire", deleteProduit);
router.delete("/deleteFiltre/:_id/:section", deleteFiltre);

module.exports = router;
