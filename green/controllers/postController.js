const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, description, type, weight, price, location, images, expirationDate, category } = req.body;
    
    // Crée un nouveau post avec les données reçues
    const post = new Post({
      title,
      description,
      type,
      weight,
      price,
      location,
      images,
      expirationDate,
      category,
    });

    const savedPost = await post.save();

    if (savedPost) {
      res.status(201).json({ message: 'Post créé avec succès', post: savedPost });
    } else {
      res.status(400).json({ message: 'Erreur lors de la création du post' });
    }
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
