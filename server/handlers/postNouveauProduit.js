const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const multer = require("multer");
const { put: blobUpload } = require('@vercel/blob');

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

// Set up storage for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const postNouveauProduit = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    // Ensure the file exists
    if (!req.file) {
      return res.status(400).json({
        status: 400,
        message: "No image uploaded or image processing failed.",
      });
    }

    // Extract product details from the request body
    const data = JSON.parse(req.body.data);
    
    // Construct the file path (e.g., "Produits/image.jpg" or "Vrac/image.jpg")
    const filePath = `Evenement/${req.file.originalname}`;

    // Upload the image to Vercel Blob
    const result = await blobUpload(filePath, req.file.buffer, { access: 'public' });
    console.log(result);

    // Create a new product object
    const nouveauProduit = {
      _id: uuidv4(),
      nom: data.nom,
      img: result.url, // Use the URL from the blob upload
      prix: data.prix,
      inventaire: data.stock,
      tag: data.tag,
      actif: data.actif,
      nouveau: data.nouveau,
      boutique: data.boutique,
      origine: data.origine
    };

    // Connect to MongoDB
    await client.connect();
    const db = client.db(nouveauProduit.origine); // Database name
    const collection = db.collection(nouveauProduit.origine); // Collection name

    // Insert the new product into the collection
    const dbResult = await collection.insertOne(nouveauProduit);

    if (dbResult.acknowledged) {
      // Return the newly added product data
      res.status(200).json({
        status: 200,
        data: nouveauProduit,
        message: "Product added successfully.",
      });
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