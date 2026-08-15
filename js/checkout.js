// SARAKI - Checkout JavaScript

// Load cart data
let cart = [];

function loadCart() {
  const cartData = localStorage.getItem('saraki_cart');
  if (cartData) {
    cart = JSON.parse(cartData);
  }
}

// Parse price string to number
function parsePrice(priceString) {
  if (typeof priceString === 'number') return priceString;
  
  const cleanPrice = priceString.replace(/[^\d.,]/g, '');
  if (!cleanPrice || cleanPrice === '') return 0;
  
  const price = parseFloat(cleanPrice.replace(',', '.'));
  return isNaN(price) ? 0 : price;
}

// Format price for display
function formatPrice(price) {
  if (price === 0) return 'Sur devis';
  return price.toLocaleString('fr-FR') + ' FCFA';
}

// Calculate totals
function calculateTotals() {
  const subtotal = cart.reduce((total, item) => {
    const price = parsePrice(item.price);
    return total + (price * item.quantity);
  }, 0);
  
  const shipping = subtotal > 0 ? 5000 : 0;
  const total = subtotal + shipping;
  
  return { subtotal, shipping, total };
}

// Render order summary
function renderOrderSummary() {
  const orderItems = document.getElementById('order-items');
  
  if (cart.length === 0) {
    orderItems.innerHTML = '<p>Votre panier est vide</p>';
    window.location.href = 'cart.html';
    return;
  }
  
  let html = '';
  
  cart.forEach(item => {
    const itemTotal = parsePrice(item.price) * item.quantity;
    
    html += `
      <div class="order-item">
        <img src="${item.image}" alt="${item.name}" class="order-item-image">
        <div class="order-item-details">
          <div class="order-item-name">${item.name}</div>
          <div class="order-item-quantity">Quantité: ${item.quantity}</div>
        </div>
        <div class="order-item-price">${formatPrice(itemTotal)}</div>
      </div>
    `;
  });
  
  orderItems.innerHTML = html;
  
  // Update totals
  const { subtotal, shipping, total } = calculateTotals();
  document.getElementById('subtotal').textContent = formatPrice(subtotal);
  document.getElementById('shipping').textContent = formatPrice(shipping);
  document.getElementById('total').textContent = formatPrice(total);
}

// Select payment method
function selectPayment(method) {
  document.querySelectorAll('.payment-method').forEach(el => {
    el.classList.remove('selected');
  });
  
  event.currentTarget.classList.add('selected');
  document.getElementById('paymentMethod').value = method;
}

// Handle checkout form submission
function handleCheckout(e) {
  e.preventDefault();
  
  if (cart.length === 0) {
    alert('Votre panier est vide');
    return;
  }
  
  // Get form data
  const formData = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    postalCode: document.getElementById('postalCode').value,
    country: document.getElementById('country').value,
    paymentMethod: document.getElementById('paymentMethod').value,
    instructions: document.getElementById('instructions').value,
    cart: cart,
    totals: calculateTotals(),
    orderDate: new Date().toISOString(),
    orderId: 'SAR-' + Date.now()
  };
  
  // Validate form
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.city) {
    alert('Veuillez remplir tous les champs obligatoires');
    return;
  }
  
  // Save order
  const orders = JSON.parse(localStorage.getItem('saraki_orders') || '[]');
  orders.push(formData);
  localStorage.setItem('saraki_orders', JSON.stringify(orders));
  
  // Clear cart
  localStorage.removeItem('saraki_cart');
  cart = [];
  
  // Update cart count
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.style.display = 'none';
  }
  
  // Update inventory (deduct stock)
  updateInventory(formData.cart);
  
  // Show success message
  alert('Commande passée avec succès ! Votre numéro de commande est : ' + formData.orderId);
  
  // Redirect to confirmation page
  window.location.href = 'order-confirmation.html?orderId=' + formData.orderId;
}

// Update inventory after order
function updateInventory(orderCart) {
  // Load current inventory
  const productsData = localStorage.getItem('saraki_products');
  if (!productsData) return;
  
  const products = JSON.parse(productsData).products;
  
  // Deduct stock for each ordered item
  orderCart.forEach(orderItem => {
    const product = products.find(p => p.id === orderItem.id);
    if (product) {
      product.stock = Math.max(0, product.stock - orderItem.quantity);
      product.lastUpdated = new Date().toISOString();
    }
  });
  
  // Save updated products
  localStorage.setItem('saraki_products', JSON.stringify({ products }));
  
  // Record stock movements
  const movements = JSON.parse(localStorage.getItem('saraki_movements') || '[]');
  
  orderCart.forEach(orderItem => {
    const movement = {
      id: Date.now() + Math.random(),
      productId: orderItem.id,
      productName: orderItem.name,
      type: 'remove',
      quantity: orderItem.quantity,
      newStock: products.find(p => p.id === orderItem.id)?.stock || 0,
      note: 'Commande : ' + (JSON.parse(localStorage.getItem('saraki_orders') || '[]').slice(-1)[0]?.orderId || ''),
      timestamp: new Date().toISOString()
    };
    movements.unshift(movement);
  });
  
  localStorage.setItem('saraki_movements', JSON.stringify(movements));
}

// Initialize checkout
document.addEventListener('DOMContentLoaded', function() {
  loadCart();
  renderOrderSummary();
  
  // Add form listener
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckout);
  }
});

// Make functions globally available
window.selectPayment = selectPayment;