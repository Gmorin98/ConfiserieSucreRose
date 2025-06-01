// GET
const getAllProduits = require("./handlers/getAllProduits");
const getBarABonbons = require("./handlers/getBarABonbons");
const getEvenement = require("./handlers/getEvenement");
const getFiltre = require("./handlers/getFiltre");
// POST
const postAdminAuthentification = require("./handlers/postAdminAuthentification");
const postContactBarBonbons = require("./handlers/postContactBarBonbons");
const { postBarABonbons, uploadBarABonbons} = require("./handlers/postBarABonbons");
const { postEvenement, uploadEvenement } = require("./handlers/postEvenement");
const { postNouveauProduit, upload } = require("./handlers/postNouveauProduit");
// PATCH
const patchAjoutFiltre = require("./handlers/patchAjoutFiltre");
const patchEvenement = require("./handlers/patchEvenement");
const updateFiltre = require("./handlers/updateFiltre");
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
  // POST
  postAdminAuthentification,
  postContactBarBonbons,
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
}