const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const patchAjoutFiltre = async (req, res) => {
  const { sectionFiltre, sectionID, filtreOption } = req.params;

  if (!sectionFiltre || !sectionID || !filtreOption) {
    return res.status(400).json({
      status: 400,
      message: "Missing sectionFiltre, sectionID, or filtreOption.",
    });
  }

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(sectionFiltre);
    const collection = db.collection("Filtre");

    const filterID = { _id: sectionID };
    const optionToAdd = { $addToSet: { options: filtreOption } };

    const result = await collection.findOneAndUpdate(
      filterID,
      optionToAdd,
    );

    if (result) {
      res.status(200).json({
        status: 200,
        message: "Option added to Filtre.",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Can't find the Filter to Add the Option.",
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

module.exports = patchAjoutFiltre;