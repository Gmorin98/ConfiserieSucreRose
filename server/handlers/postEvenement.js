const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const multer = require("multer");
const { put: blobUpload } = require('@vercel/blob');

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

// Set up storage for file uploads (memory storage)
const storage = multer.memoryStorage();
const uploadEvenement = multer({ storage: storage });

const postEvenement = async (req, res) => {
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

    // Create a new product object
    const nouveauEvenement = {
      _id: uuidv4(),
      img: result.url, // Use the URL from the blob upload
      info: data.info,
    };

    // Connect to MongoDB
    await client.connect();
    const db = client.db(`Evenement`); // Database name
    const collection = db.collection(`Info`); // Collection name

    // Insert the new product into the collection
    const dbResult = await collection.insertOne(nouveauEvenement);

    if (dbResult.acknowledged) {
      // Return the newly added product data
      res.status(200).json({
        status: 200,
        data: nouveauEvenement,
        message: "Nouvelle Evenement à été ajouté!",
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Erreur durant l'ajout du nouvelle Evenement.",
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

module.exports = { postEvenement, uploadEvenement };