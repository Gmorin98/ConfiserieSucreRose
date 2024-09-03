const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const pacthUpdateInventory = async (req, res) => {
  const { items } = req.body;
  const client = new MongoClient(MONGO_URI);

  console.log(items);
  

  try {
    await client.connect();
    const db = client.db("Produits"); // Use your actual DB name
    const collection = db.collection("Produits"); // Use your actual collection name
    
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

module.exports = pacthUpdateInventory;
