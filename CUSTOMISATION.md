# Options de Personnalisation - Site Web SARAKI

## 🎨 Personnalisation Visuelle

### 1. Modification des Couleurs

#### Variables CSS Principales
Localisation : `css/style.css` (lignes 8-16)

```css
:root {
  --noir-charbon: #0A0A0A;      /* Fond principal */
  --or-metallique: #D4AF37;     /* Accent et boutons */
  --beige-ecru: #F5F1E8;        /* Fond clair */
  --bordeaux-profond: #5C1A1A;   /* Accent optionnel */
  --vert-emeraude: #1A5C3A;      /* Accent optionnel */
}
```

#### Palettes de Couleurs Alternatives

**Option Élégance Dorée**
```css
--noir-charbon: #1a1a1a;
--or-metallique: #c9a227;
--beige-ecru: #f5f0e1;
```

**Option Luxe Moderne**
```css
--noir-charbon: #0d0d0d;
--or-metallique: #b8860b;
--beige-ecru: #faf9f5;
```

**Option Terre Africaine**
```css
--noir-charbon: #2c1810;
--or-metallique: #cd853f;
--beige-ecru: #f5e6d3;
```

### 2. Typographie

#### Polices Actuelles
- **Titres** : Playfair Display (Google Fonts)
- **Texte** : Montserrat (Google Fonts)

#### Alternatives de Polices

**Option 1 : Fonts élégants**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Lato:wght@300;400;500;600&display=swap" rel="stylesheet">
```

```css
--font-titre: 'Cormorant Garamond', serif;
--font-texte: 'Lato', sans-serif;
```

**Option 2 : Fonts modernes**
```html
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Open+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
```

```css
--font-titre: 'Oswald', sans-serif;
--font-texte: 'Open Sans', sans-serif;
```

**Option 3 : Fonts africains**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
```

```css
--font-titre: 'Playfair Display', serif;
--font-texte: 'Poppins', sans-serif;
```

### 3. Espacement et Layout

#### Modification des Marges
Localisation : `css/style.css` (lignes 19-24)

```css
--spacing-xs: 0.5rem;   /* Espacement minimal */
--spacing-sm: 1rem;     /* Espacement petit */
--spacing-md: 2rem;     /* Espacement moyen */
--spacing-lg: 4rem;     /* Espacement large */
--spacing-xl: 6rem;     /* Espacement extra-large */
```

#### Variantes d'Espacement

**Layout Compact**
```css
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 2rem;
--spacing-xl: 3rem;
```

**Layout Aéré**
```css
--spacing-xs: 0.75rem;
--spacing-sm: 1.5rem;
--spacing-md: 3rem;
--spacing-lg: 5rem;
--spacing-xl: 8rem;
```

---

## 🔧 Personnalisation Fonctionnelle

### 1. Navigation

#### Modifier l'Ordre des Liens
Localisation : Chaque page HTML, section `.nav-list`

```html
<ul class="nav-list" id="primary-navigation" role="menubar">
  <li role="none"><a href="page1.html" role="menuitem">Page 1</a></li>
  <li role="none"><a href="page2.html" role="menuitem">Page 2</a></li>
  <!-- Réorganisez selon vos besoins -->
</ul>
```

#### Ajouter un Nouveau Lien
```html
<li role="none"><a href="nouvelle-page.html" role="menuitem">Nouvelle Page</a></li>
```

### 2. Sections et Composants

#### Ajouter une Nouvelle Section
1. Créez la section HTML dans la page souhaitée
2. Ajoutez le CSS correspondant dans `style.css`
3. Ajoutez le JavaScript si nécessaire

**Exemple de section témoignages** :
```html
<section class="testimonials-section">
  <div class="container">
    <h2>Témoignages Clients</h2>
    <div class="testimonials-grid">
      <!-- Contenu des témoignages -->
    </div>
  </div>
</section>
```

```css
.testimonials-section {
  padding: var(--spacing-xl) 0;
  background-color: var(--beige-ecru);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}
```

### 3. Formulaires

#### Modifier les Champs du Formulaire de Contact
Localisation : `public/contact.html` (lignes 92-122)

```html
<div class="form-group">
  <label for="champ-existant">Champ Existant</label>
  <input type="text" id="champ-existant" name="champ_existant" required>
</div>

<!-- Ajouter un nouveau champ -->
<div class="form-group">
  <label for="nouveau-champ">Nouveau Champ</label>
  <input type="text" id="nouveau-champ" name="nouveau_champ">
</div>
```

#### Intégrer un Service de Formulaire

**Formspree**
```html
<form action="https://formspree.io/f/votre-id" method="POST">
  <!-- Vos champs -->
</form>
```

**Netlify Forms**
```html
<form name="contact" method="POST" data-netlify="true">
  <!-- Vos champs -->
</form>
```

### 4. Intégrations

#### WhatsApp
Localisation : Chaque page, bouton WhatsApp flottant

```html
<a href="https://wa.me/22797093387" class="whatsapp-float" target="_blank" aria-label="Contactez-nous sur WhatsApp"></a>
```

Pour modifier le numéro :
```html
<a href="https://wa.me/VOTRE_NUMERO" class="whatsapp-float">
```

#### Google Maps
Localisation : `public/contact.html` (lignes 148-156)

Pour modifier la localisation :
1. Allez sur Google Maps
2. Recherchez l'adresse
3. Cliquez sur "Partager" > "Intégrer une carte"
4. Copiez le code iframe
5. Remplacez l'iframe existant

#### Réseaux Sociaux
Localisation : Footer de chaque page

```html
<a href="https://facebook.com/votre-page" target="_blank">Facebook</a>
<a href="https://instagram.com/votre-compte" target="_blank">Instagram</a>
<a href="https://tiktok.com/@votre-compte" target="_blank">TikTok</a>
```

---

## 🎯 Personnalisation par Page

### Page d'Accueil

#### Modifier le Hero
Localisation : `public/index.html` (lignes 49-56)

```html
<section class="hero">
  <div class="container hero-content">
    <h1>Votre Titre Principal</h1>
    <p>Votre description accrocheuse</p>
    <div class="hero-buttons">
      <a href="destination.html" class="btn-primary">Bouton 1</a>
      <a href="destination.html" class="btn-secondary">Bouton 2</a>
    </div>
  </div>
</section>
```

#### Modifier les Produits Phares
Localisation : `public/index.html` (lignes 60-90)

Chaque carte produit peut être personnalisée :
- Image : `src` et `alt`
- Titre : contenu de `<h3>`
- Prix : contenu de `<p class="product-price">`
- Description : contenu de `<p class="product-description">`

### Page Catalogue

#### Ajouter des Catégories de Filtrage
Localisation : `public/catalog.html` (lignes 45-55)

```html
<button class="filter-btn" data-filter="nouvelle-categorie">Nouvelle Catégorie</button>
```

#### Modifier les Produits
Localisation : `public/index.html` (lignes 60-250)

Ajoutez l'attribut `data-category` correspondant à votre nouvelle catégorie.

### Page Services

#### Modifier les Services
Localisation : `public/services.html` (lignes 50-100)

Chaque service card inclut :
- Icône : contenu de `.service-icon`
- Titre : contenu de `<h3>`
- Description : contenu de `<p>`

### Page Contact

#### Modifier les Coordonnées
Localisation : `public/contact.html` (lignes 60-100)

```html
<div class="contact-item">
  <div class="contact-item-icon">📍</div>
  <div class="contact-item-text">
    <h4>Adresse</h4>
    <p>Votre adresse complète</p>
  </div>
</div>
```

---

## 🚀 Personnalisation Avancée

### 1. Animations

#### Modifier les Animations
Localisation : `css/style.css` (lignes 932-945)

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Pour créer une animation personnalisée :
```css
@keyframes votreAnimation {
  from {
    /* État initial */
  }
  to {
    /* État final */
  }
}

.element-a-animer {
  animation: votreAnimation 1s ease-out;
}
```

### 2. Effets de Scroll

#### Modifier les Seuils de Déclenchement
Localisation : `js/main.js` (lignes 165-195)

```javascript
const elementVisible = 150; // Ajustez cette valeur
```

Valeur plus petite = déclenchement plus tôt
Valeur plus grande = déclenchement plus tard

### 3. Performance

#### Lazy Loading
Les images principales ont déjà `loading="lazy"`. Pour les images importantes (hero), retirez cet attribut.

#### Optimisation CSS
- Minifiez le CSS en production
- Supprimez les CSS inutilisés
- Utilisez des préfixes vendor si nécessaire

---

## 📱 Personnalisation Mobile

### Menu Mobile
Le menu mobile est automatiquement activé sur les écrans < 768px.

#### Modifier le Point de Rupture
Localisation : `css/style.css` (ligne 766)

```css
@media (max-width: 768px) {
  /* Styles mobiles */
}
```

Pour tablettes :
```css
@media (max-width: 1024px) {
  /* styles tablettes */
}
```

### Touch Targets
Assurez-vous que les boutons ont au moins 44px de hauteur pour le tactile.

---

## 🔐 Sécurité

### Protection contre le Spam
Pour les formulaires, ajoutez :
- reCAPTCHA Google
- Honeypot fields
- Validation côté serveur

### HTTPS
Assurez-vous que votre site utilise HTTPS en production.

---

## 📊 Analytics

### Google Analytics
Ajoutez le code de suivi dans le `<head>` de chaque page :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel
```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

---

## 🎨 Thèmes CSS

### Thème Clair (Optionnel)
Pour créer un thème clair, ajoutez ces variables :

```css
[data-theme="light"] {
  --noir-charbon: #FFFFFF;
  --or-metallique: #D4AF37;
  --beige-ecru: #F5F1E8;
}
```

### Toggle de Thème
```html
<button id="theme-toggle" aria-label="Changer de thème">🌙</button>
```

```javascript
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
});
```

---

## 📝 Notes Importantes

1. **Sauvegarde** : Faites toujours une sauvegarde avant de modifier
2. **Test** : Testez vos modifications sur différents navigateurs
3. **Performance** : Surveillez l'impact de vos modifications sur les performances
4. **Accessibilité** : Maintenez les standards d'accessibilité WCAG

---

*Document de personnalisation créé pour SARAKI - 14 août 2026*