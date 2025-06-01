const router = require("express").Router();

const {
  // GET
  getAllProduits,
  getBarABonbons,
  getEvenement,
  getFiltre,
  // POST
  postAdminAuthentification,
  postContactBarBonbons,
  // With upload
  postBarABonbons,
  uploadBarABonbons,
  postEvenement,
  uploadEvenement,
  postNouveauProduit,
  upload,
  // PATCH
  patchAjoutFiltre,
  patchEvenement,
  updateFiltre,
  // DELETE
  deleteBarABonbons,
  deleteEvenement,
  deleteFiltre,
  deleteProduit,
} = require("./handlers");

// GET
router.get("/getAllProduits/:section", getAllProduits);
router.get("/getBarABonbons", getBarABonbons);
router.get("/getEvenement", getEvenement);
router.get("/getFiltre/:section", getFiltre);

// PATCH
router.patch("/ajoutFiltre/:sectionFiltre/:sectionID/:filtreOption", patchAjoutFiltre);
router.patch("/patchEvenement", patchEvenement);
router.patch("/updateFiltre/:section", updateFiltre);

// POST
router.post("/postAdminAuthentification", postAdminAuthentification);
router.post("/contactBarBonbon", postContactBarBonbons);
router.post("/nouveauBarABonbons", uploadBarABonbons.single('img'), postBarABonbons);
router.post("/nouveauEvenement", uploadEvenement.single('img'), postEvenement);
router.post("/nouveauProduit", upload.single('img'), postNouveauProduit);

// DELETE
router.delete("/deleteBarABonbons", deleteBarABonbons);
router.delete("/deleteEvenement", deleteEvenement);
router.delete("/deleteProduit/:_id/:origine", deleteProduit);
router.delete("/deleteFiltre/:sectionFiltre/:sectionID/:filtreOption", deleteFiltre);

module.exports = router;
