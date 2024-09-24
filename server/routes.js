const router = require("express").Router();

const {
  getFiltre,
  getAllProduits,
  getSessionStatus,
  getConfig,
  updateFiltre,
  updateInventaire,
  patchAjoutFiltre,
  pacthUpdateInventory,
  postAdminAuthentification,
  postNouveauProduit,
  postContactBarBonbons,
  postCreateCheckoutSession,
  postConfirmationCommande,
  postNouvelleCommande,
  upload,
  deleteProduit,
  deleteFiltre,
} = require("./handlers");

router.get("/getFiltre/:section", getFiltre);
router.get("/getAllProduits/:section", getAllProduits);
router.get("/session-status", getSessionStatus);
router.get("/api/config", getConfig);

router.patch("/updateFiltre/:section", updateFiltre);
router.patch("/updateInventaire", updateInventaire);
router.patch("/ajoutFiltre/:sectionFiltre/:sectionID/:filtreOption", patchAjoutFiltre);
router.patch("/pacthUpdateInventory", pacthUpdateInventory);

router.post("/nouveauProduit", upload.single('img'), postNouveauProduit);
router.post("/postAdminAuthentification", postAdminAuthentification);
router.post("/contactBarBonbon", postContactBarBonbons);
router.post("/create-checkout-session", postCreateCheckoutSession);
router.post("/confirmationEmailCustomer", postConfirmationCommande);
router.post("/orderSent", postNouvelleCommande);

router.delete("/deleteProduit/:_id/:inventaire", deleteProduit);
router.delete("/deleteFiltre/:sectionFiltre/:sectionID/:filtreOption", deleteFiltre);

module.exports = router;
