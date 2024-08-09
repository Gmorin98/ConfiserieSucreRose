'use strict';

const fs = require('node:fs');
const path = require('path');
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

// const allProducts = [
//   {
//     nom: "Mike & Ike Original",
//     prix: 3.79,
//     img: "./produits/0.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Mike & Ike Tropical",
//     prix: 3.79,
//     img: "./produits/1.png",
//     tag: ["Exotique", "Tropical"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Mike & Ike Baie",
//     prix: 3.79,
//     img: "./produits/2.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Ghost Pepper Framboise Bleue",
//     prix: 5.89,
//     img: "./produits/3.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Ghost Pepper Cerise",
//     prix: 5.89,
//     img: "./produits/4.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Paille Céréale Cocoa Krispie",
//     prix: 5.99,
//     img: "./produits/5.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Paille Froot Loops",
//     prix: 5.99,
//     img: "./produits/6.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Gummi Eyes Herbert's",
//     prix: 7.99,
//     img: "./produits/Exotique/7.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Starbust Fraise",
//     prix: 3.25,
//     img: "./produits/8.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Pickle, Cornichon Big Papa",
//     prix: 3.99,
//     img: "./produits/9.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },

//   {
//     nom: "Pickle, Cornichon Hot Mama",
//     prix: 3.99,
//     img: "./produits/10.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Pickle, Cornichon Sour Sis",
//     prix: 3.99,
//     img: "./produits/11.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Warheads Galactic Mix",
//     prix: 3.99,
//     img: "./produits/12.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Warheads Cubes Framboisés Bleues",
//     prix: 3.99,
//     img: "./produits/13.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Warheads Mega Sour Booms",
//     prix: 4.78,
//     img: "./produits/14.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Warheads Wedgies",
//     prix: 3.99,
//     img: "./produits/15.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Chipsnuts Cornichon à l'Aneth",
//     prix: 2.99,
//     img: "./produits/16.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Chipnuts Sel et Vinaigre",
//     prix: 2.99,
//     img: "./produits/17.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Chipnuts BBQ de Sud",
//     prix: 2.99,
//     img: "./produits/18.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Nerds Gummy Clusters Berry Berry",
//     prix: 6.59,
//     img: "./produits/19.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Sweet Tarts Chewy Fusion Punch aux Fruits",
//     prix: 5.89,
//     img: "./produits/20.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Sweet Tarts Ropes Fraise",
//     prix: 5.99,
//     img: "./produits/21.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//     {
//     nom: "Fruity's Snacks",
//     prix: 6.99,
//     img: "./produits/22.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Coupes de Pudding au Chocolat au Lait",
//     prix: 5.50,
//     img: "./produits/23.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Chili Peppers",
//     prix: 3.99,
//     img: "./produits/24.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Toxic Waste",
//     prix: 3.99,
//     img: "./produits/25.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Hot Tamales",
//     prix: 3.99,
//     img: "./produits/26.png",
//     tag: ["Exotique"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Bon Bons à la Fraise",
//     prix: 4.99,
//     img: "./produits/27.png",
//     tag: ["Antan"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Bon Bons Framboise Bleue",
//     prix: 4.99,
//     img: "./produits/28.png",
//     tag: ["Antan"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Casse Gueule",
//     prix: 3.95,
//     img: "./produits/29.png",
//     tag: ["Antan"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Charleston Chew, Nougat à la Fraise",
//     prix: 3.59,
//     img: "./produits/30.png",
//     tag: ["Antan"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Gold Mine Gomme",
//     prix: 3.99,
//     img: "./produits/31.png",
//     tag: ["Antan"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Lune de Miel",
//     prix: 6.99,
//     img: "./produits/32.png",
//     tag: ["Antan"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Oublie Rondes au Goût d'Hosties",
//     prix: 1.95,
//     img: "./produits/33.png",
//     tag: ["Antan"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Pastilles aux Fruits",
//     prix: 5.69,
//     img: "./produits/34.png",
//     tag: ["Antan"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Soucoupes Volantes à la Poudre Surette",
//     prix: 5.89,
//     img: "./produits/35.png",
//     tag: ["Antan"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Sugar Daddy Caramel",
//     prix: 3.49,
//     img: "./produits/36.png",
//     tag: ["Antan"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Taffy aux Fruits",
//     prix: 2.49,
//     img: "./produits/37.png",
//     tag: ["Antan"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Taffy Napolitaine",
//     prix: 2.49,
//     img: "./produits/38.png",
//     tag: ["Antan"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Anneaux à la Pêche Sucré 55g",
//     prix: 11.49,
//     img: "./produits/39.png",
//     tag: ["Lyophilisés"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Anneaux à la Pêche Surette 55g",
//     prix: 11.49,
//     img: "./produits/40.png",
//     tag: ["Lyophilisés"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Bébé Ours 50g",
//     prix: 11.49,
//     img: "./produits/41.png",
//     tag: ["Lyophilisés"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Puffy Gummy Virus (Nerds) 25g",
//     prix: 8.49,
//     img: "./produits/42.png",
//     tag: ["Lyophilisés"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Rainbow Crunch Suret (Skittles) 120g",
//     prix: 11.49,
//     img: "./produits/43.png",
//     tag: ["Lyophilisés"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Rainbow Crunch (Skittles) Régulier 120g",
//     prix: 11.49,
//     img: "images/Produits/44.png",
//     tag: ["Lyophilisés"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Taffy à la Fraise 28g",
//     prix: 8.49,
//     img: "./produits/45.png",
//     tag: ["Lyophilisés"],
//     inventaire: 0,
//     nouveau: false
//   },
//   {
//     nom: "Verre de Terre 52g",
//     prix: 11.49,
//     img: "./produits/46.png",
//     tag: ["Lyophilisés"],
//     inventaire: 0,
//     nouveau: false
//   }
// ]

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
    const db = client.db('Produits');
    const collection = db.collection("Produits");

    for (let produitIndex = 0; produitIndex < allProducts.length; produitIndex++) {
      try {
        const product = allProducts[produitIndex];
        const imagePath = path.join(__dirname, 'produits', `${produitIndex}.png`);

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