const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const deleteFiltre = async (req, res) => {
  const { sectionFiltre, sectionID, filtreOption } = req.params

  if (!sectionFiltre || !sectionID || !filtreOption) {
    return res.status(400).json({
      status: 400,
      message: "Missing sectionFiltre, sectionID, or filtreOption.",
    });
  }

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(sectionFiltre); // Use your actual DB name
    const collection = db.collection(`Filtre`); // Use your actual collection name
    
    const filterID = { _id: sectionID };
    // Remove the specific option from the options array
    const optionToDelete = { $pull: { options: filtreOption } };

    const result = await collection.updateOne(filterID, optionToDelete);

    if(result.modifiedCount === 1) {
      // Fetch the updated document after the addition
      const updatedFiltreList = await collection.findOne(filterID);
      
      res.status(200).json({
        status: 200,
        data: updatedFiltreList,
        message: "Filtre Deleted.",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Can't find the Filter to Delete.",
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

module.exports = deleteFiltre;
