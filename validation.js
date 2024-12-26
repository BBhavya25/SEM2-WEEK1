const express = require('express');
const app = express();

app.use(express.json());

// Mock data
let items = [
    { id: 1, name: "Apple", type: "food" },
    { id: 2, name: "Screwdriver", type: "tool" }
];
let nextId = 3;

// Middleware for Validation
function validateIdParam(req, res, next) {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID parameter must be a number" });
    }
    next();
}

function validatePostData(req, res, next) {
    const { name, type } = req.body;
    if (!name || !type) {
        return res.status(400).json({ error: "Name and type are required" });
    }
    if (name.length > 50) {
        return res.status(400).json({ error: "Name cannot exceed 50 characters" });
    }
    next();
}

function validatePutData(req, res, next) {
    const { name, type } = req.body;
    if (name && name.length > 50) {
        return res.status(400).json({ error: "Name cannot exceed 50 characters" });
    }
    next();
}

// Routes

// 1. GET /api/items/:id with ID validation
app.get('/api/items/:id', validateIdParam, (req, res) => {
    const { id } = req.params;

    const item = items.find(item => item.id === parseInt(id));
    if (!item) {
        return res.status(404).json({ error: `Item with ID ${id} not found` });
    }

    res.json(item);
});

// 2. POST /api/items with data validation
app.post('/api/items', validatePostData, (req, res) => {
    const { name, type } = req.body;

    const newItem = { id: nextId++, name, type };
    items.push(newItem);

    res.status(201).json(newItem);
});

// 3. PUT /api/items/:id with ID and data validation
app.put('/api/items/:id', [validateIdParam, validatePutData], (req, res) => {
    const { id } = req.params;
    const { name, type } = req.body;

    const itemIndex = items.findIndex(item => item.id === parseInt(id));
    if (itemIndex === -1) {
        return res.status(404).json({ error: `Item with ID ${id} not found` });
    }

    if (name) items[itemIndex].name = name;
    if (type) items[itemIndex].type = type;

    res.json(items[itemIndex]);
});

// 4. Return 404 for unhandled routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
});
