// SARAKI - Shopping Cart JavaScript

// Cart data structure
let cart = [];

// Load cart from localStorage
function loadCart() {
  const cartData = localStorage.getItem('saraki_cart');
  if (cartData) {
    cart = JSON.parse(cartData);
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('saraki_cart', JSON.stringify(cart));
}

// Add product to cart
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      quantity: 1
    });
  }
  
  saveCart();
  updateCartCount();
  
  // Show notification
  showCartNotification(`${product.name} ajouté au panier`);
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  renderCart();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = parseInt(newQuantity);
      saveCart();
      renderCart();
    }
  }
}

// Calculate total
function calculateTotal() {
  return cart.reduce((total, item) => {
    const price = parsePrice(item.price);
    return total + (price * item.quantity);
  }, 0);
}

// Parse price string to number
function parsePrice(priceString) {
  // Handle different price formats
  if (typeof priceString === 'number') return priceString;
  
  // Remove currency symbols and spaces
  const cleanPrice = priceString.replace(/[^\d.,]/g, '');
  
  // Handle "Sur devis" or similar
  if (!cleanPrice || cleanPrice === '') return 0;
  
  // Convert to number
  const price = parseFloat(cleanPrice.replace(',', '.'));
  return isNaN(price) ? 0 : price;
}

// Format price for display
function formatPrice(price) {
  if (price === 0) return 'Sur devis';
  return price.toLocaleString('fr-FR') + ' FCFA';
}

// Get cart count
function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Update cart count in navigation
function updateCartCount() {
  const cartCount = getCartCount();
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
  }
}

// Render cart page
function renderCart() {
  const cartContent = document.getElementById('cart-content');
  
  if (cart.length === 0) {
    cartContent.innerHTML = `
      <div class="cart-empty">
        <h2>Votre panier est vide</h2>
        <p>Découvrez nos collections exceptionnelles</p>
        <a href="catalog.html" class="btn-primary">Explorer le catalogue</a>
      </div>
    `;
    return;
  }
  
  let html = '<div class="cart-items">';
  
  cart.forEach(item => {
    const itemTotal = parsePrice(item.price) * item.quantity;
    
    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-category">${item.category}</p>
          <p class="cart-item-price">${item.price}</p>
        </div>
        <div class="cart-item-quantity">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
        <div class="cart-item-total">${formatPrice(itemTotal)}</div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Supprimer</button>
      </div>
    `;
  });
  
  html += '</div>';
  
  // Cart summary
  const subtotal = calculateTotal();
  const shipping = subtotal > 0 ? 5000 : 0; // 5000 FCFA shipping
  const total = subtotal + shipping;
  
  html += `
    <div class="cart-summary">
      <div class="summary-row">
        <span class="summary-label">Sous-total</span>
        <span class="summary-value">${formatPrice(subtotal)}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Livraison</span>
        <span class="summary-value">${formatPrice(shipping)}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Total</span>
        <span class="summary-value summary-total">${formatPrice(total)}</span>
      </div>
      <div class="cart-actions">
        <button class="continue-shopping" onclick="window.location.href='catalog.html'">Continuer mes achats</button>
        <button class="checkout-btn" onclick="proceedToCheckout()">Passer la commande</button>
      </div>
    </div>
  `;
  
  cartContent.innerHTML = html;
}

// Show cart notification
function showCartNotification(message, type = 'success') {
  // Create toast container if not exists
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;
  
  toastContainer.appendChild(toast);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 300);
  }, 4000);
}

// Proceed to checkout
function proceedToCheckout() {
  if (cart.length === 0) {
    alert('Votre panier est vide');
    return;
  }
  
  window.location.href = 'checkout.html';
}

// Clear cart
function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  renderCart();
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
  loadCart();
  updateCartCount();
  
  // Add cart icon to navigation if not present
  const navList = document.querySelector('.nav-list');
  if (navList && !document.getElementById('cart-nav-item')) {
    const cartNavItem = document.createElement('li');
    cartNavItem.id = 'cart-nav-item';
    cartNavItem.innerHTML = `
      <a href="cart.html" style="position: relative;">
        🛒 Panier
        <span id="cart-count" style="position: absolute; top: -8px; right: -8px; background-color: var(--or-metallique); color: var(--noir-charbon); border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 600; display: none;">0</span>
      </a>
    `;
    navList.appendChild(cartNavItem);
  }
  
  // Render cart if on cart page
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }
});

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.proceedToCheckout = proceedToCheckout;
window.clearCart = clearCart;