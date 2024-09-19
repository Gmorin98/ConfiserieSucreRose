const getFiltre = require("./api/getFiltre");
const getAllProduits = require("./api/getAllProduits");
const getSessionStatus = require("./api/getSessionStatus");
const { getConfig } = require("./api/getGoogleMapAPI");
const postAdminAuthentification = require("./api/postAdminAuthentification");
const updateFiltre = require("./api/updateFiltre");
const updateInventaire = require("./api/updateInventaire");
const patchAjoutFiltre = require("./api/patchAjoutFiltre");
const pacthUpdateInventory = require("./api/patchUpdateInventory")
const {postNouveauProduit, upload} = require("./api/postNouveauProduit");
const postContactBarBonbons = require("./api/postContactBarBonbons");
const postCreateCheckoutSession = require("./api/postCreateCheckoutSession");
const postConfirmationCommande = require("./api/postConfirmationCommande");
const postNouvelleCommande = require("./api/postNouvelleCommande");
const deleteProduit = require("./api/deleteProduit");
const deleteFiltre = require("./api/deleteFiltre");

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