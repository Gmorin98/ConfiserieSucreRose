const getFiltre = require("./handlers/getFiltre");
const getAllProduits = require("./handlers/getAllProduits");
const updateFiltre = require("./handlers/updateFiltre");
const updateInventaire = require("./handlers/updateInventaire");
const {postNouveauProduit, upload} = require("./handlers/postNouveauProduit");
const deleteProduit = require("./handlers/deleteProduit");

module.exports = {
    getFiltre,
    getAllProduits,
    updateFiltre,
    updateInventaire,
    postNouveauProduit,
    upload,
    deleteProduit
}