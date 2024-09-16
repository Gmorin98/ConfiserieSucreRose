const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require('./routes');
const bodyParser = require("body-parser");

const PORT = 8000;

const app = express();

app.use(cors({
  origin: 'confiserie-sucre-rose-frontend.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you're using credentials like cookies or tokens
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(require('./routes'));
app.use('/api', routes);
app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 404 for handling undefined routes
app.use('*', (req, res) => {
  res.status(404).json({status: 404, message: "Désolé, vous ne trouverez pas de bonbons ici!"});
});

module.exports = app;