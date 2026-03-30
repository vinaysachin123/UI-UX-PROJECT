<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-bs-theme="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Product Management</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #121212; color: #e0e0e0; }
        .card { background-color: #1e1e1e; border: none; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
        .form-control { background-color: #2c2c2c; color: #fff; border: 1px solid #444; border-radius: 8px; }
        .form-control:focus { background-color: #333; color: #fff; border-color: #0d6efd; box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25); }
        .table { color: #e0e0e0; border-collapse: separate; border-spacing: 0 8px; }
        .table tbody tr { background-color: #1e1e1e; box-shadow: 0 2px 6px rgba(0,0,0,0.3); border-radius: 8px; }
        .table td, .table th { border: none; padding: 16px; vertical-align: middle; }
        .table thead th { border-bottom: 2px solid #333; font-weight: 600; color: #aaa; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; }
        .table tbody tr td:first-child { border-top-left-radius: 8px; border-bottom-left-radius: 8px; }
        .table tbody tr td:last-child { border-top-right-radius: 8px; border-bottom-right-radius: 8px; }
        .btn-primary { border-radius: 8px; font-weight: 600; padding: 10px 24px; }
        .header-title { background: linear-gradient(90deg, #0d6efd, #0dcaf0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800; }
        .sum-row { background-color: #0d6efd !important; color: white !important; font-weight: bold; border-radius: 8px; }
        .sum-row td { border-radius: 8px; }
    </style>
</head>
<body class="antialiased">
    <div class="container py-5">
        <h1 class="header-title mb-4 text-center">Product Inventory</h1>
        
        <div class="row justify-content-center mb-5">
            <div class="col-md-8">
                <div class="card p-4">
                    <h4 class="mb-4">Add New Product</h4>
                    <form id="productForm">
                        <div class="row g-3">
                            <div class="col-md-12">
                                <label for="name" class="form-label">Product Name</label>
                                <input type="text" class="form-control" id="name" required placeholder="e.g. Wireless Mouse">
                            </div>
                            <div class="col-md-6">
                                <label for="quantity_in_stock" class="form-label">Quantity in Stock</label>
                                <input type="number" class="form-control" id="quantity_in_stock" required min="0" placeholder="0">
                            </div>
                            <div class="col-md-6">
                                <label for="price_per_item" class="form-label">Price per Item ($)</label>
                                <input type="number" step="0.01" class="form-control" id="price_per_item" required min="0" placeholder="0.00">
                            </div>
                            <div class="col-12 mt-4 text-end">
                                <button type="submit" class="btn btn-primary" id="submitBtn">
                                    <span class="spinner-border spinner-border-sm d-none" id="submitSpinner" role="status" aria-hidden="true"></span>
                                    Submit Product
                                </button>
                            </div>
                        </div>
                    </form>
                    <div id="formAlert" class="alert mt-3 d-none"></div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <h4 class="mb-3">Submitted Data</h4>
                <div class="table-responsive">
                    <table class="table" id="productsTable">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity in Stock</th>
                                <th>Price per Item</th>
                                <th>Datetime Submitted</th>
                                <th>Total Value Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="productsBody">
                            <tr>
                                <td colspan="6" class="text-center">Loading data...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            fetchProducts();

            const form = document.getElementById('productForm');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                submitProduct();
            });
        });

        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const products = await response.json();
                renderTable(products);
            } catch (error) {
                console.error('Error fetching products:', error);
                document.getElementById('productsBody').innerHTML = '<tr><td colspan="6" class="text-center text-danger">Failed to load data.</td></tr>';
            }
        };

        const submitProduct = async () => {
            const name = document.getElementById('name').value;
            const quantity = document.getElementById('quantity_in_stock').value;
            const price = document.getElementById('price_per_item').value;
            
            const btn = document.getElementById('submitBtn');
            const spinner = document.getElementById('submitSpinner');
            btn.disabled = true;
            spinner.classList.remove('d-none');

            try {
                const response = await fetch('/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        quantity_in_stock: quantity,
                        price_per_item: price
                    })
                });

                if (response.ok) {
                    const products = await response.json();
                    renderTable(products);
                    document.getElementById('productForm').reset();
                    showAlert('Product successfully added!', 'success');
                } else {
                    const errorData = await response.json();
                    showAlert('Error validating data: ' + JSON.stringify(errorData.errors), 'danger');
                }
            } catch (error) {
                console.error('Error submitting product:', error);
                showAlert('Network error occurred.', 'danger');
            } finally {
                btn.disabled = false;
                spinner.classList.add('d-none');
            }
        };

        const renderTable = (products) => {
            const tbody = document.getElementById('productsBody');
            tbody.innerHTML = '';

            if (products.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No products found. Add some above.</td></tr>';
                return;
            }

            let sumTotal = 0;

            products.forEach(product => {
                const totalValue = (product.quantity_in_stock * product.price_per_item);
                sumTotal += totalValue;

                const tr = document.createElement('tr');
                tr.id = `row-${product.id}`;
                tr.innerHTML = `
                    <td class="product-name">${escapeHtml(product.name)}</td>
                    <td class="product-quantity">${product.quantity_in_stock}</td>
                    <td class="product-price">$${parseFloat(product.price_per_item).toFixed(2)}</td>
                    <td>${new Date(product.created_at).toLocaleString()}</td>
                    <td class="product-total-value"><strong>$${totalValue.toFixed(2)}</strong></td>
                    <td>
                        <button class="btn btn-sm btn-outline-info edit-btn" onclick="editRow(${product.id})">Edit</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            const sumTr = document.createElement('tr');
            sumTr.className = 'sum-row';
            sumTr.innerHTML = `
                <td colspan="4" class="text-end text-uppercase"><strong>Sum Total of All Values:</strong></td>
                <td colspan="2"><strong>$${sumTotal.toFixed(2)}</strong></td>
            `;
            tbody.appendChild(sumTr);
        };

        const editRow = (id) => {
            const tr = document.getElementById(`row-${id}`);
            const nameTd = tr.querySelector('.product-name');
            const qtyTd = tr.querySelector('.product-quantity');
            const priceTd = tr.querySelector('.product-price');
            const editBtn = tr.querySelector('.edit-btn');

            const currentName = nameTd.innerText;
            const currentQty = qtyTd.innerText;
            const currentPriceText = priceTd.innerText.replace('$', '');
            const currentPrice = currentPriceText;

            nameTd.innerHTML = `<input type="text" class="form-control form-control-sm edit-name" value="${currentName}">`;
            qtyTd.innerHTML = `<input type="number" class="form-control form-control-sm edit-qty" value="${currentQty}">`;
            priceTd.innerHTML = `<input type="number" step="0.01" class="form-control form-control-sm edit-price" value="${currentPrice}">`;
            
            editBtn.innerText = 'Save';
            editBtn.classList.remove('btn-outline-info');
            editBtn.classList.add('btn-success');
            editBtn.setAttribute('onclick', `saveRow(${id})`);
        };

        const saveRow = async (id) => {
            const tr = document.getElementById(`row-${id}`);
            const newName = tr.querySelector('.edit-name').value;
            const newQty = tr.querySelector('.edit-qty').value;
            const newPrice = tr.querySelector('.edit-price').value;

            const editBtn = tr.querySelector('.edit-btn');
            editBtn.innerText = 'Saving...';
            editBtn.disabled = true;

            try {
                const response = await fetch(`/api/products/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: newName,
                        quantity_in_stock: newQty,
                        price_per_item: newPrice
                    })
                });

                if (response.ok) {
                    const products = await response.json();
                    renderTable(products);
                } else {
                    const errorData = await response.json();
                    showAlert('Error saving data: ' + JSON.stringify(errorData.errors), 'danger');
                    fetchProducts(); // reset table
                }
            } catch (error) {
                console.error('Error updating product:', error);
                showAlert('Network error occurred.', 'danger');
                fetchProducts(); // reset table
            }
        };

        const showAlert = (message, type) => {
            const alertDiv = document.getElementById('formAlert');
            alertDiv.className = `alert mt-3 alert-${type}`;
            alertDiv.innerText = message;
            alertDiv.classList.remove('d-none');
            setTimeout(() => {
                alertDiv.classList.add('d-none');
            }, 5000);
        };

        const escapeHtml = (unsafe) => {
            return unsafe
                 .replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#039;");
        }
    </script>
</body>
</html>
