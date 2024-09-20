const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes")

const PORT = 8000;

const app = express();

const corsOptions = {
  origin: 'https://www.confiseriesucrerose.ca',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(routes);

// 404 for handling undefined routes
app.use('*', (req, res) => {
  res.status(404).json({status: 404, message: "Désolé, vous ne trouverez pas de bonbons ici!"});
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = app;

