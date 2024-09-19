const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const multer = require("multer");
const { upload: blobUpload } = require('@vercel/blob/client');

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

// Set up storage for file uploads (memory storage)
const storage = multer.memoryStorage(); // Stores the file in memory as a buffer
const upload = multer({ storage: storage });

const postNouveauProduit = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    // Handle the file upload using multer
    await new Promise((resolve, reject) => {
      upload.single("img")(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    // Extract product details from the request body
    const { nom, stock, prix, actif, nouveau, tag, inventaire, boutique } = req.body;

    // Ensure the file exists
    if (!req.file) {
      return res.status(400).json({
        status: 400,
        message: "No image uploaded or image processing failed.",
      });
    }

    // Upload the image to Vercel Blob
    const result = await blobUpload(req.file.originalname, req.file.buffer, {
      access: 'public', // Publicly accessible URL
    });

    // Create a new product object with the image URL from Vercel Blob
    const nouveauProduit = {
      id: uuidv4(),
      nom,
      img: result.url, // Use the URL from the blob upload
      prix,
      tag,
      inventaire: stock,
      nouveau,
      actif,
      boutique,
    };

    // Connect to MongoDB
    await client.connect();
    const db = client.db(inventaire); // Use your actual DB name
    const collection = db.collection(inventaire); // Use your actual collection name

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