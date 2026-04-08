# ZeeroStock Assignment B: Inventory Database + APIs

This project is a standalone Node.js API demonstrating RESTful endpoints over a relational database, meeting all specifications for Assignment B.

## Setup & Running
1. Navigate to this directory (`Assignment_B`).
2. Run `npm install` to download dependencies (Express, SQLite3).
3. Start the server: `node server.js`
4. The SQLite database file (`database.sqlite`) will automatically initialize.
5. Endpoints run at `http://localhost:4000/api/...`

## Database Schema Explanation
The database leverages **SQLite** (a lightweight relational SQL database).
- **Suppliers Table**: `(id PK, name, city)`. Represents the business entity.
- **Inventory Table**: `(id PK, supplier_id FK, product_name, quantity, price)`. 
The `supplier_id` acts as a Foreign Key securely mapping a many-to-one relationship (Many inventory items -> One supplier). 
Schema level constraints include `CHECK(quantity >= 0)` and `CHECK(price > 0)` ensuring robust data integrity at the database layer.

## Why SQL vs NoSQL?
For this inventory management system, **SQL was deliberately chosen over NoSQL**. 
1. **Relational Nature**: An inventory inherently represents highly structured relational data (Suppliers strictly relate to specific inventory). SQL’s standard Foreign Key constraints prevent "orphan records" (e.g., inventory belonging to a deleted or non-existent supplier), guaranteeing ACID compliance.
2. **Aggregation Power**: The core requirement involves grouping inventory by supplier and calculating complex aggregates on the fly (total inventory value). Relational engines like PostgreSQL/SQLite are massively optimized for `JOIN` and `GROUP BY` mathematical clauses, which require complex map-reduce functions or tricky aggregation pipelines in NoSQL databases like MongoDB.

## Optimization & Indexing Suggestion
If the dataset reaches millions of records, calculating `SUM(i.quantity * i.price)` dynamically for every read would cause critical performance bottlenecks.

**Suggestion 1: Indexing**
Create a Non-Clustered Foreign Key Index on `supplier_id`:
```sql
CREATE INDEX idx_inventory_supplier_id ON Inventory(supplier_id);
```
Without this index, running a `JOIN` across suppliers and inventory would result in a full table scan. The index ensures the DB engine instantly locates all inventory items for a specific supplier.

**Suggestion 2: Materialized Views / Value Caching**
Instead of calculating `(quantity * price)` dynamically on every read, we could:
- Create a `total_value` trigger that computes and stores the value dynamically upon insert.
- Use a **Materialized View** that caches the grouped arithmetic result and is refreshed periodically via a cron job, serving reads in O(1) time rather than computing huge aggregations synchronously on the request tread.
