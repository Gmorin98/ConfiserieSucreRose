const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');

require("dotenv").config();
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("Your MONGO_URI is missing!");

const postAdminAuthentification = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const { username, password } = req.body;
  
  try {
    await client.connect();
    const db = client.db(`Admin_Access`);
    const userInfo = await db.collection(`Info`).findOne({ username });

    if (!userInfo) {
      res.status(404).json({
        status: 404,
        message: "Erreur, aucune information n'a été trouvée avec l'Username.",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, userInfo.password);
    if (!passwordMatch) {
      res.status(401).json({
        status: 401,
        message: "Password invalide.",
      });
    } else {
      res.json({
        status: 200,
        message: "Login successful.",
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

module.exports = postAdminAuthentification;