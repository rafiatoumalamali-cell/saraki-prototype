// SARAKI - Analytics Dashboard JavaScript

// Charts instances
let visitorsChart = null;
let productsChart = null;
let devicesChart = null;
let activityChart = null;

// Mock data generator
function generateMockData(days) {
  const data = {
    visitors: [],
    pageviews: [],
    contactForms: 0,
    newsletter: 0,
    whatsapp: 0,
    calls: 0,
    products: [],
    trafficSources: [
      { name: 'Direct', value: 35, icon: '🔗' },
      { name: 'Google', value: 28, icon: '🔍' },
      { name: 'Facebook', value: 18, icon: '📘' },
      { name: 'Instagram', value: 12, icon: '📷' },
      { name: 'WhatsApp', value: 7, icon: '💬' }
    ],
    devices: [
      { name: 'Mobile', value: 55 },
      { name: 'Desktop', value: 35 },
      { name: 'Tablet', value: 10 }
    ],
    pages: [
      { name: 'Accueil', views: 1250, time: '2m 30s', bounce: '45%' },
      { name: 'Catalogue', views: 890, time: '3m 15s', bounce: '38%' },
      { name: 'À propos', views: 456, time: '1m 45s', bounce: '52%' },
      { name: 'Contact', views: 234, time: '4m 20s', bounce: '28%' },
      { name: 'Services', views: 189, time: '2m 10s', bounce: '41%' }
    ],
    activity: []
  };
  
  // Generate daily visitor data
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const baseVisitors = Math.floor(Math.random() * 50) + 30;
    const basePageviews = baseVisitors * (Math.random() * 2 + 1.5);
    
    data.visitors.push({
      date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
      value: baseVisitors
    });
    
    data.pageviews.push({
      date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
      value: Math.floor(basePageviews)
    });
  }
  
  // Generate metrics
  data.contactForms = Math.floor(Math.random() * 20) + 10;
  data.newsletter = Math.floor(Math.random() * 30) + 15;
  data.whatsapp = Math.floor(Math.random() * 25) + 20;
  data.calls = Math.floor(Math.random() * 15) + 8;
  
  // Generate activity
  const activities = [
    { icon: '📧', title: 'Nouveau formulaire de contact', time: 'Il y a 2h' },
    { icon: '📱', title: 'Clic WhatsApp', time: 'Il y a 3h' },
    { icon: '📰', title: 'Inscription newsletter', time: 'Il y a 5h' },
    { icon: '👁️', title: 'Nouveau visiteur', time: 'Il y a 6h' },
    { icon: '📊', title: 'Consultation catalogue', time: 'Il y a 8h' },
    { icon: '🛒', title: 'Demande de devis', time: 'Il y a 12h' },
    { icon: '📧', title: 'Nouveau formulaire de contact', time: 'Hier' },
    { icon: '📱', title: 'Clic WhatsApp', time: 'Hier' }
  ];
  
  data.activity = activities;
  
  return data;
}

// Load products for analytics
async function loadProductsForAnalytics() {
  try {
    const localStorageData = localStorage.getItem('saraki_products');
    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      if (data.products && Array.isArray(data.products)) {
        return data.products;
      }
    }
    
    const response = await fetch('../js/products.json');
    if (response.ok) {
      const data = await response.json();
      return data.products || [];
    }
  } catch (error) {
    console.error('Error loading products for analytics:', error);
  }
  
  return [];
}

// Generate product analytics
function generateProductAnalytics(products) {
  return products.map(product => ({
    name: product.name,
    category: product.category,
    views: Math.floor(Math.random() * 200) + 50,
    conversions: Math.floor(Math.random() * 10) + 1,
    price: product.price
  })).sort((a, b) => b.views - a.views);
}

// Update metrics display
function updateMetrics(data) {
  const totalVisitors = data.visitors.reduce((sum, item) => sum + item.value, 0);
  const totalPageviews = data.pageviews.reduce((sum, item) => sum + item.value, 0);
  
  // Animate metrics
  animateValue('visitors-metric', 0, totalVisitors, 1000);
  animateValue('pageviews-metric', 0, totalPageviews, 1000);
  
  document.getElementById('bounce-metric').textContent = (Math.random() * 10 + 35).toFixed(1) + '%';
  document.getElementById('duration-metric').textContent = (Math.random() * 2 + 1).toFixed(1) + 'm';
  
  animateValue('contact-forms-metric', 0, data.contactForms, 800);
  animateValue('newsletter-metric', 0, data.newsletter, 800);
  animateValue('whatsapp-metric', 0, data.whatsapp, 800);
  animateValue('calls-metric', 0, data.calls, 800);
}

// Animate value
function animateValue(elementId, start, end, duration) {
  const element = document.getElementById(elementId);
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    element.textContent = current;
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Create visitors chart
function createVisitorsChart(data) {
  const ctx = document.getElementById('visitorsChart').getContext('2d');
  
  if (visitorsChart) {
    visitorsChart.destroy();
  }
  
  visitorsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.visitors.map(item => item.date),
      datasets: [{
        label: 'Visiteurs',
        data: data.visitors.map(item => item.value),
        borderColor: '#D4AF37',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        fill: true,
        tension: 0.4
      }, {
        label: 'Vues de pages',
        data: data.pageviews.map(item => item.value),
        borderColor: '#0A0A0A',
        backgroundColor: 'rgba(10, 10, 10, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
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

// Create products chart
function createProductsChart(productAnalytics) {
  const ctx = document.getElementById('productsChart').getContext('2d');
  
  if (productsChart) {
    productsChart.destroy();
  }
  
  // Group by category
  const categoryData = {};
  productAnalytics.forEach(product => {
    if (!categoryData[product.category]) {
      categoryData[product.category] = 0;
    }
    categoryData[product.category] += product.views;
  });
  
  productsChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(categoryData),
      datasets: [{
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
          position: 'right'
        }
      }
    }
  });
}

// Create devices chart
function createDevicesChart(data) {
  const ctx = document.getElementById('devicesChart').getContext('2d');
  
  if (devicesChart) {
    devicesChart.destroy();
  }
  
  devicesChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: data.devices.map(d => d.name),
      datasets: [{
        data: data.devices.map(d => d.value),
        backgroundColor: [
          '#D4AF37',
          '#0A0A0A',
          '#5C1A1A'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        }
      }
    }
  });
}

// Create activity chart
function createActivityChart() {
  const ctx = document.getElementById('activityChart').getContext('2d');
  
  if (activityChart) {
    activityChart.destroy();
  }
  
  // Generate hourly activity data
  const hours = Array.from({length: 24}, (_, i) => i);
  const activity = hours.map(() => Math.floor(Math.random() * 20) + 5);
  
  activityChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hours.map(h => h + 'h'),
      datasets: [{
        label: 'Interactions',
        data: activity,
        backgroundColor: '#D4AF37'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Update top products table
function updateTopProductsTable(productAnalytics) {
  const tbody = document.getElementById('top-products-body');
  tbody.innerHTML = '';
  
  productAnalytics.slice(0, 5).forEach(product => {
    const conversionRate = ((product.conversions / product.views) * 100).toFixed(1);
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${product.name}</strong></td>
      <td>${product.views}</td>
      <td>${product.conversions}</td>
      <td>${conversionRate}%</td>
    `;
    tbody.appendChild(row);
  });
}

// Update traffic sources
function updateTrafficSources(data) {
  const container = document.getElementById('traffic-sources');
  container.innerHTML = '';
  
  data.trafficSources.forEach(source => {
    const item = document.createElement('div');
    item.className = 'traffic-source-item';
    item.innerHTML = `
      <div class="traffic-source-icon">${source.icon}</div>
      <div class="traffic-source-info">
        <div class="traffic-source-name">${source.name}</div>
        <div class="traffic-source-value">${source.value}%</div>
      </div>
    `;
    container.appendChild(item);
  });
}

// Update top pages table
function updateTopPagesTable(data) {
  const tbody = document.getElementById('top-pages-body');
  tbody.innerHTML = '';
  
  data.pages.forEach(page => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${page.name}</strong></td>
      <td>${page.views}</td>
      <td>${page.time}</td>
      <td>${page.bounce}</td>
    `;
    tbody.appendChild(row);
  });
}

// Update recent activity
function updateRecentActivity(data) {
  const container = document.getElementById('recent-activity');
  container.innerHTML = '';
  
  data.activity.forEach(activity => {
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
      <div class="activity-icon">${activity.icon}</div>
      <div class="activity-details">
        <div class="activity-title">${activity.title}</div>
        <div class="activity-time">${activity.time}</div>
      </div>
    `;
    container.appendChild(item);
  });
}

// Show section
function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll('.analytics-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Remove active class from nav buttons
  document.querySelectorAll('.analytics-nav button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected section
  const sectionId = sectionName + '-section';
  document.getElementById(sectionId).classList.add('active');
  
  // Set active button
  event.target.classList.add('active');
}

// Update analytics
async function updateAnalytics() {
  const days = parseInt(document.getElementById('dateRange').value);
  const data = generateMockData(days);
  
  // Update metrics
  updateMetrics(data);
  
  // Create charts
  createVisitorsChart(data);
  
  // Load products
  const products = await loadProductsForAnalytics();
  const productAnalytics = generateProductAnalytics(products);
  
  // Update product analytics
  updateTopProductsTable(productAnalytics);
  createProductsChart(productAnalytics);
  
  // Update other sections
  updateTrafficSources(data);
  createDevicesChart(data);
  updateTopPagesTable(data);
  updateRecentActivity(data);
  createActivityChart();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  updateAnalytics();
});

// Make functions globally available
window.showSection = showSection;
window.updateAnalytics = updateAnalytics;