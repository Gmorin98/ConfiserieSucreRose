const getFiltre = require("./handlers/getFiltre");
const getAllProduits = require("./handlers/getAllProduits");
const getSessionStatus = require("./handlers/getSessionStatus");
const { getConfig } = require("./handlers/getGoogleMapAPI");
const postAdminAuthentification = require("./handlers/postAdminAuthentification");
const updateFiltre = require("./handlers/updateFiltre");
const updateInventaire = require("./handlers/updateInventaire");
const patchAjoutFiltre = require("./handlers/patchAjoutFiltre");
const pacthUpdateInventory = require("./handlers/patchUpdateInventory")
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
    getConfig,
    postAdminAuthentification,
    updateFiltre,
    updateInventaire,
    patchAjoutFiltre,
    pacthUpdateInventory,
    upload,
    postNouveauProduit,
    postContactBarBonbons,
    postCreateCheckoutSession,
    postConfirmationCommande,
    postNouvelleCommande,
    deleteProduit,
    deleteFiltre,
}