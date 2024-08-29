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
  const { nom, stock, prix, actif, nouveau, tag, inventaire } = req.body; // Receive the new product
  const client = new MongoClient(MONGO_URI);
  
  try {
    const imgBase64 = req.file.buffer.toString("base64");
    const nouveauProduit = {
      _id: uuidv4(),
      nom,
      img: `data:image/png;base64,${imgBase64}`,
      prix,
      tag: Array.isArray(tag) ? tag : [tag],
      inventaire: stock,
      nouveau,
      actif
    }
    
    await client.connect();
    const db = client.db(`${inventaire}`); // Use your actual DB name
    const collection = db.collection(`${inventaire}`); // Use your actual collection name
    const ajoutProduit = await collection.insertOne(nouveauProduit);

    res.status(201).json({
      status: 201,
      data: nouveauProduit,
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

module.exports = { postNouveauProduit, upload };
