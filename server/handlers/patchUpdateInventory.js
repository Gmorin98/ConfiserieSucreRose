const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const patchUpdateInventory = async (req, res) => {
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
      const { _id, quantity, origine, bonbonsSelectionne } = item;

      if (_id) {
        let collection;
        if (origine === "Produits") {
          collection = collectionProduits;
        } else if (origine === "Vrac") {
          collection = collectionVrac;
        } else {
          console.warn(`Unknown origin: ${origine} for item with _id: ${_id} with quantity of: ${quantity}`);
          continue; // Skip this item if origin is not recognized
        }

        // Update the inventory for the matched _id
        const result = await collection.updateOne(
          { _id }, 
          { $inc: { inventaire: -quantity } }
        );

        if (result.matchedCount === 0) {
          console.warn(`No document found with _id: ${_id}`);
        } else if (result.modifiedCount === 0) {
          console.warn(`Failed to update inventory for _id: ${_id}`);
        } else {
          console.log(`Successfully reduced inventory for _id: ${_id}`);
        }
      } else if (bonbonsSelectionne && bonbonsSelectionne.length > 0) {
        // Handle items in 'bonbonsSelectionne' since '_id' is undefined
        for (const subItem of bonbonsSelectionne) {
          const { _id: subItemId, quantite: subItemQuantity } = subItem;
          const result = await collectionVrac.updateOne(
            { _id: subItemId },
            { $inc: { inventaire: -subItemQuantity } }
          );

          if (result.matchedCount === 0) {
            console.warn(`No document found with _id: ${subItemId}`);
          } else if (result.modifiedCount === 0) {
            console.warn(`Failed to update inventory for _id: ${subItemId}`);
          } else {
            console.log(`Successfully reduced inventory for _id: ${subItemId}`);
          }
        }
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

module.exports = patchUpdateInventory;
