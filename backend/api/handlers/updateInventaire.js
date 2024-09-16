const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const updateInventaire = async (req, res) => {
  const produit = req.body; // Receive the updated product data
  const { inventaire } = req.query;
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(inventaire); // Use your actual DB name
    const collection = db.collection(inventaire); // Use your actual collection name
    
    const result = await collection.updateOne(
      { id: produit.id },
      {
        $set: {
          nom: produit.nom,
          prix: parseFloat(produit.prix), // Ensure it's a number
          tag: produit.tag, // Ensure this is an array
          inventaire: parseInt(produit.inventaire, 10), // Ensure it's an integer
          nouveau: produit.nouveau, // Boolean value
          actif: produit.actif, // Boolean value
          boutique: produit.boutique,
        },
      }
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