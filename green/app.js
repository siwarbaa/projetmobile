require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const wasteFoodRoutes = require("./routes/wasteFoodRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect('mongodb://localhost:27017/mobile')
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error(err));

app.use('/api/users', userRoutes);
app.use("/api/Wastefood", wasteFoodRoutes); // CORRECTION ICI
app.use("/api/Order", orderRoutes);

app.get('/', (req, res) => {
  res.send('Waste2Green Backend API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));
