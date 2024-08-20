const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const updateFiltre = async (req, res) => {
  const filtre = req.body; // Receive the updated product data
  const { inventaire } = req.params;
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(`${inventaire}`); // Use your actual DB name
    const collection = db.collection(`${inventaire}`); // Use your actual collection name

    const result = await collection.updateOne(
      { _id: new ObjectId(produit._id) },
      {
        $set: {
          nom: produit.nom,
          tag: produit.tag,
          inventaire: produit.inventaire,
          nouveau: produit.nouveau,
        },
      }
    );

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

module.exports = updateFiltre;
