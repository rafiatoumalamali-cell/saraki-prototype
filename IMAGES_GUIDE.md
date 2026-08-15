# Guide des Images - SARAKI

## 📋 Introduction

Ce guide explique comment remplacer les images placeholder par les vraies photos de SARAKI.

---

## 🗂️ Structure des Images

### Dossier Assets
Les images actuelles sont dans :
```
C:\laragon\www\saraki\assets\
├── logo.svg          # Logo vectoriel
└── logo.png          # Logo PNG
```

### Images Placeholder
Les images placeholder actuelles utilisent :
- Placehold.co pour les produits
- URLs temporaires générées dynamiquement

---

## 📸 Types d'Images Nécessaires

### 1. Logo
- **Fichier actuel** : `assets/logo.svg` et `assets/logo.png`
- **Statut** : ✅ Déjà fourni par le client
- **Action** : Aucune action nécessaire

### 2. Produits (Catalogue)
- **Nombre** : 10-20 photos professionnelles
- **Format** : JPG, PNG, ou WebP
- **Dimensions** : 800x1000 pixels minimum
- **Style** : Fond uni ou épuré, éclairage professionnel
- **Catégories** :
  - Femme (3-5 photos)
  - Homme (3-5 photos)
  - Sur mesure (2-3 photos)
  - Événementiel (2-3 photos)

### 3. Galerie
- **Nombre** : 15-30 photos
- **Format** : JPG, PNG, ou WebP
- **Dimensions** : 1200x800 pixels minimum
- **Style** : Photos de collections, défilés, atelier
- **Thèmes** :
  - Collections signature
  - Mariages
  - Événements
  - Corporate
  - Atelier / Behind the scenes

### 4. Services
- **Nombre** : 4-6 photos
- **Format** : JPG, PNG, ou WebP
- **Dimensions** : 800x600 pixels minimum
- **Style** : Photos illustrant les services

---

## 🎯 Recommandations Photo

### Style
- **Éclairage** : Professionnel, uniforme
- **Fond** : Uni (noir, blanc, ou beige écru)
- **Angle** : Vue frontale et 3/4
- **Qualité** : Haute résolution, nette
- **Cohérence** : Style cohérent entre toutes les photos

### Couleurs
- **Prédominantes** : Noir, écru, or
- **Accents** : Burgundy ou émerald
- **Éviter** : Trop de couleurs différentes

### Modèles
- **Diversité** : Différents types et teintes
- **Poses** : Naturelles, élégantes
- **Tenues** : Bien ajustées, sans plis excessifs
- **Accessoires** : Minimaux, élégants

---

## 📁 Organisation des Nouvelles Images

### Option 1 : Dossier Assets Simple
```
assets/
├── logo.svg
├── logo.png
├── products/          # Photos de produits
│   ├── femme-1.jpg
│   ├── femme-2.jpg
│   ├── homme-1.jpg
│   └── ...
└── gallery/           # Photos de galerie
    ├── collection-1.jpg
    ├── mariage-1.jpg
    └── ...
```

### Option 2 : Stockage Cloud (Recommandé pour Production)
- **Cloudinary** : Gratuit jusqu'à 25GB
- **AWS S3** : Payant mais scalable
- **Google Cloud Storage** : Payant mais scalable

---

## 🔧 Remplacement des Images

### Méthode 1 : Modification Directe du JSON

1. **Préparer les images**
   - Renommer les fichiers de manière cohérente
   - Placer dans le dossier `assets/products/`

2. **Modifier `js/products.json`**
   ```json
   {
     "products": [
       {
         "id": 1,
         "name": "Robe Boubou Moderne",
         "price": "85 000 FCFA",
         "description": "Collection signature - Coupe structurée avec touches dorées",
         "category": "femme",
         "image": "../assets/products/femme-1.jpg",
         "featured": true,
         "stock": 15,
         "alertThreshold": 5
       }
     ]
   }
   ```

3. **Mettre à jour tous les chemins**
   - Remplacer tous les URLs placeholder par les chemins locaux
   - Exemple : `../assets/products/femme-1.jpg`

### Méthode 2 : Via le Panel Admin

1. **Pour chaque produit**
   - Aller dans Admin → Produits
   - Cliquer sur "Modifier"
   - Cliquer sur "Choisir une image"
   - Sélectionner la nouvelle image
   - Sauvegarder

2. **Pour les nouveaux produits**
   - Aller dans Admin → Ajouter Produit
   - Remplir les informations
   - Uploader l'image
   - Sauvegarder

### Méthode 3 : Via Cloud Storage (Production)

1. **Uploader sur Cloudinary**
   - Créer un compte Cloudinary
   - Uploader toutes les images
   - Copier les URLs fournis

2. **Mettre à jour le JSON**
   - Remplacer les chemins locaux par les URLs Cloudinary
   - Exemple : `https://res.cloudinary.com/saraki/image/upload/femme-1.jpg`

---

## 📐 Spécifications Techniques

### Format Recommandé
- **JPEG** : Pour les photos (compression avec perte)
- **PNG** : Pour les images avec transparence
- **WebP** : Format moderne, meilleure compression

### Compression
- **Qualité** : 80-90% (JPEG)
- **Taille cible** : 200-500KB par image
- **Outils** : TinyPNG, ImageOptim, Squoosh

### Noms de Fichiers
- **Format** : `categorie-nom.jpg`
- **Exemples** :
  - `femme-robe-boubou.jpg`
  - `homme-ensemble-chic.jpg`
  - `sur-mesure-mariage.jpg`
- **Éviter** : Espaces, caractères spéciaux

---

## 🎨 Cohérence Visuelle

### Palette de Couleurs
Les photos doivent refléter la palette SARAKI :
- **Noir charbon** : #0A0A0A
- **Or métallique** : #D4AF37
- **Beige écru** : #F5F1E8
- **Burgundy** : #5C1A1A (optionnel)
- **Émerald** : #1A5C3A (optionnel)

### Style Photograhique
- **Élégant** : Poses sophistiquées
- **Moderne** : Mise en scène contemporaine
- **Africain** : Motifs et textures authentiques
- **Premium** : Qualité haute couture

---

## ✅ Checklist Avant Remplacement

### Préparation
- [ ] Toutes les photos sont prises
- [ ] Photos retouchées et optimisées
- [ ] Noms de fichiers cohérents
- [ ] Format standardisé (JPG/PNG)
- [ ] Taille optimisée (<500KB)

### Organisation
- [ ] Dossier `assets/products/` créé
- [ ] Dossier `assets/gallery/` créé
- [ ] Photos classées par catégorie
- [ ] Sauvegardes effectuées

### Test
- [ ] Images chargent correctement
- [ ] Pas d'images brisées
- [ ] Qualité acceptable
- [ ] Performance OK

---

## 🔍 Vérification Après Remplacement

### Tests à Effectuer

1. **Charger le site**
   - http://localhost:8080/public/catalog.html
   - Vérifier que toutes les images chargent

2. **Modal de détails**
   - Cliquer sur un produit
   - Vérifier l'image dans le modal

3. **Admin**
   - Vérifier que les images s'affichent dans l'admin
   - Tester l'upload de nouvelles images

4. **Performance**
   - Temps de chargement acceptable
   - Pas d'images trop lourdes

---

## 📞 Support

Pour toute question concernant les images :

- Email : contact@saraki.ne
- Téléphone : +227 97 09 33 87
- Adresse : Niamey, Niger

---

## 🎯 Prochaines Étapes

Après le remplacement des images :

1. **Finaliser le contenu**
   - Vérifier les descriptions
   - Ajuster les prix
   - Ajouter de vrais témoignages

2. **Optimisation**
   - Compresser les images
   - Implémenter lazy loading
   - Ajouter un CDN

3. **Lancement**
   - Déployer sur l'hébergement
   - Configurer le domaine
   - Activer le SSL

---

**Version** : 1.0  
**Dernière mise à jour** : Janvier 2026  
**SARAKI** – Élégance & Fierté du Niger