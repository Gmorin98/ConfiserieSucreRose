const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const patchEvenement = async (req, res) => {
  const { _id, info } = req.body; // Receive the updated product data
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(`Evenement`); // Database name
    const collection = db.collection(`Info`); // Collection name

    const updatedEvenement = {
      info: info,
    };
    
    const result = await collection.updateOne(
      { _id: _id.toString() },
      { $set: updatedEvenement }
    )

    if (result.matchedCount === 0) {
      res.status(404).json({
        status: 404,
        message: "Erreur, aucune information pour cette evenement n'a été trouvée.",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Evenement mis à jour avec succès",
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

module.exports = patchEvenement;