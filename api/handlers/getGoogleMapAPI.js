require('dotenv').config();

exports.getConfig = (req, res) => {
  res.json({ googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY });
};