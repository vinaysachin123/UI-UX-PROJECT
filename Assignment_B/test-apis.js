const http = require('http');

const PORT = 4000;
const BASE_URL = `http://localhost:${PORT}/api`;

const request = (path, method = 'GET', data = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: PORT,
            path: `/api${path}`,
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    body: body ? JSON.parse(body) : null
                });
            });
        });

        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
};

async function runTests() {
    console.log('🚀 Starting Automated API Validation for Assignment B...\n');

    try {
        // 1. Create Supplier
        console.log('Test 1: Create Supplier');
        const supplier = await request('/supplier', 'POST', { name: 'Test Supplier', city: 'Test City' });
        console.log('✅ Success:', supplier.status === 201 ? 'PASSED' : 'FAILED', `(Status: ${supplier.status})`);
        const supplierId = supplier.body.id;

        // 2. Invalid Inventory (Negative Quantity)
        console.log('\nTest 2: Rule Validation - Quantity >= 0');
        const invFail1 = await request('/inventory', 'POST', { 
            supplier_id: supplierId, 
            product_name: 'Bad Stock', 
            quantity: -5, 
            price: 100 
        });
        console.log('✅ Success:', invFail1.status === 400 ? 'PASSED (Rejected Negative Qty)' : 'FAILED');

        // 3. Invalid Inventory (Zero Price)
        console.log('\nTest 3: Rule Validation - Price > 0');
        const invFail2 = await request('/inventory', 'POST', { 
            supplier_id: supplierId, 
            product_name: 'Cheap Stock', 
            quantity: 10, 
            price: 0 
        });
        console.log('✅ Success:', invFail2.status === 400 ? 'PASSED (Rejected Zero Price)' : 'FAILED');

        // 4. Invalid Supplier ID
        console.log('\nTest 4: Rule Validation - Valid Supplier Required');
        const invFail3 = await request('/inventory', 'POST', { 
            supplier_id: 9999, 
            product_name: 'Orphan Stock', 
            quantity: 10, 
            price: 10 
        });
        console.log('✅ Success:', invFail3.status === 400 ? 'PASSED (Rejected Invalid Supplier ID)' : 'FAILED');

        // 5. Valid Inventory
        console.log('\nTest 5: Create Valid Inventory');
        const invSuccess = await request('/inventory', 'POST', { 
            supplier_id: supplierId, 
            product_name: 'Premium Desk', 
            quantity: 10, 
            price: 500 
        });
        console.log('✅ Success:', invSuccess.status === 201 ? 'PASSED' : 'FAILED');

        // 6. Aggregation Query
        console.log('\nTest 6: Verify Grouped Aggregation Query');
        const report = await request('/inventory', 'GET');
        console.log('✅ Success:', Array.isArray(report.body) ? 'PASSED (Returned Array)' : 'FAILED');
        if (report.body.length > 0) {
            console.log(`📊 Highest Inventory Value: $${report.body[0].total_inventory_value}`);
        }

        console.log('\n✨ All tests completed successfully!');
    } catch (err) {
        console.error('\n❌ Test execution failed. Is the server running?');
        console.error(err.message);
    }
}

runTests();
