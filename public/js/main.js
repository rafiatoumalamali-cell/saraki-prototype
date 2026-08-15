// SARAKI - JavaScript Principal

// Products data
let productsData = [];

// Load products from JSON or localStorage
async function loadProducts() {
  // First try to load from localStorage (admin changes)
  const localStorageData = localStorage.getItem('saraki_products');
  if (localStorageData) {
    try {
      const data = JSON.parse(localStorageData);
      if (data.products && Array.isArray(data.products)) {
        productsData = data.products;
        console.log('Products loaded from localStorage:', productsData.length);
        return;
      }
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
    }
  }
  
  // Fallback to JSON file
  try {
    const response = await fetch('../js/products.json');
    if (response.ok) {
      const data = await response.json();
      productsData = data.products || [];
      console.log('Products loaded from JSON file:', productsData.length);
    } else {
      console.log('Using default products');
      productsData = [
        {
          id: 1,
          name: "Robe Boubou Moderne",
          price: "85 000 FCFA",
          description: "Collection signature - Coupe structurée avec touches dorées",
          category: "femme",
          image: "https://placehold.co/400x500/0A0A0A/D4AF37?text=Robe+Boubou+Moderne",
          featured: true
        },
        {
          id: 2,
          name: "Ensemble Homme Chic",
          price: "75 000 FCFA",
          description: "Chemise et pantalon - Tissu noble premium",
          category: "homme",
          image: "https://placehold.co/400x500/0A0A0A/D4AF37?text=Ensemble+Homme+Chic",
          featured: true
        },
        {
          id: 3,
          name: "Tenue de Mariage",
          price: "Sur devis",
          description: "Haute couture - 100% personnalisé",
          category: "sur-mesure",
          image: "https://placehold.co/400x500/0A0A0A/D4AF37?text=Tenue+de+Mariage",
          featured: true
        }
      ];
    }
  } catch (error) {
    console.error('Error loading products:', error);
    // Use default products if JSON fails
    productsData = [
      {
        id: 1,
        name: "Robe Boubou Moderne",
        price: "85 000 FCFA",
        description: "Collection signature - Coupe structurée avec touches dorées",
        category: "femme",
        image: "https://placehold.co/400x500/0A0A0A/D4AF37?text=Robe+Boubou+Moderne",
        featured: true
      }
    ];
  }
}

// Load products on page load
loadProducts();

// Search functionality
function searchProducts() {
  applyFilters();
}

// Clear search
function clearSearch() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.value = '';
  }
  applyFilters();
}

// Parse price string to number
function parsePriceToNumber(priceString) {
  if (typeof priceString === 'number') return priceString;
  
  const cleanPrice = priceString.replace(/[^\d.,]/g, '');
  if (!cleanPrice || cleanPrice === '' || cleanPrice === 'Sur devis') return 999999;
  
  const price = parseFloat(cleanPrice.replace(',', '.').replace(/\s/g, ''));
  return isNaN(price) ? 999999 : price;
}

// Apply all filters
function applyFilters() {
  const searchInput = document.getElementById('search-input');
  const priceRange = document.getElementById('price-range');
  const sortBy = document.getElementById('sort-by');
  const stockFilter = document.getElementById('stock-filter');
  const activeCategory = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
  
  let filteredProducts = [...productsData];
  
  // Category filter
  if (activeCategory !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === activeCategory);
  }
  
  // Search filter
  if (searchInput && searchInput.value.trim() !== '') {
    const searchTerm = searchInput.value.toLowerCase().trim();
    filteredProducts = filteredProducts.filter(product => {
      return product.name.toLowerCase().includes(searchTerm) ||
             product.description.toLowerCase().includes(searchTerm) ||
             product.category.toLowerCase().includes(searchTerm);
    });
  }
  
  // Price filter
  if (priceRange && priceRange.value !== 'all') {
    const maxPrice = parseInt(priceRange.value);
    filteredProducts = filteredProducts.filter(p => {
      const price = parsePriceToNumber(p.price);
      return price <= maxPrice;
    });
  }
  
  // Stock filter
  if (stockFilter && stockFilter.value !== 'all') {
    filteredProducts = filteredProducts.filter(p => {
      const stock = p.stock || 0;
      const alertThreshold = p.alertThreshold || 5;
      
      if (stockFilter.value === 'in-stock') {
        return stock > alertThreshold;
      } else if (stockFilter.value === 'low-stock') {
        return stock > 0 && stock <= alertThreshold;
      }
      return true;
    });
  }
  
  // Sort
  if (sortBy) {
    switch (sortBy.value) {
      case 'price-asc':
        filteredProducts.sort((a, b) => parsePriceToNumber(a.price) - parsePriceToNumber(b.price));
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => parsePriceToNumber(b.price) - parsePriceToNumber(a.price));
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
  }
  
  renderProducts(filteredProducts);
}

// Add search event listener
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        searchProducts();
      }
    });
    
    // Live search with debounce
    let debounceTimer;
    searchInput.addEventListener('input', function() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchProducts();
      }, 300);
    });
  }
  
  // Filter buttons for catalog
  const catalogFilterButtons = document.querySelectorAll('.catalog-section .filter-btn');
  catalogFilterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      catalogFilterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      // Apply filters
      applyFilters();
    });
  });
});

// Make search functions globally available
window.searchProducts = searchProducts;
window.clearSearch = clearSearch;

// Loading overlay functions
function showLoading() {
  let loadingOverlay = document.querySelector('.loading-overlay');
  if (!loadingOverlay) {
    loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
      <div style="text-align: center;">
        <div class="loading-spinner"></div>
        <div class="loading-text">Chargement...</div>
      </div>
    `;
    document.body.appendChild(loadingOverlay);
  }
  loadingOverlay.classList.add('active');
}

function hideLoading() {
  const loadingOverlay = document.querySelector('.loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.remove('active');
  }
}

// Toast notification function
function showToast(message, type = 'info') {
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

// Make functions globally available
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.showToast = showToast;

// Load cart functionality if cart.js is available
if (typeof addToCart === 'function') {
  // Cart functions are available
} else {
  // Add basic cart functionality
  let cart = [];
  
  function loadCart() {
    const cartData = localStorage.getItem('saraki_cart');
    if (cartData) {
      cart = JSON.parse(cartData);
    }
  }
  
  function saveCart() {
    localStorage.setItem('saraki_cart', JSON.stringify(cart));
  }
  
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
    showCartNotification(`${product.name} ajouté au panier`);
  }
  
  function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }
  
  function updateCartCount() {
    const cartCount = getCartCount();
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = cartCount;
      cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
    }
  }
  
  function showCartNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: var(--or-metallique);
      color: var(--noir-charbon);
      padding: 1rem 2rem;
      border-radius: 4px;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
  
  function addToCartFromCatalog(productId) {
    const product = productsData.find(p => p.id === productId);
    if (product) {
      addToCart(product);
    }
  }
  
  // Initialize cart
  loadCart();
  updateCartCount();
  
  // Make cart functions globally available
  window.addToCart = addToCart;
  window.addToCartFromCatalog = addToCartFromCatalog;
}

// Loading Screen
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 500); // Délai minimal pour montrer l'écran de chargement
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Navigation mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  
  // Create overlay element
  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);
  
  if (navToggle && navList) {
    navToggle.addEventListener('click', function() {
      const isActive = navList.classList.toggle('active');
      navOverlay.classList.toggle('active');
      
      // Mise à jour de l'attribut aria-expanded
      navToggle.setAttribute('aria-expanded', isActive);
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isActive ? 'hidden' : '';
      
      // Animation du menu hamburger
      const spans = navToggle.querySelectorAll('span');
      if (isActive) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        navToggle.setAttribute('aria-label', 'Fermer le menu de navigation');
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        navToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
      }
    });
    
    // Close menu when clicking overlay
    navOverlay.addEventListener('click', function() {
      navList.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
      
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
    });
    
    // Close menu when clicking a link
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navList.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
      });
    });
  }
  
  // Fermer le menu mobile lors du clic sur un lien
  const navLinks = document.querySelectorAll('.nav-list a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navList && navList.classList.contains('active')) {
        navList.classList.remove('active');
        
        // Réinitialiser l'animation du menu hamburger
        const spans = navToggle.querySelectorAll('span');
        if (spans.length >= 3) {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });
  });
  
  // Filtrage générique (pour galerie seulement)
  const galleryFilterButtons = document.querySelectorAll('.gallery-section .filter-btn');
  
  galleryFilterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Retirer la classe active de tous les boutons de la même section
      const parentSection = this.closest('section');
      const sectionButtons = parentSection.querySelectorAll('.filter-btn');
      sectionButtons.forEach(btn => btn.classList.remove('active'));
      // Ajouter la classe active au bouton cliqué
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filtrer les éléments de galerie si présents dans cette section
      const galleryItems = parentSection.querySelectorAll('.gallery-item');
      galleryItems.forEach(item => {
        if (filterValue === 'all') {
          item.style.display = 'block';
        } else {
          const itemCategory = item.getAttribute('data-category');
          if (itemCategory === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        }
      });
    });
  });
  
  // Render products dynamically from JSON data
  function renderProducts(productsToRender = productsData) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (productsToRender.length === 0) {
      const noResults = document.getElementById('no-results');
      if (noResults) {
        noResults.classList.add('show');
      }
      return;
    }
    
    const noResults = document.getElementById('no-results');
    if (noResults) {
      noResults.classList.remove('show');
    }
    
    productsToRender.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.setAttribute('data-category', product.category);
      
      productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://placehold.co/400x500/0A0A0A/D4AF37?text=${encodeURIComponent(product.name)}'" onclick="openProductModal(${product.id})" style="cursor: pointer;">
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">${product.price}</p>
          <p class="product-description">${product.description}</p>
          <button class="btn-primary add-to-cart-btn" onclick="addToCartFromCatalog(${product.id})" style="margin-top: 1rem; width: 100%;">Ajouter au panier</button>
        </div>
      `;
      
      container.appendChild(productCard);
    });
  }
  
  // Render featured products on homepage
  function renderFeaturedProducts() {
    const container = document.getElementById('featured-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Filter for featured products
    let featuredProducts = productsData.filter(p => p.featured);
    
    if (featuredProducts.length === 0) {
      // If no featured products, show first 3 products
      featuredProducts = productsData.slice(0, 3);
    }
    
    featuredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.setAttribute('data-category', product.category);
      
      productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://placehold.co/400x500/0A0A0A/D4AF37?text=${encodeURIComponent(product.name)}'" onclick="openProductModal(${product.id})" style="cursor: pointer;">
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">${product.price}</p>
          <p class="product-description">${product.description}</p>
          <button class="btn-primary add-to-cart-btn" onclick="addToCartFromCatalog(${product.id})" style="margin-top: 1rem; width: 100%;">Ajouter au panier</button>
        </div>
      `;
      
      container.appendChild(productCard);
    });
  }
  
  // Call renderProducts after products are loaded
  if (document.getElementById('products-container')) {
    loadProducts().then(() => {
      renderProducts();
    });
  }
  
  // Call renderFeaturedProducts on homepage
  if (document.getElementById('featured-grid')) {
    loadProducts().then(() => {
      renderFeaturedProducts();
    });
  }
  
  // Listen for storage changes (if admin modifies products in another tab)
  window.addEventListener('storage', function(e) {
    if (e.key === 'saraki_products') {
      console.log('Products updated in another tab, reloading...');
      loadProducts().then(() => {
        renderProducts();
        if (document.getElementById('featured-grid')) {
          renderFeaturedProducts();
        }
      });
    }
  });
  
  // Gestion du formulaire de contact
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Récupérer les valeurs du formulaire
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Validation basique
      if (!name || !email || !subject || !message) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
      }
      
      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
      }
      
      // Simulation d'envoi (à remplacer par une vraie soumission de formulaire)
      console.log('Formulaire soumis:', {
        name,
        email,
        phone,
        subject,
        message
      });
      
      // Message de succès
      alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
      
      // Réinitialiser le formulaire
      this.reset();
    });
  }
  
  // Gestion du formulaire de newsletter
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[type="email"]').value;
      
      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
      }
      
      // Simulation d'inscription
      console.log('Newsletter inscription:', email);
      
      // Message de succès
      alert('Merci pour votre inscription ! Vous recevrez bientôt nos dernières actualités.');
      
      // Réinitialiser le formulaire
      this.reset();
    });
  }
  
  // Animation au défilement (Scroll Reveal) améliorée
  const revealElements = document.querySelectorAll('.product-card, .service-card, .gallery-item, .value-item, .about-text, .contact-item');
  
  const revealOnScroll = function() {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    revealElements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - elementVisible) {
        // Ajouter un délai basé sur l'index pour un effet en cascade
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, index * 50); // 50ms de délai entre chaque élément
      }
    });
  };
  
  // Initialiser les éléments pour l'animation
  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Écouter le défilement avec throttling pour optimiser les performances
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        revealOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Appeler une fois au chargement
  revealOnScroll();
  
  // Smooth scroll pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Header sticky avec changement de style au défilement
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
  });
  
  // Gestion des liens actifs dans la navigation
  const currentPath = window.location.pathname;
  const navLinksList = document.querySelectorAll('.nav-list a');
  
  navLinksList.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath.includes(linkPath) && linkPath !== 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Effet de hover sur les cartes produits
  const productCardsList = document.querySelectorAll('.product-card');
  productCardsList.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Gestion de la lightbox pour la galerie (optionnel)
  const galleryItemsList = document.querySelectorAll('.gallery-item');
  galleryItemsList.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt');
      
      // Créer une lightbox simple
      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        cursor: pointer;
      `;
      
      const lightboxImg = document.createElement('img');
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
      `;
      
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '×';
      closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 40px;
        color: #D4AF37;
        background: none;
        border: none;
        cursor: pointer;
      `;
      
      lightbox.appendChild(lightboxImg);
      lightbox.appendChild(closeBtn);
      document.body.appendChild(lightbox);
      
      // Fermer la lightbox
      const closeLightbox = function() {
        document.body.removeChild(lightbox);
      };
      
      lightbox.addEventListener('click', closeLightbox);
      closeBtn.addEventListener('click', closeLightbox);
      
      // Fermer avec la touche Escape
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          closeLightbox();
        }
      });
    });
  });
  
  // Lazy loading des images
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
  
  console.log('SARAKI - Site chargé avec succès');
});