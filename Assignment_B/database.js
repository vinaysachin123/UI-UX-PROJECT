const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize Schema
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Suppliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            city TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            supplier_id INTEGER,
            product_name TEXT NOT NULL,
            quantity INTEGER NOT NULL CHECK(quantity >= 0),
            price REAL NOT NULL CHECK(price > 0),
            FOREIGN KEY (supplier_id) REFERENCES Suppliers(id)
        )
    `);
});

module.exports = db;
