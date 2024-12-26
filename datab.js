const express = require('express');
const connectDB = require('./db'); // Import the database connection function

const app = express();

// Connect to the database
connectDB();

// Middleware and routes
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(3000, () => {
    console.log('Server is running on :3000');
});



