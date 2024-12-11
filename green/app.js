require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require('./routes/postRoutes'); // Importer les routes des posts

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect('mongodb://localhost:27017/mobile')
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes); // Les routes des posts seront disponibles sous /api/posts


app.get('/', (req, res) => {
  res.send('Waste2Green Backend API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));
