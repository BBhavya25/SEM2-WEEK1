const express = require('express');
const app = express();
app.use(express.json());

// Mock data for demonstration
const items = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

app.get('/api/items', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedItems = items.slice(startIndex, endIndex);
    res.json({
        page: Number(page),
        limit: Number(limit),
        total: items.length,
        data: paginatedItems,
    });
});

app.listen(3000, () => console.log('Pagination server running on:3000'));
