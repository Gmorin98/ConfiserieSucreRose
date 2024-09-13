import { v4 as uuidv4 } from "uuid";
import { MongoClient } from "mongodb";
import multer from "multer";

//require("dotenv").config();
// Access environment variables
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

// Set up storage for file uploads (memory storage)
const storage = multer.memoryStorage(); // Stores the file in memory as a buffer
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle multipart form-data
  },
};

export default async function postNouveauProduit(req, res) {
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

    // Convert the uploaded image to base64
    const imgBase64 = req.file ? req.file.buffer.toString("base64") : null;
    if (!imgBase64) {
      return res.status(400).json({
        status: 400,
        message: "No image uploaded or image processing failed.",
      });
    }

    // Create a new product object
    const nouveauProduit = {
      id: uuidv4(),
      nom,
      img: `data:image/png;base64,${imgBase64}`,
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
    const result = await collection.insertOne(nouveauProduit);

    if (result.acknowledged) {
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
}
