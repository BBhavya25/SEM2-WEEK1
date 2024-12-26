const express = require('express');
const app = express();

app.use(express.json());

// Example mock data for demonstration
const items = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

// Pagination and sorting route
app.get('/api/items', (req, res) => {
    const { page = 1, limit = 10, sort = 'asc' } = req.query;

    // Sorting the items
    const sortedItems = [...items].sort((a, b) =>
        sort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    // Paginating the sorted items
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedItems = sortedItems.slice(startIndex, endIndex);

    res.json({
        sort,
        page: Number(page),
        limit: Number(limit),
        total: items.length,
        data: paginatedItems,
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on :3000');
});
