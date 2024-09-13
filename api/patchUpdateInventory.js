const { MongoClient, ObjectId } = require("mongodb");

//require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  
  const items = req.body;
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    
    // Access the "Produit" database and its collection
    const dbProduits = client.db("Produits");
    const collectionProduits = dbProduits.collection("Produits");

    // Access the "Vrac" database and its collection
    const dbVrac = client.db("Vrac");
    const collectionVrac = dbVrac.collection("Vrac");

    for (const item of items) {
      const { _id, quantity, origin } = item;
      
      // Determine which collection to update based on the origin
      let collection;
      if (origin === "Produit") {
        collection = collectionProduits;
      } else if (origin === "Vrac") {
        collection = collectionVrac;
      } else {
        console.warn(`Unknown origin: ${origin} for item with _id: ${_id}`);
        continue; // Skip this item if origin is not recognized
      }

      // Convert the string _id to ObjectId
      const objectId = new ObjectId(_id);

      // Update the inventory for the matched _id
      const result = await collection.updateOne(
        { _id: objectId }, 
        { $inc: { inventaire: -quantity } }
      );

      if (result.matchedCount === 0) {
        console.warn(`No document found with _id: ${_id}`);
      } else if (result.modifiedCount === 0) {
        console.warn(`Failed to update inventory for _id: ${_id}`);
      } else {
        console.log(`Successfully reduced inventory for _id: ${_id}`);
      }
    }

    res.status(200).json({
      status: 200,
      message: "Inventory successfully updated",
    });
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