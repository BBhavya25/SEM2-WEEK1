const express = require('express');
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// POST /api/items route
app.get('/api/items', (req, res) => {
    const items = req.body; // Access the raw JSON body
    console.log("Received items:", items);

    // Respond back to confirm receipt
    res.status(201).json({
        message: "Items received successfully!",
        data: items
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
});
