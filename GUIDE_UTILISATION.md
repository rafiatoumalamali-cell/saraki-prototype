# Guide d'Utilisation - Site Web SARAKI

## 📋 Table des Matières

1. [Structure du Projet](#structure-du-projet)
2. [Gestion du Contenu](#gestion-du-contenu)
3. [Personnalisation du Design](#personnalisation-du-design)
4. [Mise à Jour des Images](#mise-à-jour-des-images)
5. [Gestion des Formulaires](#gestion-des-formulaires)
6. [SEO et Référencement](#seo-et-référencement)
7. [Maintenance et Support](#maintenance-et-support)

---

## 📁 Structure du Projet

```
saraki/
├── public/              # Fichiers publics du site
│   ├── index.html      # Page d'accueil
│   ├── about.html      # Page À propos
│   ├── catalog.html    # Page Catalogue
│   ├── services.html   # Page Services
│   ├── gallery.html    # Page Galerie
│   ├── contact.html    # Page Contact
│   ├── favicon.svg     # Icône du site
│   └── sitemap.xml     # Plan du site pour SEO
├── css/
│   └── style.css       # Feuille de style principale
├── js/
│   └── main.js         # JavaScript principal
└── assets/
    ├── logo.svg        # Logo officiel SARAKI
    └── images/        # Dossier pour les images
        ├── products/   # Images des produits
        └── gallery/    # Images de la galerie
```

---

## 📝 Gestion du Contenu

### Modifier le Texte des Pages

#### Page d'Accueil (`public/index.html`)
- **Hero Section** : Modifiez le titre et la description autour de la ligne 50-60
- **Produits Phares** : Modifiez les cartes produits dans la section `.product-grid` (lignes 60-90)
- **Section À Propos** : Modifiez le texte de présentation (lignes 100-130)
- **Services** : Modifiez les cartes services (lignes 140-170)

#### Page À Propos (`public/about.html`)
- **Histoire** : Modifiez le texte dans la section `.about-text` (lignes 50-90)
- **Valeurs** : Modifiez les éléments dans `.about-values` (lignes 90-130)
- **Statistiques** : Modifiez les chiffres dans `.about-stats` (lignes 130-150)

#### Page Catalogue (`public/catalog.html`)
- **Produits** : Modifiez les cartes produits dans `.product-grid` (lignes 60-250)
- **Catégories** : Modifiez les boutons de filtre (lignes 45-55)

#### Page Services (`public/services.html`)
- **Services** : Modifiez les cartes services dans `.services-grid` (lignes 50-100)
- **Processus** : Modifiez les étapes dans `.process-step` (lignes 110-160)
- **Tarifs** : Modifiez les prix dans les cartes tarifaires (lignes 170-200)

#### Page Contact (`public/contact.html`)
- **Informations** : Modifiez les coordonnées dans `.contact-info` (lignes 60-100)
- **Formulaire** : Modifiez les champs du formulaire (lignes 105-145)
- **FAQ** : Modifiez les questions/réponses (lignes 210-250)

### Ajouter un Nouveau Produit

1. Copiez une carte produit existante dans `catalog.html`
2. Modifiez les informations :
   - `src` de l'image
   - `alt` pour l'accessibilité
   - Titre du produit
   - Prix
   - Description
3. Ajoutez l'attribut `data-category` approprié pour le filtrage

### Modifier les Coordonnées

Les coordonnées sont centralisées dans :
- **Footer** : Modifiez dans chaque page (section `.footer-content`)
- **Page Contact** : Modifiez dans `.contact-info`
- **WhatsApp** : Modifiez le lien `href="https://wa.me/22797093387"` dans chaque page

---

## 🎨 Personnalisation du Design

### Couleurs de la Marque

Modifiez les variables CSS dans `css/style.css` (lignes 8-16) :

```css
:root {
  --noir-charbon: #0A0A0A;      /* Couleur principale - fonds */
  --or-metallique: #D4AF37;     /* Couleur d'accent - boutons, logo */
  --beige-ecru: #F5F1E8;        /* Couleur de fond clair */
  --bordeaux-profond: #5C1A1A;   /* Accent discret */
  --vert-emeraude: #1A5C3A;      /* Accent discret */
}
```

### Typographie

Les polices sont définies dans `style.css` (lignes 17-18) :

```css
--font-titre: 'Playfair Display', serif;    /* Pour les titres */
--font-texte: 'Montserrat', sans-serif;     /* Pour le texte */
```

Pour changer les polices :
1. Choisissez des polices sur Google Fonts
2. Modifiez les liens dans chaque page HTML
3. Mettez à jour les variables CSS

### Espacement

Modifiez les variables d'espacement dans `style.css` (lignes 19-24) :

```css
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 2rem;
--spacing-lg: 4rem;
--spacing-xl: 6rem;
```

---

## 🖼️ Mise à Jour des Images

### Remplacer les Images Placeholder

1. **Préparez vos images** :
   - Format recommandé : JPG ou PNG
   - Taille optimale : < 500KB par image
   - Dimensions produits : 400x500px
   - Dimensions galerie : 400x300px

2. **Placez les images** dans le dossier approprié :
   - `assets/images/products/` pour les produits
   - `assets/images/gallery/` pour la galerie

3. **Modifiez les chemins** dans les fichiers HTML :
   ```html
   <!-- Ancien -->
   <img src="https://placehold.co/400x500/0A0A0A/D4AF37?text=Produit" alt="Produit">
   
   <!-- Nouveau -->
   <img src="../assets/images/products/mon-produit.jpg" alt="Produit">
   ```

### Optimisation des Images

- Compressez les images avant de les uploader
- Utilisez des outils comme TinyPNG ou ImageOptim
- Enregistrez en qualité 80% pour le web

---

## 📧 Gestion des Formulaires

### Formulaire de Contact

Le formulaire de contact est actuellement configuré pour une validation côté client. Pour le rendre fonctionnel :

**Option 1 : Email direct**
```html
<form action="mailto:contact@saraki.ne" method="post" enctype="text/plain">
```

**Option 2 : Service de formulaire tiers**
- Formspree
- Netlify Forms
- Google Forms

**Option 3 : Backend personnalisé**
- PHP
- Node.js
- Python

### Formulaire Newsletter

Actuellement en mode démonstration. Pour l'activer :

1. **Mailchimp** : Intégrez leur formulaire embed
2. **Sendinblue** : Utilisez leur API
3. **Backend personnalisé** : Créez un endpoint pour collecter les emails

---

## 🔍 SEO et Référencement

### Meta Tags

Chaque page a déjà des meta tags optimisés. Pour les modifier :

```html
<meta name="description" content="Description de la page">
<meta name="keywords" content="mots-clés, séparés, par, virgules">
```

### Structured Data

Le site inclut des données structurées Schema.org pour :
- FashionBusiness (Page d'accueil)
- CollectionPage (Catalogue)
- ContactPage (Contact)

Pour mettre à jour, modifiez les balises `<script type="application/ld+json">` dans les pages correspondantes.

### Sitemap

Le fichier `sitemap.xml` est généré manuellement. Mettez-le à jour lors de l'ajout de nouvelles pages.

---

## 🛠️ Maintenance et Support

### Mises à Jour Régulières

1. **Contenu** : Mettez à jour les produits et collections mensuellement
2. **Images** : Remplacez les placeholders par de vraies photos
3. **SEO** : Surveillez les performances avec Google Search Console
4. **Sécurité** : Gardez les dépendances à jour

### Sauvegarde

- Sauvegardez régulièrement le dossier du projet
- Utilisez Git pour le versioning
- Conservez une copie des images originales

### Support Technique

Pour tout problème technique :
1. Vérifiez la console du navigateur (F12)
2. Consultez les erreurs dans les logs
3. Contactez l'équipe de développement

---

## 📱 Responsivité

Le site est déjà optimisé pour :
- Desktop (1920px+)
- Tablettes (768px - 1024px)
- Mobile (< 768px)

Pour tester :
1. Ouvrez les outils de développement (F12)
2. Activez le mode responsive
3. Testez différentes tailles d'écran

---

## 🚀 Déploiement

Le site est prêt pour être déployé sur :
- Hébergement traditionnel (cPanel, Plesk)
- Services cloud (Netlify, Vercel, GitHub Pages)
- VPS personnel

Consultez le fichier `DEPLOYMENT.md` pour les instructions détaillées.

---

## 📞 Contact Support

Pour toute question sur la gestion du contenu :
- Email : contact@saraki.ne
- WhatsApp : +227 97 09 33 87

---

*Document mis à jour le 14 août 2026*