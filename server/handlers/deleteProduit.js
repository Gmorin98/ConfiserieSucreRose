const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const deleteProduit = async (req, res) => {
  const { _id, inventaire } = req.params
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    const db = client.db(`${inventaire}`); // Use your actual DB name
    const collection = db.collection(`${inventaire}`); // Use your actual collection name

    const findProduit = await collection.findOne({_id})

    if(findProduit) {
      const result = await collection.deleteOne({ _id });

      if (result.deletedCount === 1) {
        res.status(200).json({
          status: 200,
          message: "Produit supprimé avec succès",
        });
      } else {
        res.status(500).json({
          status: 500,
          message: "Erreur lors de la suppression du produit",
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        message: "Produit non trouvé",
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

module.exports = deleteProduit;
