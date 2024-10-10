const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const getEvenement = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(`Evenement`); // Database name
    const evenementInfo = await db.collection(`Info`).find().toArray(); // Collection name

    if (produitsInfo.length === 0) {
      res.status(404).json({
        status: 404,
        message: "Erreur, aucun evenement de trouvé.",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: evenementInfo,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(502).json({
      status: 502,
      message: error.message,
    });
  } finally {
    client.close();
  }
};

module.exports = getEvenement;