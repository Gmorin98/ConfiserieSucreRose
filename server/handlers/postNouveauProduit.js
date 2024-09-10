const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const multer = require("multer");

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

// Setting up storage for the uploaded files
const storage = multer.memoryStorage(); // Stores the file in memory as a buffer
const upload = multer({ storage: storage });

const postNouveauProduit = async (req, res) => {
  const { nom, stock, prix, actif, nouveau, tag, inventaire, boutique } = req.body; // Receive the new product
  const client = new MongoClient(MONGO_URI);

  try {
    const imgBase64 = req.file.buffer.toString("base64");
    const nouveauProduit = {
      id: uuidv4(),
      nom,
      img: `data:image/png;base64,${imgBase64}`,
      prix,
      tag,
      inventaire: stock,
      nouveau,
      actif,
      boutique
    };

    await client.connect();
    const db = client.db(inventaire); // Use your actual DB name
    const collection = db.collection(inventaire); // Use your actual collection name

    // Insert the new product
    const result = await collection.insertOne(nouveauProduit);

    if (result.acknowledged) {
      // Find the newly added product
      const updatedFiltreList = await collection.findOne({ _id: nouveauProduit._id });
      
      if (updatedFiltreList) {
        res.status(200).json({
          status: 200,
          data: updatedFiltreList,
          message: "Product added successfully.",
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "Product not found after insertion.",
        });
      }
    } else {
      res.status(500).json({
        status: 500,
        message: "Failed to add the product.",
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

module.exports = { postNouveauProduit, upload };
