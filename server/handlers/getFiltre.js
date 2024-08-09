'use strict';

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const getFiltre = async (req, res) => {
  const { section } = req.params;
  const client = new MongoClient(MONGO_URI);
  
  try {
		await client.connect();
    const db = client.db(section);
    const filtreInfo = await db.collection("Filtre").find().toArray();
    if (filtreInfo.length === 0) {
      res.status(404).json({
        status: 404,
        message: "Erreur, aucune information pour le filtre n'a été trouvée.",
      });
    } else {
      res.json({
        status: 200,
        filtreInfo,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(502).json({
      status: 502,
      message: error.message,
    });
  } finally {
    client.close();
  }
};

module.exports = getFiltre;