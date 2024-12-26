const express = require('express');
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// In-memory "database"
let items = [];
let nextId = 1;

// POST /api/items: Add a new item
app.post('/api/items', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const newItem = { id: nextId++, name };
    items.push(newItem);

    res.status(201).json(newItem);
});

// PUT /api/items: Update an item by its index
app.put('/api/items', (req, res) => {
    const { index, name } = req.body;

    if (index === undefined || !name) {
        return res.status(400).json({ error: "Index and name are required" });
    }

    if (index < 0 || index >= items.length) {
        return res.status(404).json({ error: "Index out of range" });
    }

    // Update the item at the specified index
    items[index].name = name;

    res.json(items[index]); // Respond with the updated item
});

// DELETE /api/items: Delete an item by its index
app.delete('/api/items', (req, res) => {
    const { index } = req.body;

    if (index === undefined) {
        return res.status(400).json({ error: "Index is required" });
    }

    if (index < 0 || index >= items.length) {
        return res.status(404).json({ error: "Index out of range" });
    }

    // Remove the item at the specified index
    const deletedItem = items.splice(index, 1);

    res.json({ message: "Item deleted successfully", item: deletedItem[0] });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
});
