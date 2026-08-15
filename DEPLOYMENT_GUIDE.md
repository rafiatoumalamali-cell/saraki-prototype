# Guide de Déploiement - SARAKI

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Structure du Projet](#structure-du-projet)
3. [Déploiement Local](#déploiement-local)
4. [Déploiement sur Hébergement Gratuit](#déploiement-sur-hébergement-gratuit)
5. [Déploiement sur Hébergement Professionnel](#déploiement-sur-hébergement-professionnel)
6. [Configuration du Domaine](#configuration-du-domaine)
7. [Sécurité](#sécurité)
8. [Maintenance](#maintenance)
9. [Résolution de Problèmes](#résolution-de-problèmes)

---

## 📦 Prérequis

### Logiciels Nécessaires

- **Éditeur de code** : VS Code, Sublime Text, ou autre
- **Navigateur** : Chrome, Firefox, Edge (dernière version)
- **Git** : Pour le contrôle de version (optionnel)
- **Python** : Pour le serveur local (version 3.x)

### Comptes Requis

- **Hébergement** : Netlify, Vercel, ou autre (pour déploiement gratuit)
- **Domaine** : Namecheap, GoDaddy, ou autre (optionnel)
- **Email** : Pour les notifications (optionnel)

---

## 🗂️ Structure du Projet

```
saraki/
├── public/                    # Fichiers publics
│   ├── index.html            # Page d'accueil
│   ├── about.html            # À propos
│   ├── catalog.html          # Catalogue
│   ├── services.html         # Services
│   ├── gallery.html          # Galerie
│   ├── contact.html          # Contact
│   ├── admin.html            # Administration
│   ├── analytics.html        # Analytics
│   ├── inventory.html        # Inventaire
│   ├── cart.html             # Panier
│   ├── checkout.html         # Checkout
│   ├── order-confirmation.html # Confirmation commande
│   ├── cgv.html              # CGV
│   ├── privacy.html          # Politique de confidentialité
│   ├── legal.html            # Mentions légales
│   ├── 404.html              # Page 404
│   ├── maintenance.html      # Page maintenance
│   ├── favicon.svg           # Favicon
│   └── sitemap.xml           # Sitemap
├── css/
│   └── style.css             # Styles principaux
├── js/
│   ├── main.js               # JavaScript principal
│   ├── products.json         # Données produits
│   ├── admin.js              # Administration
│   ├── analytics.js          # Analytics
│   ├── inventory.js          # Inventaire
│   ├── cart.js               # Panier
│   ├── checkout.js           # Checkout
│   ├── order-confirmation.js # Confirmation
│   └── product-modal.js      # Modal produit
├── assets/
│   ├── logo.svg              # Logo SARAKI
│   └── logo.png              # Logo PNG
└── docs/                     # Documentation
    ├── GUIDE_UTILISATION.md
    ├── CUSTOMISATION.md
    ├── DEPLOYMENT.md
    └── ADMIN_GUIDE.md
```

---

## 🖥️ Déploiement Local

### Étape 1 : Démarrer le Serveur Local

Ouvrez un terminal dans le dossier du projet :

```bash
cd C:\laragon\www\saraki
python -m http.server 8080
```

### Étape 2 : Accéder au Site

Ouvrez votre navigateur et allez sur :

```
http://localhost:8080/public
```

### Étape 3 : Tester le Site

- Navigation entre les pages
- Panier et checkout
- Panel admin
- Analytics et inventaire

---

## 🌐 Déploiement sur Hébergement Gratuit

### Option 1 : Netlify (Recommandé)

#### Avantages
- Déploiement automatique via Git
- HTTPS gratuit
- CDN intégré
- Hébergement gratuit (100GB/mois)

#### Étapes

1. **Créer un compte Netlify**
   - Allez sur [netlify.com](https://netlify.com)
   - Créez un compte gratuit

2. **Initialiser Git (si pas déjà fait)**
   ```bash
   cd C:\laragon\www\saraki
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Créer un dépôt sur GitHub**
   - Allez sur [github.com](https://github.com)
   - Créez un nouveau dépôt
   - Suivez les instructions pour pousser votre code

4. **Connecter Netlify à GitHub**
   - Dans Netlify, cliquez sur "New site from Git"
   - Sélectionnez GitHub
   - Choisissez votre dépôt
   - Configurez :
     - Build command : (laisser vide)
     - Publish directory : `public`

5. **Déployer**
   - Cliquez sur "Deploy site"
   - Attendez le déploiement (quelques minutes)

6. **Personnaliser le domaine**
   - Dans Site settings → Domain management
   - Changez le nom du site si souhaité

### Option 2 : Vercel

#### Avantages
- Déploiement automatique
- HTTPS gratuit
- Excellent pour projets Next.js
- Hébergement gratuit

#### Étapes

1. **Créer un compte Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Créez un compte gratuit

2. **Importer le projet**
   - Cliquez sur "New Project"
   - Importez depuis GitHub
   - Configurez :
     - Framework Preset : Other
     - Root Directory : `.` (point)
     - Build and Output Settings : `public`

3. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez le déploiement

### Option 3 : GitHub Pages

#### Avantages
- Hébergement gratuit via GitHub
- HTTPS automatique
- Simple pour les projets statiques

#### Étapes

1. **Créer un dépôt GitHub**
   - Si pas déjà fait, créez un dépôt

2. **Activer GitHub Pages**
   - Allez dans Settings → Pages
   - Sélectionnez la branche `main`
   - Sélectionnez le dossier `/ (root)`

3. **Renommer index.html**
   - Déplacez `public/index.html` à la racine
   - Ajustez tous les chemins relatifs

---

## 🏢 Déploiement sur Hébergement Professionnel

### Option 1 : Hébergement Traditionnel (cPanel)

#### Étapes

1. **Acheter un hébergement**
   - Exemple : Hostinger, Bluehost, OVH
   - Choisir un plan avec support SSL

2. **Accéder au cPanel**
   - Utiliser les identifiants fournis par l'hébergeur

3. **Uploader les fichiers**
   - Via File Manager ou FTP
   - Uploader le dossier `public` dans `public_html`

4. **Configurer SSL**
   - Activer Let's Encrypt SSL (gratuit)
   - Forcer HTTPS via .htaccess

5. **Tester le site**
   - Accéder via votre domaine

### Option 2 : Cloud (AWS, Google Cloud, Azure)

Pour un déploiement professionnel avec backend futur, considérer :
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps

---

## 🔧 Configuration du Domaine

### Acheter un Domaine

1. **Registrar recommandés**
   - Namecheap
   - GoDaddy
   - Google Domains

2. **Choisir un nom**
   - Exemple : saraki-ne.com, saraki-fashion.com

3. **Configurer DNS**
   - Pointer vers votre hébergeur
   - Temps de propagation : 24-48h

### SSL/HTTPS

- **Gratuit** : Let's Encrypt (inclus chez la plupart des hébergeurs)
- **Payant** : Comodo, DigiCert
- **Important** : Toujours utiliser HTTPS pour un site e-commerce

---

## 🔒 Sécurité

### Pour le Prototype Actuel

⚠️ **Note importante** : Le prototype actuel utilise localStorage et n'a pas de backend. Pour un site de production, vous devez :

1. **Ajouter un backend**
   - Node.js/Express
   - PHP/Laravel
   - Python/Django

2. **Implémenter l'authentification**
   - Login/password pour admin
   - JWT ou sessions
   - Protection CSRF

3. **Sécuriser les paiements**
   - Utiliser Stripe API
   - Ne jamais stocker les données bancaires
   - PCI DSS compliance

4. **Protéger les données**
   - Hashage des mots de passe (bcrypt)
   - Chiffrement des données sensibles
   - HTTPS obligatoire

### Bonnes Pratiques

- Ne jamais committer de secrets/mots de passe
- Utiliser des variables d'environnement
- Mettre à jour régulièrement les dépendances
- Sauvegarder régulièrement les données

---

## 🛠️ Maintenance

### Mises à Jour

#### Contenu
- Mettre à jour les produits dans le panel admin
- Ajouter de nouvelles photos
- Modifier les textes

#### Design
- Modifier `css/style.css`
- Ajouter de nouvelles pages
- Ajuster les médias queries pour mobile

#### Fonctionnalités
- Ajouter de nouvelles fonctionnalités JavaScript
- Mettre à jour les bibliothèques

### Sauvegardes

Pour le prototype :
- Les données sont dans localStorage (navigateur-specific)
- Pour sauvegarder : Exporter les données depuis admin
- Pour restaurer : Importer les données

Pour la production :
- Sauvegardes automatiques via l'hébergeur
- Base de données backups réguliers
- Code versionné sur Git

### Monitoring

- **Google Analytics** : Pour suivre le trafic
- **Error tracking** : Sentry ou similaire
- **Uptime monitoring** : UptimeRobot (gratuit)

---

## 🔧 Résolution de Problèmes

### Problèmes Courants

#### Site ne se charge pas
- Vérifier que le serveur tourne
- Vérifier les chemins des fichiers
- Vider le cache du navigateur

#### Panier ne fonctionne pas
- Vérifier que localStorage est activé
- Vérifier que cart.js est chargé
- Consulter la console pour les erreurs

#### Images ne s'affichent pas
- Vérifier les chemins relatifs
- Vérifier que les fichiers existent
- Utiliser des chemins absolus si nécessaire

#### Admin ne sauvegarde pas
- Vérifier localStorage
- Vérifier les permissions du navigateur
- Essayer en mode incognito

### Outils de Développement

- **Console du navigateur** : F12 → Console
- **Inspecteur** : F12 → Elements
- **Network** : F12 → Network (pour vérifier les chargements)
- **Application** : F12 → Application (pour localStorage)

---

## 📚 Ressources Additionnelles

### Documentation Projet

- `GUIDE_UTILISATION.md` : Guide d'utilisation du site
- `CUSTOMISATION.md` : Guide de personnalisation
- `ADMIN_GUIDE.md` : Guide du panel admin
- `DEPLOYMENT.md` : Ce guide

### Liens Utiles

- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)
- [JavaScript.info](https://javascript.info)
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)

---

## ✅ Checklist de Déploiement

Avant de mettre le site en production :

- [ ] Tous les liens fonctionnent
- [ ] Panier et checkout testés
- [ ] Admin fonctionnel
- [ ] Analytics testés
- [ ] Inventaire testé
- [ ] Pages légales créées
- [ ] SEO métadonnées complètes
- [ ] Mobile responsive testé
- [ ] HTTPS activé
- [ ] Domaine configuré
- [ ] Analytics installé
- [ ] Formulaire de contact testé
- [ ] Images optimisées
- [ ] Code minifié (optionnel)
- [ ] Sauvegardes configurées

---

## 🎯 Prochaines Étapes pour Production

Pour passer du prototype à un vrai site e-commerce :

1. **Backend** : Node.js/Express ou PHP/Laravel
2. **Base de données** : MySQL ou PostgreSQL
3. **Authentification** : JWT + bcrypt
4. **Upload images** : S3 ou Cloudinary
5. **Paiements** : Stripe API + Mobile Money
6. **Email** : SendGrid ou Mailgun
7. **Analytics** : Google Analytics 4
8. **CDN** : CloudFlare
9. **Monitoring** : Sentry + UptimeRobot
10. **Tests** : Tests E2E avec Cypress

---

## 📞 Support

Pour toute question concernant le déploiement :

- Email : contact@saraki.ne
- Téléphone : +227 97 09 33 87
- Adresse : Niamey, Niger

---

**Version** : 1.0  
**Dernière mise à jour** : Janvier 2026  
**SARAKI** – Élégance & Fierté du Niger