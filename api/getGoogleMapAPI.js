//require('dotenv').config();

export default async function handler(req, res) {
  // Access the Google Maps API key directly from environment variables
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return res.status(500).json({ message: "Google Maps API Key is missing" });
  }

  // Respond with the API key
  res.status(200).json({ googleMapsApiKey });
}
