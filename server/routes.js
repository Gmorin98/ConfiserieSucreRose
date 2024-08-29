const {
  getFiltre,
  getAllProduits,
  postAdminAuthentification,
  updateFiltre,
  updateInventaire,
  patchAjoutFiltre,
  postNouveauProduit,
  upload,
  deleteProduit,
  deleteFiltre,
} = require("./handlers");

const router = require("express").Router();

router.get("/getFiltre/:section", getFiltre);
router.get("/getAllProduits/:section", getAllProduits);

router.patch("/updateFiltre/:section", updateFiltre);
router.patch("/updateInventaire/:inventaire", updateInventaire);
router.patch("/ajoutFiltre/:section/:_id/:option", patchAjoutFiltre);

router.post("/nouveauProduit", upload.single('img'), postNouveauProduit);
router.post("/ajoutFiltre/:_id/:inventaire")
router.post("/postAdminAuthentification", postAdminAuthentification)

router.delete("/deleteProduit/:_id/:inventaire", deleteProduit);
router.delete("/deleteFiltre/:section/:_id/:option", deleteFiltre);

module.exports = router;
