const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // MongoDB connection (use SQLite's config if needed)
const itemRoutes = require('./routes/items');

const app = express();
const PORT = 3000;

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use('/api/items', itemRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));




const express = require('express');
const db = require('../config/db'); // SQLite connection
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await db('items').select('*'); // Fetch all rows
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
});

module.exports = router;

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
  
    try {
      const updated = await db('items').where({ id }).update({ name, price });
      if (!updated) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json({ id, name, price });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update item' });
    }
  });

  
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await db('items').where({ id }).del();
      if (!deleted) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete item' });
    }
  });

  const express = require('express');
const Item = require('../models/Item'); // MongoDB model
//const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
});

module.exports = router;


