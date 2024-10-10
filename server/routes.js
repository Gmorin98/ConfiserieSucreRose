const router = require("express").Router();

const {
  // GET
  getAllProduits,
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
  deleteEvenement,
  deleteFiltre,
  deleteProduit,
} = require("./handlers");

// GET
router.get("/getFiltre/:section", getFiltre);
router.get("/getEvenement", getEvenement);
router.get("/getAllProduits/:section", getAllProduits);
router.get("/session-status", getSessionStatus);
router.get("/api/config", getConfig);

// PATCH
router.patch("/ajoutFiltre/:sectionFiltre/:sectionID/:filtreOption", patchAjoutFiltre);
router.patch("/patchEvenement", patchEvenement);
router.patch("/updateInventaire", updateInventaire);
router.patch("/updateFiltre/:section", updateFiltre);
router.patch("/pacthUpdateInventory", pacthUpdateInventory);

// POST
router.post("/postAdminAuthentification", postAdminAuthentification);
router.post("/contactBarBonbon", postContactBarBonbons);
router.post("/create-checkout-session", postCreateCheckoutSession);
router.post("/confirmationEmailCustomer", postConfirmationCommande);
router.post("/orderSent", postNouvelleCommande);
router.post("/nouveauEvenement", uploadEvenement.single('img'), postEvenement);
router.post("/nouveauProduit", upload.single('img'), postNouveauProduit);

// DELETE
router.delete("/deleteEvenement", deleteEvenement);
router.delete("/deleteProduit/:_id/:origine", deleteProduit);
router.delete("/deleteFiltre/:sectionFiltre/:sectionID/:filtreOption", deleteFiltre);

module.exports = router;
