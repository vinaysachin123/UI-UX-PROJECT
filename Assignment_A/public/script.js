const searchForm = document.getElementById('searchForm');
const resultsGrid = document.getElementById('resultsGrid');
const loadingEl = document.getElementById('loading');
const noResultsEl = document.getElementById('noResults');
const resultCountEl = document.getElementById('resultCount');

const qInput = document.getElementById('q');
const categoryInput = document.getElementById('category');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');

async function fetchResults() {
    const params = new URLSearchParams();
    
    if (qInput.value.trim()) params.append('q', qInput.value.trim());
    if (categoryInput.value !== 'All') params.append('category', categoryInput.value);
    
    // Handle invalid price ranges
    const minP = parseFloat(minPriceInput.value);
    const maxP = parseFloat(maxPriceInput.value);
    
    if (!isNaN(minP)) params.append('minPrice', minP);
    if (!isNaN(maxP)) params.append('maxPrice', maxP);

    if (!isNaN(minP) && !isNaN(maxP) && minP > maxP) {
        alert("Minimum price cannot be greater than maximum price.");
        return;
    }

    resultsGrid.innerHTML = '';
    loadingEl.classList.remove('hidden');
    noResultsEl.classList.add('hidden');

    try {
        const response = await fetch(`/api/search?${params.toString()}`);
        const data = await response.json();
        
        loadingEl.classList.add('hidden');
        resultCountEl.textContent = `${data.length} item${data.length !== 1 ? 's' : ''} found`;

        if (data.length === 0) {
            noResultsEl.classList.remove('hidden');
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.animation = `fadeIn 0.5s ease`;
            
            const stockClass = item.stock > 0 ? '' : 'out';
            const stockText = item.stock > 0 ? `${item.stock} in stock` : 'Out of stock';

            card.innerHTML = `
                <div class="card-category">${item.category}</div>
                <h3 class="card-title">${item.product_name}</h3>
                <div class="card-footer">
                    <div class="card-price">$${item.price.toFixed(2)}</div>
                    <div class="card-stock ${stockClass}">${stockText}</div>
                </div>
            `;
            resultsGrid.appendChild(card);
        });

    } catch (err) {
        console.error("Error fetching results:", err);
        loadingEl.classList.add('hidden');
        noResultsEl.classList.remove('hidden');
        noResultsEl.querySelector('p').textContent = "Error fetching results";
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchResults();
});

// Load all items initially
document.addEventListener('DOMContentLoaded', fetchResults);
