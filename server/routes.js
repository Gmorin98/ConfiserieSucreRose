const router = require("express").Router();

const {
  // GET
  getAllProduits,
  getBarABonbons,
  getEvenement,
  getFiltre,
  getSessionStatus,
  getConfig,
  // POST
  postAdminAuthentification,
  postConfirmationCommande,
  postContactBarBonbons,
  postCreateCheckoutSession,
  postNouvelleCommande,
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
  pacthUpdateInventory,
  updateFiltre,
  updateInventaire,
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
router.get("/session-status", getSessionStatus);
router.get("/api/config", getConfig);

// PATCH
router.patch("/ajoutFiltre/:sectionFiltre/:sectionID/:filtreOption", patchAjoutFiltre);
router.patch("/patchEvenement", patchEvenement);
router.patch("/pacthUpdateInventory", pacthUpdateInventory);
router.patch("/updateFiltre/:section", updateFiltre);
router.patch("/updateInventaire", updateInventaire);

// POST
router.post("/postAdminAuthentification", postAdminAuthentification);
router.post("/contactBarBonbon", postContactBarBonbons);
router.post("/create-checkout-session", postCreateCheckoutSession);
router.post("/confirmationEmailCustomer", postConfirmationCommande);
router.post("/orderSent", postNouvelleCommande);
router.post("/nouveauBarABonbons", uploadBarABonbons.single('img'), postBarABonbons);
router.post("/nouveauEvenement", uploadEvenement.single('img'), postEvenement);
router.post("/nouveauProduit", upload.single('img'), postNouveauProduit);

// DELETE
router.delete("/deleteBarABonbons", deleteBarABonbons);
router.delete("/deleteEvenement", deleteEvenement);
router.delete("/deleteProduit/:_id/:origine", deleteProduit);
router.delete("/deleteFiltre/:sectionFiltre/:sectionID/:filtreOption", deleteFiltre);

module.exports = router;
