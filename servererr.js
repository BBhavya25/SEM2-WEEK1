const express = require('express');
const app = express();

app.use(express.json());

// Route that intentionally throws an error
app.get('/error', (req, res, next) => {
    throw new Error('This is a server-side error.');
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(3000, () => {
    console.log('Error Handling server running on :3000');
});
