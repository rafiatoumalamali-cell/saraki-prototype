// SARAKI - Admin Panel JavaScript

// Configuration
const PRODUCTS_FILE = '../js/products.json';
const DEFAULT_PRODUCTS = {
  "products": [
    {
      "id": 1,
      "name": "Robe Boubou Moderne",
      "price": "85 000 FCFA",
      "description": "Collection signature - Coupe structurée avec touches dorées",
      "category": "femme",
      "image": "../assets/images/products/robe-boubou.jpg",
      "featured": true
    },
    {
      "id": 2,
      "name": "Ensemble Homme Chic",
      "price": "75 000 FCFA",
      "description": "Chemise et pantalon - Tissu noble premium",
      "category": "homme",
      "image": "../assets/images/products/ensemble-homme.jpg",
      "featured": true
    },
    {
      "id": 3,
      "name": "Tenue de Mariage",
      "price": "Sur devis",
      "description": "Haute couture - 100% personnalisé",
      "category": "sur-mesure",
      "image": "../assets/images/products/tenue-mariage.jpg",
      "featured": true
    }
  ]
};

// State
let products = [];
let currentEditId = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  loadProducts();
  setupEventListeners();
  
  // Listen for storage changes (if main site updates products)
  window.addEventListener('storage', function(e) {
    if (e.key === 'saraki_products') {
      console.log('Products updated in another tab, reloading...');
      loadProducts().then(() => {
        renderProductsTable();
      });
    }
  });
});

// Load products from JSON file or localStorage
async function loadProducts() {
  // First try to load from localStorage (admin changes)
  const localStorageData = localStorage.getItem('saraki_products');
  if (localStorageData) {
    try {
      const data = JSON.parse(localStorageData);
      if (data.products && Array.isArray(data.products)) {
        products = data.products;
        console.log('Admin: Products loaded from localStorage:', products.length);
        renderProductsTable();
        return;
      }
    } catch (error) {
      console.error('Admin: Error parsing localStorage data:', error);
    }
  }
  
  // Fallback to JSON file
  try {
    const response = await fetch(PRODUCTS_FILE);
    if (response.ok) {
      const data = await response.json();
      products = data.products || [];
      console.log('Admin: Products loaded from JSON file:', products.length);
    } else {
      // If file doesn't exist, use default
      products = DEFAULT_PRODUCTS.products;
      console.log('Admin: Using default products');
    }
    renderProductsTable();
  } catch (error) {
    console.error('Admin: Error loading products:', error);
    products = DEFAULT_PRODUCTS.products;
    renderProductsTable();
  }
}

// Save products to JSON file (simulation - in real app, this would be a server call)
function saveProducts() {
  // In a real application, this would send data to a server
  // For this static site, we'll use localStorage as a temporary solution
  localStorage.setItem('saraki_products', JSON.stringify({ products }));
  
  // In production, you would:
  // 1. Send to a backend API
  // 2. Use a service like Firebase
  // 3. Use a GitHub API to commit to a repository
  console.log('Products saved to localStorage (in production, use server API)');
}

// Render products table
function renderProductsTable() {
  const tbody = document.getElementById('products-table-body');
  tbody.innerHTML = '';
  
  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${product.image}" alt="${product.name}" class="product-thumbnail" onerror="this.src='https://placehold.co/80x80/0A0A0A/D4AF37?text=No+Image'">
      </td>
      <td><strong>${product.name}</strong></td>
      <td>${product.price}</td>
      <td>${product.category}</td>
      <td>
        <div class="action-buttons">
          <button class="btn-edit" onclick="editProduct(${product.id})">Modifier</button>
          <button class="btn-delete" onclick="deleteProduct(${product.id})">Supprimer</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Setup event listeners
function setupEventListeners() {
  // Add product form
  document.getElementById('add-product-form').addEventListener('submit', handleAddProduct);
  
  // Edit product form
  document.getElementById('edit-product-form').addEventListener('submit', handleEditProduct);
  
  // Drag and drop for add product image
  const uploadArea = document.getElementById('upload-area');
  if (uploadArea) {
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
  }
  
  // Drag and drop for edit product image
  const editUploadArea = document.getElementById('edit-upload-area');
  if (editUploadArea) {
    editUploadArea.addEventListener('dragover', handleDragOver);
    editUploadArea.addEventListener('dragleave', handleDragLeave);
    editUploadArea.addEventListener('drop', handleEditDrop);
  }
}

// Drag and drop handlers
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  e.currentTarget.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  e.currentTarget.classList.remove('dragover');
  
  const files = e.dataTransfer.files;
  if (files && files.length > 0) {
    const fileInput = e.currentTarget.querySelector('input[type="file"]');
    fileInput.files = files;
    
    // Trigger change event
    const event = new Event('change', { bubbles: true });
    fileInput.dispatchEvent(event);
  }
}

// Show section
function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll('.admin-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Remove active class from nav buttons
  document.querySelectorAll('.admin-nav button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected section
  const sectionId = sectionName + '-section';
  document.getElementById(sectionId).classList.add('active');
  
  // Set active button (if event exists)
  if (event && event.target) {
    event.target.classList.add('active');
  } else {
    // Find and activate the corresponding button
    const buttons = document.querySelectorAll('.admin-nav button');
    buttons.forEach(btn => {
      if (btn.textContent.toLowerCase().includes(sectionName.replace('-', ' '))) {
        btn.classList.add('active');
      }
    });
  }
}

// Handle add product
async function handleAddProduct(e) {
  e.preventDefault();
  
  const name = document.getElementById('product-name').value;
  const price = document.getElementById('product-price').value;
  const category = document.getElementById('product-category').value;
  const description = document.getElementById('product-description').value;
  const featured = document.getElementById('product-featured').checked;
  const stock = parseInt(document.getElementById('product-stock').value);
  const alertThreshold = parseInt(document.getElementById('product-threshold').value);
  const imageInput = document.getElementById('product-image');
  
  // Validation
  if (!name || !price || !category || !description || isNaN(stock) || isNaN(alertThreshold)) {
    showStatusMessage('add-status-message', 'Veuillez remplir tous les champs obligatoires.', 'error');
    return;
  }
  
  // Handle image
  let imageUrl = 'https://placehold.co/400x500/0A0A0A/D4AF37?text=' + encodeURIComponent(name);
  
  if (imageInput.files && imageInput.files[0]) {
    try {
      imageUrl = await getLocalImageURL(imageInput.files[0]);
    } catch (error) {
      console.error('Error processing image:', error);
      showStatusMessage('add-status-message', 'Erreur lors du traitement de l\'image. Utilisation d\'image placeholder.', 'error');
    }
  }
  
  // Create new product
  const newProduct = {
    id: Date.now(), // Simple ID generation
    name,
    price,
    category,
    description,
    featured,
    image: imageUrl,
    stock: stock,
    alertThreshold: alertThreshold,
    lastUpdated: new Date().toISOString()
  };
  
  // Add to products array
  products.push(newProduct);
  
  // Save
  saveProducts();
  
  // Update UI
  renderProductsTable();
  
  // Reset form
  document.getElementById('add-product-form').reset();
  removePreview();
  
  // Show success message
  showStatusMessage('add-status-message', 'Produit ajouté avec succès !', 'success');
  
  // Return to products section
  setTimeout(() => showSection('products'), 1500);
}

// Handle edit product
async function handleEditProduct(e) {
  e.preventDefault();
  
  const id = parseInt(document.getElementById('edit-product-id').value);
  const name = document.getElementById('edit-product-name').value;
  const price = document.getElementById('edit-product-price').value;
  const category = document.getElementById('edit-product-category').value;
  const description = document.getElementById('edit-product-description').value;
  const featured = document.getElementById('edit-product-featured').checked;
  const stock = parseInt(document.getElementById('edit-product-stock').value);
  const alertThreshold = parseInt(document.getElementById('edit-product-threshold').value);
  const imageInput = document.getElementById('edit-product-image');
  
  // Find product
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    showStatusMessage('edit-status-message', 'Produit non trouvé.', 'error');
    return;
  }
  
  // Handle image
  let imageUrl = products[productIndex].image; // Keep existing image by default
  
  if (imageInput.files && imageInput.files[0]) {
    try {
      imageUrl = await getLocalImageURL(imageInput.files[0]);
    } catch (error) {
      console.error('Error processing image:', error);
      showStatusMessage('edit-status-message', 'Erreur lors du traitement de l\'image. Conservation de l\'image existante.', 'error');
      imageUrl = products[productIndex].image; // Keep existing image
    }
  }
  
  // Track stock change for inventory
  const oldStock = products[productIndex].stock || 0;
  const stockDifference = stock - oldStock;
  
  // Update product
  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
    category,
    description,
    featured,
    image: imageUrl,
    stock: stock,
    alertThreshold: alertThreshold,
    lastUpdated: new Date().toISOString()
  };
  
  // Save
  saveProducts();
  
  // Record stock movement if changed
  if (stockDifference !== 0) {
    // Add movement to inventory system
    const movementsData = localStorage.getItem('saraki_movements');
    let movements = movementsData ? JSON.parse(movementsData) : [];
    
    const movement = {
      id: Date.now(),
      productId: id,
      productName: name,
      type: stockDifference > 0 ? 'add' : 'remove',
      quantity: Math.abs(stockDifference),
      newStock: stock,
      note: 'Modification depuis admin',
      timestamp: new Date().toISOString()
    };
    
    movements.unshift(movement);
    localStorage.setItem('saraki_movements', JSON.stringify(movements));
  }
  
  // Update UI
  renderProductsTable();
  
  // Show success message
  showStatusMessage('edit-status-message', 'Produit mis à jour avec succès !', 'success');
  
  // Clear edit preview
  removeEditPreview();
  
  // Return to products section
  setTimeout(() => showSection('products'), 1500);
}

// Edit product
function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  
  currentEditId = id;
  
  // Populate form
  document.getElementById('edit-product-id').value = product.id;
  document.getElementById('edit-product-name').value = product.name;
  document.getElementById('edit-product-price').value = product.price;
  document.getElementById('edit-product-category').value = product.category;
  document.getElementById('edit-product-description').value = product.description;
  document.getElementById('edit-product-featured').checked = product.featured;
  document.getElementById('edit-product-stock').value = product.stock || 10;
  document.getElementById('edit-product-threshold').value = product.alertThreshold || 5;
  
  // Show image preview with container
  const preview = document.getElementById('edit-image-preview');
  const container = document.getElementById('edit-image-preview-container');
  
  preview.src = product.image;
  preview.style.display = 'block';
  container.style.display = 'block';
  
  // Prevent clicks on preview image from redirecting
  preview.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };
  
  // Add image info for existing image
  let infoElement = document.getElementById('edit-image-info');
  if (!infoElement) {
    infoElement = document.createElement('div');
    infoElement.id = 'edit-image-info';
    infoElement.style.cssText = 'font-size: 0.8rem; color: var(--noir-charbon); opacity: 0.7; margin-top: 0.5rem;';
    container.appendChild(infoElement);
  }
  infoElement.textContent = 'Image existante - Cliquez pour changer';
  
  // Show edit section
  document.querySelectorAll('.admin-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById('edit-product-section').classList.add('active');
  
  // Update nav
  document.querySelectorAll('.admin-nav button').forEach(btn => {
    btn.classList.remove('active');
  });
}

// Delete product
function deleteProduct(id) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
  
  products = products.filter(p => p.id !== id);
  
  // Save
  saveProducts();
  
  // Update UI
  renderProductsTable();
  
  showStatusMessage('status-message', 'Produit supprimé avec succès !', 'success');
}

// Get local image URL (for demo purposes)
function getLocalImageURL(file) {
  // In a real application, you would upload this to a server
  // For this demo, we'll use a data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      resolve('https://placehold.co/400x500/0A0A0A/D4AF37?text=Error+Loading+Image');
    };
    reader.readAsDataURL(file);
  });
}

// Preview image when file is selected
function previewImage(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image (JPG, PNG, GIF, WebP)');
      input.value = ''; // Clear the input
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('L\'image est trop grande. Maximum 2MB.');
      input.value = '';
      return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById('image-preview');
      const container = document.getElementById('image-preview-container');
      
      preview.src = e.target.result;
      preview.style.display = 'block';
      container.style.display = 'block';
      
      // Prevent clicks on preview image from redirecting
      preview.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };
      
      // Show image details
      const imageSizeKB = (file.size / 1024).toFixed(2);
      const imageType = file.type.split('/')[1].toUpperCase();
      
      // Add image info below preview
      let infoElement = document.getElementById('image-info');
      if (!infoElement) {
        infoElement = document.createElement('div');
        infoElement.id = 'image-info';
        infoElement.style.cssText = 'font-size: 0.8rem; color: var(--noir-charbon); opacity: 0.7; margin-top: 0.5rem;';
        container.appendChild(infoElement);
      }
      infoElement.textContent = `Taille: ${imageSizeKB} KB | Format: ${imageType}`;
    };
    reader.onerror = function() {
      alert('Erreur lors du chargement de l\'image. Veuillez réessayer.');
    };
    reader.readAsDataURL(file);
  }
}

// Remove preview
function removePreview() {
  const input = document.getElementById('product-image');
  const preview = document.getElementById('image-preview');
  const container = document.getElementById('image-preview-container');
  const infoElement = document.getElementById('image-info');
  
  if (input) input.value = '';
  if (preview) {
    preview.src = '';
    preview.style.display = 'none';
  }
  if (container) container.style.display = 'none';
  
  if (infoElement) {
    infoElement.remove();
  }
}

// Preview edit image
function previewEditImage(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image (JPG, PNG, GIF, WebP)');
      input.value = '';
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('L\'image est trop grande. Maximum 2MB.');
      input.value = '';
      return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById('edit-image-preview');
      const container = document.getElementById('edit-image-preview-container');
      
      preview.src = e.target.result;
      preview.style.display = 'block';
      container.style.display = 'block';
      
      // Prevent clicks on preview image from redirecting
      preview.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };
      
      // Show image details
      const imageSizeKB = (file.size / 1024).toFixed(2);
      const imageType = file.type.split('/')[1].toUpperCase();
      
      // Add image info below preview
      let infoElement = document.getElementById('edit-image-info');
      if (!infoElement) {
        infoElement = document.createElement('div');
        infoElement.id = 'edit-image-info';
        infoElement.style.cssText = 'font-size: 0.8rem; color: var(--noir-charbon); opacity: 0.7; margin-top: 0.5rem;';
        container.appendChild(infoElement);
      }
      infoElement.textContent = `Taille: ${imageSizeKB} KB | Format: ${imageType}`;
    };
    reader.onerror = function() {
      alert('Erreur lors du chargement de l\'image. Veuillez réessayer.');
    };
    reader.readAsDataURL(file);
  }
}

// Remove edit preview
function removeEditPreview() {
  const input = document.getElementById('edit-product-image');
  const preview = document.getElementById('edit-image-preview');
  const container = document.getElementById('edit-image-preview-container');
  const infoElement = document.getElementById('edit-image-info');
  
  if (input) input.value = '';
  if (preview) {
    preview.src = '';
    preview.style.display = 'none';
  }
  if (container) container.style.display = 'none';
  
  if (infoElement) {
    infoElement.remove();
  }
}

// Show status message
function showStatusMessage(elementId, message, type) {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.className = 'status-message ' + type;
  element.style.display = 'block';
  
  setTimeout(() => {
    element.style.display = 'none';
  }, 3000);
}

// Export products
function exportProducts() {
  const dataStr = JSON.stringify({ products }, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = 'products.json';
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

// Import products
function importProducts(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        if (data.products && Array.isArray(data.products)) {
          products = data.products;
          saveProducts();
          renderProductsTable();
          alert('Produits importés avec succès !');
        } else {
          alert('Format de fichier invalide. Le fichier doit contenir un objet "products" avec un tableau.');
        }
      } catch (error) {
        alert('Erreur lors de l\'importation : fichier JSON invalide.');
      }
    };
    reader.readAsText(input.files[0]);
  }
}

// Reset products
function resetProducts() {
  if (!confirm('Êtes-vous sûr de vouloir réinitialiser tous les produits ?')) return;
  
  products = DEFAULT_PRODUCTS.products;
  saveProducts();
  renderProductsTable();
  alert('Produits réinitialisés aux valeurs par défaut.');
}

// Clear localStorage
function clearLocalStorage() {
  if (!confirm('Êtes-vous sûr de vouloir supprimer toutes les données locales ? Cela restaurera les produits depuis le fichier JSON.')) return;
  
  localStorage.removeItem('saraki_products');
  loadProducts();
  alert('Données locales supprimées. Produits restaurés depuis le fichier JSON.');
}

// Refresh products from localStorage
function refreshProducts() {
  loadProducts();
  showStatusMessage('status-message', 'Produits rafraîchis avec succès !', 'success');
}

// Make functions globally available
window.showSection = showSection;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.previewImage = previewImage;
window.previewEditImage = previewEditImage;
window.removePreview = removePreview;
window.removeEditPreview = removeEditPreview;
window.exportProducts = exportProducts;
window.importProducts = importProducts;
window.resetProducts = resetProducts;
window.clearLocalStorage = clearLocalStorage;
window.refreshProducts = refreshProducts;
window.handleDragOver = handleDragOver;
window.handleDragLeave = handleDragLeave;
window.handleDrop = handleDrop;