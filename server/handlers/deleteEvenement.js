const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const deleteEvenement = async (req, res) => {
  const evenement = req.body;
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(`Evenement`); // Database name
    const collection = db.collection(`Info`); // Collection name

    const evenementID = { _id: evenement._id }
    const findEvenement = await collection.findOne(evenementID);

    if(findEvenement) {
      const result = await collection.deleteOne(evenementID);

      if (result.deletedCount === 1) {
        res.status(200).json({
          status: 200,
          message: "Evenement supprimé avec succès",
        });
      } else {
        res.status(500).json({
          status: 500,
          message: "Erreur lors de la suppression de l'Evenement",
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        message: "Evenement non trouvé",
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

module.exports = deleteEvenement;