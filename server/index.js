const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const PORT = 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(require('./routes'));

// 404 for handling undefined routes
app.use('*', (req, res) => {
  res.status(404).json({status: 404, message: "Désolé, vous ne trouverez pas de bonbons ici!"});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;