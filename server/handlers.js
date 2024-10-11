// GET
const getAllProduits = require("./handlers/getAllProduits");
const getBarABonbons = require("./handlers/getBarABonbons");
const getEvenement = require("./handlers/getEvenement");
const getFiltre = require("./handlers/getFiltre");
const getSessionStatus = require("./handlers/getSessionStatus");
const { getConfig } = require("./handlers/getGoogleMapAPI");
// POST
const postAdminAuthentification = require("./handlers/postAdminAuthentification");
const postConfirmationCommande = require("./handlers/postConfirmationCommande");
const postContactBarBonbons = require("./handlers/postContactBarBonbons");
const postCreateCheckoutSession = require("./handlers/postCreateCheckoutSession");
const postNouvelleCommande = require("./handlers/postNouvelleCommande");
const { postBarABonbons, uploadBarABonbons} = require("./handlers/postBarABonbons");
const { postEvenement, uploadEvenement } = require("./handlers/postEvenement");
const { postNouveauProduit, upload } = require("./handlers/postNouveauProduit");
// PATCH
const patchAjoutFiltre = require("./handlers/patchAjoutFiltre");
const patchEvenement = require("./handlers/patchEvenement");
const pacthUpdateInventory = require("./handlers/patchUpdateInventory");
const updateFiltre = require("./handlers/updateFiltre");
const updateInventaire = require("./handlers/updateInventaire");
// DELETE
const deleteBarABonbons = require("./handlers/deleteBarABonbons");
const deleteEvenement = require("./handlers/deleteEvenement");
const deleteFiltre = require("./handlers/deleteFiltre");
const deleteProduit = require("./handlers/deleteProduit");

module.exports = {
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
}