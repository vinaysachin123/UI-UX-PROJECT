const db = require('./database');

const seed = () => {
    db.serialize(() => {
        // Clear existing data
        db.run('DELETE FROM Inventory');
        db.run('DELETE FROM Suppliers');

        // Seed Suppliers
        db.run('INSERT INTO Suppliers (name, city) VALUES (?, ?)', ['Global Logistics', 'Chicago']);
        db.run('INSERT INTO Suppliers (name, city) VALUES (?, ?)', ['Metro Office Supplies', 'New York']);
        
        // Seed Inventory
        // Supplier 1
        db.run('INSERT INTO Inventory (supplier_id, product_name, quantity, price) VALUES (?, ?, ?, ?)', [1, 'Industrial Pallet Jack', 5, 450.00]);
        db.run('INSERT INTO Inventory (supplier_id, product_name, quantity, price) VALUES (?, ?, ?, ?)', [1, 'Heavy Duty Shelving', 20, 120.50]);
        
        // Supplier 2
        db.run('INSERT INTO Inventory (supplier_id, product_name, quantity, price) VALUES (?, ?, ?, ?)', [2, 'Ergonomic Desk Chair', 15, 299.99]);
        db.run('INSERT INTO Inventory (supplier_id, product_name, quantity, price) VALUES (?, ?, ?, ?)', [2, 'Dual Monitor Stand', 30, 85.00]);
        db.run('INSERT INTO Inventory (supplier_id, product_name, quantity, price) VALUES (?, ?, ?, ?)', [2, 'Wireless Keyboard Bundle', 50, 45.00]);

        console.log('Database seeded successfully.');
    });
};

seed();
