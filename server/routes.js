const {
  getFiltre,
  getAllProduits,
  getSessionStatus,
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

const router = require("express").Router();

router.get("/getFiltre/:section", getFiltre);
router.get("/getAllProduits/:section", getAllProduits);
router.get("/session-status", getSessionStatus);

router.patch("/updateFiltre/:section", updateFiltre);
router.patch("/updateInventaire/:inventaire", updateInventaire);
router.patch("/ajoutFiltre/:section/:_id/:option", patchAjoutFiltre);
router.patch("/pacthUpdateInventory", pacthUpdateInventory);

router.post("/nouveauProduit", upload.single('img'), postNouveauProduit);
router.post("/ajoutFiltre/:_id/:inventaire")
router.post("/postAdminAuthentification", postAdminAuthentification);
router.post("/contactBarBonbon", postContactBarBonbons);
router.post("/create-checkout-session", postCreateCheckoutSession);
router.post("/confirmationEmailCustomer", postConfirmationCommande);
router.post("/orderSent", postNouvelleCommande);

router.delete("/deleteProduit/:_id/:inventaire", deleteProduit);
router.delete("/deleteFiltre/:section/:_id/:option", deleteFiltre);

module.exports = router;
