const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const multer = require("multer");
const { put: blobUpload } = require('@vercel/blob');

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

// Set up storage for file uploads (memory storage)
const storage = multer.memoryStorage();
const uploadBarABonbons = multer({ storage: storage });

const postBarABonbons = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    // Ensure the file exists
    if (!req.file) {
      return res.status(400).json({
        status: 400,
        message: "No image uploaded or image processing failed.",
      });
    }

    // Construct the file path (e.g., "Produits/image.jpg" or "Vrac/image.jpg")
    const filePath = `Bar_A_Bonbons/${req.file.originalname}`;

    // Upload the image to Vercel Blob
    const result = await blobUpload(filePath, req.file.buffer, { access: 'public' });

    // Create a new product object
    const nouveauBarABonbons = {
      _id: uuidv4(),
      img: result.url, // Use the URL from the blob upload
    };

    // Connect to MongoDB
    await client.connect();
    const db = client.db(`Bar_A_Bonbons`); // Database name
    const collection = db.collection(`Info`); // Collection name

    // Insert the new product into the collection
    const dbResult = await collection.insertOne(nouveauBarABonbons);

    if (dbResult.acknowledged) {
      // Return the newly added product data
      res.status(200).json({
        status: 200,
        data: nouveauBarABonbons,
        message: "Nouveau Bar à Bonbons à été ajouté!",
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Erreur durant l'ajout du Nouveau Bar à Bonbons.",
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

module.exports = { postBarABonbons, uploadBarABonbons };