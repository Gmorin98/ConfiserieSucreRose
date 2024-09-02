const getFiltre = require("./handlers/getFiltre");
const getAllProduits = require("./handlers/getAllProduits");
const getSessionStatus = require("./handlers/getSessionStatus");
const postAdminAuthentification = require("./handlers/postAdminAuthentification");
const updateFiltre = require("./handlers/updateFiltre");
const updateInventaire = require("./handlers/updateInventaire");
const patchAjoutFiltre = require("./handlers/patchAjoutFiltre");
const {postNouveauProduit, upload} = require("./handlers/postNouveauProduit");
const postContactBarBonbons = require("./handlers/postContactBarBonbons");
const postCreateCheckoutSession = require("./handlers/postCreateCheckoutSession");
const postConfirmationCommande = require("./handlers/postConfirmationCommande");
const postNouvelleCommande = require("./handlers/postNouvelleCommande");
const deleteProduit = require("./handlers/deleteProduit");
const deleteFiltre = require("./handlers/deleteFiltre");

module.exports = {
    getFiltre,
    getAllProduits,
    getSessionStatus,
    postAdminAuthentification,
    updateFiltre,
    updateInventaire,
    patchAjoutFiltre,
    upload,
    postNouveauProduit,
    postContactBarBonbons,
    postCreateCheckoutSession,
    postConfirmationCommande,
    postNouvelleCommande,
    deleteProduit,
    deleteFiltre,
}