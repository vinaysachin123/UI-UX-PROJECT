const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// POST /api/supplier
app.post('/api/supplier', (req, res) => {
    const { name, city } = req.body;
    if (!name || !city) {
        return res.status(400).json({ error: "Name and city are required." });
    }

    const stmt = db.prepare('INSERT INTO Suppliers (name, city) VALUES (?, ?)');
    stmt.run([name, city], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, name, city });
    });
    stmt.finalize();
});

// POST /api/inventory
app.post('/api/inventory', (req, res) => {
    const { supplier_id, product_name, quantity, price } = req.body;

    if (!supplier_id || !product_name || quantity === undefined || price === undefined) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    if (quantity < 0) {
        return res.status(400).json({ error: "Quantity must be >= 0." });
    }

    if (price <= 0) {
        return res.status(400).json({ error: "Price must be > 0." });
    }

    // Verify supplier exists
    db.get('SELECT id FROM Suppliers WHERE id = ?', [supplier_id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Database error during supplier validation." });
        }
        if (!row) {
            return res.status(400).json({ error: "Invalid supplier_id. Supplier does not exist." });
        }

        // Insert inventory
        const stmt = db.prepare('INSERT INTO Inventory (supplier_id, product_name, quantity, price) VALUES (?, ?, ?, ?)');
        stmt.run([supplier_id, product_name, quantity, price], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID, supplier_id, product_name, quantity, price });
        });
        stmt.finalize();
    });
});

// GET /api/inventory
// Return all inventory grouped by supplier, sorted by total inventory value (quantity × price)
app.get('/api/inventory', (req, res) => {
    const query = `
        SELECT 
            s.id AS supplier_id,
            s.name AS supplier_name,
            s.city AS supplier_city,
            SUM(i.quantity * i.price) AS total_inventory_value,
            json_group_array(
                json_object(
                    'id', i.id,
                    'product_name', i.product_name,
                    'quantity', i.quantity,
                    'price', i.price,
                    'item_value', i.quantity * i.price
                )
            ) as products
        FROM Suppliers s
        JOIN Inventory i ON s.id = i.supplier_id
        GROUP BY s.id
        ORDER BY total_inventory_value DESC
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        // Parse the json_group_array text back into JSON objects
        const results = rows.map(row => {
            return {
                supplier_id: row.supplier_id,
                supplier_name: row.supplier_name,
                supplier_city: row.supplier_city,
                total_inventory_value: row.total_inventory_value,
                products: JSON.parse(row.products)
            };
        });

        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Assignment B API server running on http://localhost:${PORT}`);
});
