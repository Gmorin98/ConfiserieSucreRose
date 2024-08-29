const getFiltre = require("./handlers/getFiltre");
const getAllProduits = require("./handlers/getAllProduits");
const postAdminAuthentification = require("./handlers/postAdminAuthentification");
const updateFiltre = require("./handlers/updateFiltre");
const updateInventaire = require("./handlers/updateInventaire");
const patchAjoutFiltre = require("./handlers/patchAjoutFiltre");
const {postNouveauProduit, upload} = require("./handlers/postNouveauProduit");
const postAjoutFiltre = require("./handlers/patchAjoutFiltre");
const deleteProduit = require("./handlers/deleteProduit");
const deleteFiltre = require("./handlers/deleteFiltre");

module.exports = {
    getFiltre,
    getAllProduits,
    postAdminAuthentification,
    updateFiltre,
    updateInventaire,
    patchAjoutFiltre,
    upload,
    postNouveauProduit,
    postAjoutFiltre,
    deleteProduit,
    deleteFiltre,
}