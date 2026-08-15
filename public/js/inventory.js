// SARAKI - Inventory Management JavaScript

// Inventory data structure
let inventoryData = {
  products: [],
  movements: [],
  alerts: []
};

// Chart instance
let stockChart = null;

// Load products with inventory data
async function loadInventory() {
  try {
    // Load products from localStorage or JSON
    const localStorageData = localStorage.getItem('saraki_products');
    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      if (data.products && Array.isArray(data.products)) {
        inventoryData.products = data.products.map(product => ({
          ...product,
          stock: product.stock || Math.floor(Math.random() * 20) + 5, // Default random stock
          alertThreshold: product.alertThreshold || 5,
          lastUpdated: product.lastUpdated || new Date().toISOString()
        }));
      }
    } else {
      const response = await fetch('../js/products.json');
      if (response.ok) {
        const data = await response.json();
        inventoryData.products = (data.products || []).map(product => ({
          ...product,
          stock: Math.floor(Math.random() * 20) + 5,
          alertThreshold: 5,
          lastUpdated: new Date().toISOString()
        }));
      }
    }
    
    // Load movements from localStorage
    const movementsData = localStorage.getItem('saraki_movements');
    if (movementsData) {
      inventoryData.movements = JSON.parse(movementsData);
    }
    
    // Generate alerts based on stock levels
    generateAlerts();
    
    // Update UI
    updateMetrics();
    renderStockTable();
    renderMovementsTable();
    renderAlerts();
    createStockChart();
    
  } catch (error) {
    console.error('Error loading inventory:', error);
  }
}

// Save inventory data
function saveInventory() {
  const productsToSave = inventoryData.products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    featured: product.featured,
    stock: product.stock,
    alertThreshold: product.alertThreshold,
    lastUpdated: product.lastUpdated
  }));
  
  localStorage.setItem('saraki_products', JSON.stringify({ products: productsToSave }));
  localStorage.setItem('saraki_movements', JSON.stringify(inventoryData.movements));
}

// Generate stock alerts
function generateAlerts() {
  inventoryData.alerts = [];
  
  inventoryData.products.forEach(product => {
    if (product.stock === 0) {
      inventoryData.alerts.push({
        type: 'danger',
        product: product.name,
        message: `Rupture de stock: ${product.name}`,
        timestamp: new Date().toISOString()
      });
    } else if (product.stock <= product.alertThreshold) {
      inventoryData.alerts.push({
        type: 'warning',
        product: product.name,
        message: `Stock bas: ${product.name} (${product.stock} unités)`,
        timestamp: new Date().toISOString()
      });
    }
  });
}

// Update metrics
function updateMetrics() {
  const totalProducts = inventoryData.products.length;
  const totalStock = inventoryData.products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = inventoryData.products.filter(p => p.stock > 0 && p.stock <= p.alertThreshold).length;
  const outOfStockCount = inventoryData.products.filter(p => p.stock === 0).length;
  
  document.getElementById('total-products').textContent = totalProducts;
  document.getElementById('total-stock').textContent = totalStock;
  document.getElementById('low-stock-count').textContent = lowStockCount;
  document.getElementById('out-of-stock-count').textContent = outOfStockCount;
  
  // Style metric cards based on alerts
  if (lowStockCount > 0) {
    document.getElementById('low-stock-count').parentElement.classList.add('low-stock');
  }
  if (outOfStockCount > 0) {
    document.getElementById('out-of-stock-count').parentElement.classList.add('low-stock');
  }
}

// Render stock table
function renderStockTable() {
  const tbody = document.getElementById('stock-table-body');
  tbody.innerHTML = '';
  
  inventoryData.products.forEach(product => {
    const stockLevel = getStockLevel(product);
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
          <strong>${product.name}</strong>
        </div>
      </td>
      <td>${product.category}</td>
      <td>
        <input type="number" class="stock-input" id="stock-${product.id}" value="${product.stock}" min="0" onchange="updateStock(${product.id}, this.value)">
      </td>
      <td>
        <input type="number" class="stock-input" id="threshold-${product.id}" value="${product.alertThreshold}" min="1" onchange="updateThreshold(${product.id}, this.value)">
      </td>
      <td><span class="stock-level ${stockLevel.class}">${stockLevel.label}</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn-adjust" onclick="adjustStock(${product.id}, 1)">+1</button>
          <button class="btn-adjust" onclick="adjustStock(${product.id}, -1)">-1</button>
          <button class="btn-adjust" onclick="quickAddStock(${product.id})">Ajout rapide</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Get stock level class and label
function getStockLevel(product) {
  if (product.stock === 0) {
    return { class: 'out-of-stock', label: 'Rupture' };
  } else if (product.stock <= product.alertThreshold) {
    return { class: 'low-stock', label: 'Stock bas' };
  } else {
    return { class: 'in-stock', label: 'En stock' };
  }
}

// Update stock directly
function updateStock(productId, newStock) {
  const product = inventoryData.products.find(p => p.id === productId);
  if (!product) return;
  
  const oldStock = product.stock;
  product.stock = parseInt(newStock);
  product.lastUpdated = new Date().toISOString();
  
  // Record movement
  const difference = product.stock - oldStock;
  if (difference !== 0) {
    recordMovement(product, difference, 'Mise à jour manuelle');
  }
  
  saveInventory();
  updateMetrics();
  renderStockTable();
  generateAlerts();
  renderAlerts();
  createStockChart();
}

// Update alert threshold
function updateThreshold(productId, newThreshold) {
  const product = inventoryData.products.find(p => p.id === productId);
  if (!product) return;
  
  product.alertThreshold = parseInt(newThreshold);
  product.lastUpdated = new Date().toISOString();
  
  saveInventory();
  generateAlerts();
  renderAlerts();
}

// Adjust stock by amount
function adjustStock(productId, amount) {
  const product = inventoryData.products.find(p => p.id === productId);
  if (!product) return;
  
  const oldStock = product.stock;
  product.stock = Math.max(0, product.stock + amount);
  product.lastUpdated = new Date().toISOString();
  
  // Record movement
  if (product.stock !== oldStock) {
    const type = amount > 0 ? 'add' : 'remove';
    recordMovement(product, amount, amount > 0 ? 'Ajustement +' : 'Ajustement -');
  }
  
  saveInventory();
  updateMetrics();
  renderStockTable();
  generateAlerts();
  renderAlerts();
  createStockChart();
}

// Quick add stock
function quickAddStock(productId) {
  const amount = prompt('Quantité à ajouter:', '10');
  if (amount && !isNaN(amount)) {
    adjustStock(productId, parseInt(amount));
  }
}

// Record stock movement
function recordMovement(product, quantity, note) {
  const movement = {
    id: Date.now(),
    productId: product.id,
    productName: product.name,
    type: quantity > 0 ? 'add' : 'remove',
    quantity: Math.abs(quantity),
    newStock: product.stock,
    note: note,
    timestamp: new Date().toISOString()
  };
  
  inventoryData.movements.unshift(movement);
  
  // Keep only last 100 movements
  if (inventoryData.movements.length > 100) {
    inventoryData.movements = inventoryData.movements.slice(0, 100);
  }
}

// Render movements table
function renderMovementsTable() {
  const tbody = document.getElementById('movements-table-body');
  tbody.innerHTML = '';
  
  const filter = document.getElementById('movement-filter').value;
  const filteredMovements = filter === 'all' 
    ? inventoryData.movements 
    : inventoryData.movements.filter(m => m.type === filter);
  
  filteredMovements.forEach(movement => {
    const date = new Date(movement.timestamp).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${date}</td>
      <td>${movement.productName}</td>
      <td><span class="transaction-type ${movement.type}">${movement.type === 'add' ? '+' : '-'}</span></td>
      <td>${movement.quantity}</td>
      <td>${movement.newStock}</td>
      <td>${movement.note}</td>
    `;
    tbody.appendChild(row);
  });
}

// Filter movements
function filterMovements() {
  renderMovementsTable();
}

// Render alerts
function renderAlerts() {
  const container = document.getElementById('alerts-container');
  const overviewAlerts = document.getElementById('alert-container');
  
  // Render in alerts section
  container.innerHTML = '';
  overviewAlerts.innerHTML = '';
  
  if (inventoryData.alerts.length === 0) {
    container.innerHTML = '<p>Aucune alerte de stock.</p>';
    overviewAlerts.innerHTML = '';
    return;
  }
  
  inventoryData.alerts.forEach(alert => {
    const alertHTML = `
      <div class="alert-box ${alert.type}">
        <strong>${alert.type === 'danger' ? '⚠️' : '⚡'} ${alert.message}</strong>
        <br><small>Le ${new Date(alert.timestamp).toLocaleDateString('fr-FR')}</small>
      </div>
    `;
    container.innerHTML += alertHTML;
    
    // Show only critical alerts in overview
    if (alert.type === 'danger') {
      overviewAlerts.innerHTML += alertHTML;
    }
  });
}

// Create stock chart
function createStockChart() {
  const ctx = document.getElementById('stockChart').getContext('2d');
  
  if (stockChart) {
    stockChart.destroy();
  }
  
  // Group stock by category
  const categoryData = {};
  inventoryData.products.forEach(product => {
    if (!categoryData[product.category]) {
      categoryData[product.category] = 0;
    }
    categoryData[product.category] += product.stock;
  });
  
  stockChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(categoryData),
      datasets: [{
        label: 'Stock',
        data: Object.values(categoryData),
        backgroundColor: [
          '#D4AF37',
          '#0A0A0A',
          '#5C1A1A',
          '#1A5C3A',
          '#F5F1E8'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Show section
function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll('.inventory-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Remove active class from nav buttons
  document.querySelectorAll('.inventory-nav button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected section
  const sectionId = sectionName + '-section';
  document.getElementById(sectionId).classList.add('active');
  
  // Set active button
  if (event && event.target) {
    event.target.classList.add('active');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  loadInventory();
});

// Make functions globally available
window.showSection = showSection;
window.updateStock = updateStock;
window.updateThreshold = updateThreshold;
window.adjustStock = adjustStock;
window.quickAddStock = quickAddStock;
window.filterMovements = filterMovements;