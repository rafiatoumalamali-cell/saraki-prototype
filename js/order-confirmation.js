// SARAKI - Order Confirmation JavaScript

// Get order ID from URL
function getOrderIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('orderId');
}

// Load order details
function loadOrderDetails() {
  const orderId = getOrderIdFromURL();
  
  if (!orderId) {
    document.querySelector('.confirmation-container').innerHTML = `
      <div class="success-icon">❌</div>
      <h1 class="confirmation-title">Commande non trouvée</h1>
      <p class="confirmation-subtitle">Numéro de commande invalide</p>
      <div class="action-buttons">
        <a href="index.html" class="btn-home">Retour à l'accueil</a>
      </div>
    `;
    return;
  }
  
  // Load orders from localStorage
  const orders = JSON.parse(localStorage.getItem('saraki_orders') || '[]');
  const order = orders.find(o => o.orderId === orderId);
  
  if (!order) {
    document.querySelector('.confirmation-container').innerHTML = `
      <div class="success-icon">❌</div>
      <h1 class="confirmation-title">Commande non trouvée</h1>
      <p class="confirmation-subtitle">Numéro de commande : ${orderId}</p>
      <div class="action-buttons">
        <a href="index.html" class="btn-home">Retour à l'accueil</a>
      </div>
    `;
    return;
  }
  
  // Display order details
  document.getElementById('order-number').textContent = 'Commande #' + order.orderId;
  
  const orderDate = new Date(order.orderDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  document.getElementById('order-date').textContent = orderDate;
  
  const paymentMethods = {
    'cash': 'Paiement à la livraison',
    'transfer': 'Virement bancaire',
    'mobile': 'Mobile Money'
  };
  document.getElementById('payment-method').textContent = paymentMethods[order.paymentMethod] || order.paymentMethod;
  
  // Format total
  const total = order.totals.total;
  const formattedTotal = total.toLocaleString('fr-FR') + ' FCFA';
  document.getElementById('order-total').textContent = formattedTotal;
}

// Initialize confirmation page
document.addEventListener('DOMContentLoaded', function() {
  loadOrderDetails();
});