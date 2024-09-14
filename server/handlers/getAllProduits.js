const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const getAllProduits = async (req, res) => {
  const { section } = req.params;  // Use req.query for URL parameters in Vercel
  const client = new MongoClient(MONGO_URI);
  console.log("Hello!");
  
  
  try {
    await client.connect();
    const db = client.db(section);
    const produitsInfo = await db.collection(section).find().toArray();

    if (produitsInfo.length === 0) {
      res.status(404).json({
        status: 404,
        message: "Erreur, aucune information pour le filtre n'a été trouvée.",
      });
    } else {
      res.status(200).json({
        status: 200,
        produitsInfo,
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

module.exports = getAllProduits;