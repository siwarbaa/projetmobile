const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Route pour créer un post
router.post('/posts', (req, res) => {
  console.log(req.body);  // Log les données reçues dans la requête
  postController.createPost(req, res);  // Appeler la fonction du contrôleur pour traiter les données
});

module.exports = router;
