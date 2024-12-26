require('dotenv').config();

const express = require('express');
const app = express();

// Use environment variables
const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not set
const DB_URL = process.env.DB_URL;
const SECRET_KEY = process.env.SECRET_KEY;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    console.log(`Database URL: ${DB_URL}`);
    console.log(`Secret Key: ${SECRET_KEY}`);
});
