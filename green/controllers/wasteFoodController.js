const WasteFood = require('../models/WasteFood');

exports.createWasteFood = async (req, res) => {
  try {
    // Log to confirm the data is received
    console.log('Request body:', req.body);
    console.log('Decoded user from token:', req.user);

    // Validation de l'utilisateur
    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated or token invalid' });
    }

    const { title, description, type, weight, price, images, expirationDate, category, location } = req.body;

    const newWasteFood = new WasteFood({
      title,
      description,
      type,
      weight,
      price,
      images,
      expirationDate,
      category,
      location,
      sellerId: req.user.id,
    });

    // Log the object before saving
    console.log('Saving waste food item to database:', newWasteFood);

    const savedItem = await newWasteFood.save();
    console.log('Item saved:', savedItem);

    // Send response back to client
    res.status(201).json({ message: 'Waste food item created successfully', item: savedItem });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to create waste food item', error: error.message });
  }
};

// Get all waste food items
exports.getAllWasteFood = async (req, res) => {
  try {
    console.log('Fetching all available waste food items');
    const items = await WasteFood.find({ status: 'Available' }).populate('category sellerId', 'name email');
    console.log('Fetched items:', items);
    res.status(200).json({ items });
  } catch (error) {
    console.error('Error fetching waste food items:', error);
    res.status(500).json({ message: 'Failed to fetch waste food items', error: error.message });
  }
};
