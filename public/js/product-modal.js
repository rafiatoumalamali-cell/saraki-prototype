// SARAKI - Product Modal JavaScript

let currentModalProduct = null;
let modalQuantity = 1;

// Open product modal
function openProductModal(productId) {
  // Load products
  const localStorageData = localStorage.getItem('saraki_products');
  let products = [];
  
  if (localStorageData) {
    try {
      const data = JSON.parse(localStorageData);
      products = data.products || [];
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }
  
  if (products.length === 0) {
    // Fallback to JSON file
    fetch('../js/products.json')
      .then(response => response.json())
      .then(data => {
        products = data.products || [];
        showModalWithProduct(products, productId);
      })
      .catch(error => {
        console.error('Error loading products:', error);
      });
  } else {
    showModalWithProduct(products, productId);
  }
}

// Show modal with product data
function showModalWithProduct(products, productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  currentModalProduct = product;
  modalQuantity = 1;
  
  // Populate modal
  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalCategory').textContent = product.category;
  document.getElementById('modalPrice').textContent = product.price;
  document.getElementById('modalDescription').textContent = product.description;
  
  // Update stock status
  const stock = product.stock || 0;
  const alertThreshold = product.alertThreshold || 5;
  
  const stockStatus = document.getElementById('modalStockStatus');
  const stockCount = document.getElementById('modalStockCount');
  const addToCartBtn = document.getElementById('modalAddToCart');
  const quantityInput = document.getElementById('modalQuantity');
  
  if (stock === 0) {
    stockStatus.textContent = 'Rupture de stock';
    stockStatus.className = 'stock-status out-of-stock';
    stockCount.textContent = '0 unité disponible';
    addToCartBtn.disabled = true;
    addToCartBtn.textContent = 'Rupture de stock';
    quantityInput.disabled = true;
  } else if (stock <= alertThreshold) {
    stockStatus.textContent = 'Stock limité';
    stockStatus.className = 'stock-status low-stock';
    stockCount.textContent = `${stock} unités disponibles`;
    addToCartBtn.disabled = false;
    addToCart.textContent = 'Ajouter au panier';
    quantityInput.disabled = false;
    quantityInput.max = stock;
  } else {
    stockStatus.textContent = 'En stock';
    stockStatus.className = 'stock-status in-stock';
    stockCount.textContent = `${stock} unités disponibles`;
    addToCartBtn.disabled = false;
    addToCart.textContent = 'Ajouter au panier';
    quantityInput.disabled = false;
    quantityInput.max = stock;
  }
  
  // Reset quantity
  document.getElementById('modalQuantity').value = 1;
  
  // Show modal
  document.getElementById('productModal').classList.add('active');
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

// Close product modal
function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
  document.body.style.overflow = '';
  currentModalProduct = null;
}

// Increase modal quantity
function increaseModalQuantity() {
  if (!currentModalProduct) return;
  
  const maxStock = currentModalProduct.stock || 0;
  const currentVal = parseInt(document.getElementById('modalQuantity').value);
  
  if (currentVal < maxStock) {
    document.getElementById('modalQuantity').value = currentVal + 1;
  }
}

// Decrease modal quantity
function decreaseModalQuantity() {
  const currentVal = parseInt(document.getElementById('modalQuantity').value);
  
  if (currentVal > 1) {
    document.getElementById('modalQuantity').value = currentVal - 1;
  }
}

// Validate modal quantity
function validateModalQuantity() {
  if (!currentModalProduct) return;
  
  const maxStock = currentModalProduct.stock || 0;
  const input = document.getElementById('modalQuantity');
  const value = parseInt(input.value);
  
  if (value < 1) {
    input.value = 1;
  } else if (value > maxStock && maxStock > 0) {
    input.value = maxStock;
  }
}

// Add to cart from modal
function addToCartFromModal() {
  if (!currentModalProduct) return;
  
  const quantity = parseInt(document.getElementById('modalQuantity').value);
  
  // Add quantity copies of the product
  for (let i = 0; i < quantity; i++) {
    addToCart(currentModalProduct);
  }
  
  // Close modal
  closeProductModal();
  
  // Show notification
  showCartNotification(`${quantity}x ${currentModalProduct.name} ajouté au panier`);
}

// Proceed to checkout from modal
function proceedToCheckoutFromModal() {
  // Add current product to cart first
  const quantity = parseInt(document.getElementById('modalQuantity').value);
  
  for (let i = 0; i < quantity; i++) {
    addToCart(currentModalProduct);
  }
  
  // Close modal
  closeProductModal();
  
  // Go to checkout
  window.location.href = 'checkout.html';
}

// Close modal on outside click
document.getElementById('productModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeProductModal();
  }
});

// Close modal on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && document.getElementById('productModal').classList.contains('active')) {
    closeProductModal();
  }
});

// Make functions globally available
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.increaseModalQuantity = increaseModalQuantity;
window.decreaseModalQuantity = decreaseModalQuantity;
window.validateModalQuantity = validateModalQuantity;
window.addToCartFromModal = addToCartFromModal;
window.proceedToCheckoutFromModal = proceedToCheckoutFromModal;