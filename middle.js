const express = require('express');
const app = express();

app.use(express.json());

// Validation middleware
function validateRequest(req, res, next) {
    const { name, email } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing "name".' });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid or missing "email".' });
    }

    next(); // Proceed to the next middleware or route handler
}

// Route with validation middleware
app.post('/validate-input', validateRequest, (req, res) => {
    res.json({
        message: 'Validation successful!',
        data: req.body
    });
});

app.listen(3000, () => {
    console.log('Validation Middleware server running on http://localhost:3000');
});
