const getFiltre = require("./handlers/getFiltre");
const getAllProduits = require("./handlers/getAllProduits");
const updateFiltre = require("./handlers/updateFiltre");
const updateInventaire = require("./handlers/updateInventaire");
const {postNouveauProduit, upload} = require("./handlers/postNouveauProduit");
const postAjoutFiltre = require("./handlers/patchAjoutFiltre");
const deleteProduit = require("./handlers/deleteProduit");
const deleteFiltre = require("./handlers/deleteFiltre");

module.exports = {
    getFiltre,
    getAllProduits,
    updateFiltre,
    updateInventaire,
    upload,
    postNouveauProduit,
    postAjoutFiltre,
    deleteProduit,
    deleteFiltre,
}