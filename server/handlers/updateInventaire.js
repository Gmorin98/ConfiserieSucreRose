const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const updateInventaire = async (req, res) => {
  const produit = req.body; // Receive the updated product data
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(produit.origine); // Would need to change to the produit.origine
    const collection = db.collection(produit.origine); // Would need to change to the produit.origine

    const updatedProduit = {
      nom: produit.nom,
      prix: produit.prix ? parseFloat(produit.prix) : null,
      inventaire: produit.inventaire ? parseInt(produit.inventaire, 10) : 0,
      tag: Array.isArray(produit.tag) ? produit.tag : produit.tag.split(',').map(tag => tag.trim()),
      actif: produit.actif,
      nouveau: produit.nouveau,
      boutique: produit.boutique,
    };
    
    const result = await collection.updateOne(
      { _id: produit._id.toString() },
      { $set: updatedProduit }
    )

    if (result.matchedCount === 0) {
      res.status(404).json({
        status: 404,
        message: "Erreur, aucune information pour le produit n'a été trouvée.",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Produit mis à jour avec succès",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(502).json({
      status: 502,
      message: error.message,
    });
  } finally {
    await client.close();
  }
};

module.exports = updateInventaire;