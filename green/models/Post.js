const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  weight: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  images: { type: [String], default: [] }, // Pour stocker les liens des images
  expirationDate: { type: Date, required: true },
  category: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Lien avec l'utilisateur qui poste l'annonce
});

module.exports = mongoose.model("Post", postSchema);
