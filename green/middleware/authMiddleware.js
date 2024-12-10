const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.split(' ')[1], 'your-secret-key');
    req.user = decoded; // Set decoded user info to req.user
    next(); // Pass control to the next middleware/controller
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized, invalid token' });
  }
};
