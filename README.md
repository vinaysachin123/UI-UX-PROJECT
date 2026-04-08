# ZeeroStock Technical Assessment

This repository contains the implementation of both search-focused and database-focused assignments for the ZeeroStock software engineering role.

## Project Structure

The project is divided into two standalone applications to demonstrate flexibility across different technical domains:

### [Assignment A: Inventory Search API + UI](./Assignment_A)
A full-stack implementation featuring:
- **Fast Search API**: Node.js/Express backend with partial matching and multi-filter chaining.
- **Premium Frontend**: Responsive, dark-mode Vanilla JS/CSS interface (Built from scratch, no heavy frameworks).
- **UX Best Practices**: Handles empty states, loading indicators, and input validation.

### [Assignment B: Inventory Database + APIs](./Assignment_B)
A backend-focused RELATIONAL database implementation featuring:
- **SQLite Integration**: Provides high-performance SQL relational mapping without external dependencies.
- **Data Integrity**: Robust Foreign Key relationships and constraint-level validation.
- **Advanced Aggregation**: A high-performance SQL query that calculates inventory valuation grouped by suppliers on-the-fly.

## Getting Started

Each project is self-contained. To run either:

1. Navigate into the directory: `cd Assignment_A` or `cd Assignment_B`
2. Install dependencies: `npm install`
3. Start the application: `node server.js`

## Design Decisions

- **Vanilla Technologies**: I chose to use Vanilla JS and CSS for the UI to demonstrate mastery over the fundamentals of the web, ensuring the fastest possible load times and zero dependency bloat.
- **Relational SQL over NoSQL**: For inventory systems, data consistency is paramount. Using SQL ensures that stock records are always linked to valid suppliers, preventing "orphan" data that often occurs in NoSQL systems.
- **Scalability Rationale**: Each assignment's README contains a section on how these systems would scale to millions of records, detailing indexing and caching strategies.

---
*Developed as a comprehensive solution to showcase both frontend design sense and backend architectural rigor.*
