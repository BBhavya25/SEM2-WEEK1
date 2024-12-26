const express = require('express');
const app = express();

// Use middleware to parse JSON request bodies
app.use(express.json());

// Root route to test
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Route to handle JSON input
app.post('/data', (req, res) => {
    const { name, age } = req.body; // Accessing the parsed JSON data
    if (!name || !age) {
        return res.status(400).json({ error: 'Name and age are required!' });
    }
    res.json({ message: `Hello, ${name}! You are ${age} years old.` });
});

// Specify the port
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
