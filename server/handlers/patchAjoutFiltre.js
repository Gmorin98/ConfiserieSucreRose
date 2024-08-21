const { MongoClient } = require("mongodb");
const multer = require("multer");

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const patchAjoutFiltre = async (req, res) => {
  const { _id, inventaire } = req.params
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    const db = client.db(`${inventaire}`); // Use your actual DB name
    const collection = db.collection(`${inventaire}`); // Use your actual collection name
    const ajoutProduit = await collection.insertOne(nouveauProduit);

    res.status(201).json({
      status: 201,
      message: ajoutProduit
    })
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

module.exports = patchAjoutFiltre;
