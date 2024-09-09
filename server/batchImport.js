'use strict';

const fs = require('node:fs');
const path = require('path');
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const { MONGO_URI } = process.env;

const allProducts = []

const convertImageToBase64 = (filePath) => {
  const image = fs.readFileSync(filePath); // Read the file as binary
  return `data:image/png;base64,${image.toString('base64')}`; // Convert to Base64 string and format
};

const batchImport = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // CHANGE THIS TO THE CORRECT DATABASE ( Produits / Vrac )
    const db = client.db('Vrac');
    const collection = db.collection("Vrac");

    for (let produitIndex = 0; produitIndex < allProducts.length; produitIndex++) {
      try {
        const product = allProducts[produitIndex];
        const imagePath = path.join(__dirname, 'Vrac', `${produitIndex}.png`);

        // Convert image to Base64 data URL
        product.img = convertImageToBase64(imagePath);

        const result = await collection.insertOne(product);
        if (result.insertedCount === 1) {
          console.log(`${product.nom} added successfully.`);
        } else {
          console.error(`Error inserting product ${product.nom}`);
        }
      } catch (err) {
        console.error(`Error processing product ${allProducts[produitIndex].nom}:`, err);
      }
    }
  } catch (err) {
    console.error("MongoDB connection error:", err);
  } finally {
    console.log("Disconnected from MongoDB");
    await client.close();
  }
};

batchImport();