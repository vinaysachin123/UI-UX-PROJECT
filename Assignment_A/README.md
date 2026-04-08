# ZeeroStock Assignment A: Inventory Search API + UI

This project is a standalone Node.js and Express application demonstrating a full-stack search interface for surplus inventory, as per the specifications of Assignment A.

## Running the Application Locally
1. Ensure Node.js is installed.
2. In this directory (`Assignment_A`), run: `npm install`
3. Start the server: `node server.js`
4. Open your browser and navigate to `http://localhost:3000`

## Implementation Details

### Search Logic Explanation
The `/api/search` endpoint processes incoming GET requests containing query string parameters (`q`, `category`, `minPrice`, `maxPrice`).
The base data is loaded from `data.json` into memory. 

- **Chaining Filters**: For each valid parameter, we chain a standard array `.filter()` process. This handles the requirement that "Multiple filters can be combined".
- **Empty Filters**: If no parameters are given (or if they are blank), the pipeline simply returns the full `results` array, fulfilling "If no filters -> return all results".
- **Case-Insensitivity**: Both the target query (`q`) and the product names/categories are converted to `.toLowerCase()` before checking `.includes()` ensuring case-insensitive lookups.
- **Validation**: Price values are parsed via `parseFloat()` and checked against `isNaN()` to gracefully ignore invalid input forms, preventing database crashing or errors on malformed requests.

### Performance Improvement for Large Datasets
Currently, the search relies on linear `$O(N)$` scans over an in-memory array using Javascript's `.filter()` which is perfectly efficient for 15 records. However, for large datasets (e.g., millions of rows), this degrades to inefficient full table scans.

**Recommended Performance Overhaul for Scale:**
1. **Move to a Document Store with Text Indexing:** I would migrate the JSON payload to **Elasticsearch** (or MongoDB with text indexes). Elasticsearch specializes in full-text search utilizing inverted indices, ensuring ultra-fast keyword lookups without iterating over all documents.
2. **Implement Backend Pagination:** The API would return a fixed slice of results (e.g. `limit=50` and `cursor/offset`) rather than loading up thousands of JSON objects at once. This enormously mitigates network transmission overhead and frontend rendering lag.
3. **Caching Layer:** For common filter sets (e.g., popular categories without complex full-text typing), I would aggressively cache the query responses in **Redis** with a short TTL. This shields the primary database engine from repetitive read queries.
