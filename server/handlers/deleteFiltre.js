const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const deleteFiltre = async (req, res) => {
  const { section, _id, option } = req.params
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(section); // Use your actual DB name
    const collection = db.collection(`Filtre`); // Use your actual collection name
    const filterID = { _id: new ObjectId(_id) };

    // Remove the specific option from the options array
    const optionToDelete = { $pull: { options: option } };

    const result = await collection.updateOne(filterID, optionToDelete);

    if(result.modifiedCount === 1) {
      // Fetch the updated document after the addition
      const updatedFiltreList = await collection.findOne(filterID);
      res.status(200).json({
        status: 200,
        data: updatedFiltreList, //Doesnt send back the new list. Fix this
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
