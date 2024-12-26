const express = require('express');
const app = express();

app.use(express.json());

// In-memory "database"
let items = [
    { id: 1, name: "Apple", type: "food" },
    { id: 2, name: "Screwdriver", type: "tool" }
];

let categories = {
    1: [{ id: 1, name: "Apple", type: "food" }],
    2: [{ id: 2, name: "Screwdriver", type: "tool" }]
};
let nextId = 3;

// 1. POST /api/items: Add a new item
app.post('/api/items', (req, res) => {
    const { name, type } = req.body;

    if (!name || !type) {
        return res.status(400).json({ error: "Name and type are required" });
    }

    const newItem = { id: nextId++, name, type };
    items.push(newItem);

    res.status(201).json(newItem);
});

// 2. GET /api/items: Handle query parameters
app.get('/api/items', (req, res) => {
    const { type } = req.query;

    if (type) {
        const filteredItems = items.filter(item => item.type === type);
        return res.json(filteredItems);
    }

    res.json(items); // Return all items if no query parameter
});

// 3. GET /api/items/:id: Route to fetch an item by ID
app.get('/api/items/:id', (req, res) => {
    const { id } = req.params;

    const item = items.find(item => item.id === parseInt(id));
    if (!item) {
        return res.status(404).json({ error: `Item with ID ${id} not found` });
    }

    res.json(item);
});

// 4. GET /api/categories/:categoryId/items: Fetch items by category
app.get('/api/categories/:categoryId/items', (req, res) => {
    const { categoryId } = req.params;

    const categoryItems = categories[categoryId];
    if (!categoryItems) {
        return res.status(404).json({ error: `Category ID ${categoryId} not found` });
    }

    res.json(categoryItems);
});

// 5. Default route: Handle unhandled routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
});
