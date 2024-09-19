const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes")

const PORT = 8000;

const app = express();

const whitelist = [
  'https://confiserie-sucre-rose-frontend.vercel.app', 
  'https://confiserie-sucre-rose-backend.vercel.app'
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

// const corsOptions = {
//   origin: ['https://confiserie-sucre-rose-frontend.vercel.app', 'https://confiserie-sucre-rose-backend.vercel.app', 'http://localhost:8000'],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true, // If you need to include credentials like cookies
// };

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