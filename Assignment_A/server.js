const express = require('express');
const path = require('path');
const cors = require('cors');
const data = require('./data.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// GET /api/search
app.get('/api/search', (req, res) => {
    let { q, category, minPrice, maxPrice } = req.query;
    let results = data;

    if (q) {
        const queryLower = q.toLowerCase();
        results = results.filter(item => item.product_name.toLowerCase().includes(queryLower));
    }

    if (category && category !== 'All') {
        const catLower = category.toLowerCase();
        results = results.filter(item => item.category.toLowerCase() === catLower);
    }

    if (minPrice !== undefined && minPrice !== '') {
        const min = parseFloat(minPrice);
        if (!isNaN(min) && min >= 0) {
            results = results.filter(item => item.price >= min);
        }
    }

    if (maxPrice !== undefined && maxPrice !== '') {
        const max = parseFloat(maxPrice);
        if (!isNaN(max) && max >= 0) {
            results = results.filter(item => item.price <= max);
        }
    }

    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Assignment A server running on http://localhost:${PORT}`);
});
