# Guide d'Administration - Gestion des Produits Sans Base de Données

## 🎯 Concept

Le site SARAKI utilise une approche **JSON + JavaScript** pour gérer les produits sans base de données traditionnelle. Les données sont stockées dans un fichier JSON et chargées dynamiquement par JavaScript.

## 📁 Structure des Données

### Fichier JSON (`js/products.json`)
```json
{
  "products": [
    {
      "id": 1,
      "name": "Robe Boubou Moderne",
      "price": "85 000 FCFA",
      "description": "Collection signature - Coupe structurée avec touches dorées",
      "category": "femme",
      "image": "../assets/images/products/robe-boubou.jpg",
      "featured": true
    }
  ]
}
```

## 🔧 Panneau d'Administration

### Accès
- **URL** : `http://localhost:8080/public/admin.html`
- **Lien** : Disponible dans le footer du site principal (🔧 Administration)

### Fonctionnalités

#### 1. **Afficher les Produits**
- Tableau avec miniature, nom, prix, catégorie
- Actions : Modifier, Supprimer

#### 2. **Ajouter un Produit**
- Formulaire complet avec tous les champs
- Upload d'image (stockage local pour prototype)
- Validation des champs obligatoires
- Option "Produit mis en avant"

#### 3. **Modifier un Produit**
- Pré-remplissage du formulaire avec données existantes
- Modification de tous les champs
- Changement d'image optionnel

#### 4. **Supprimer un Produit**
- Confirmation de suppression
- Mise à jour automatique de l'affichage

#### 5. **Paramètres**
- **Exporter** : Télécharger le fichier JSON modifié
- **Importer** : Charger un fichier JSON existant
- **Réinitialiser** : Retourner aux produits par défaut

## 🚀 Comment Ça Fonctionne

### Processus Actuel (Prototype)

1. **Chargement des données**
   - JavaScript lit le fichier `products.json`
   - Les produits sont affichés dynamiquement

2. **Modification via Admin**
   - L'admin modifie les données via l'interface
   - Les changements sont sauvegardés dans `localStorage`
   - Les modifications sont visibles immédiatement

3. **Export pour Sauvegarde**
   - L'admin exporte le fichier JSON modifié
   - Ce fichier peut être sauvegardé comme backup
   - Pour production : remplacer le fichier original

### Processus Production

#### Option 1 : Édition Manuelle du JSON
1. Ouvrir `js/products.json` dans un éditeur de texte
2. Modifier les données selon le format
3. Sauvegarder le fichier
4. Les changements sont immédiatement visibles sur le site

#### Option 2 : GitHub comme Backend
1. Héberger le site sur GitHub Pages
2. Utiliser l'API GitHub pour modifier `products.json`
3. Les changements sont automatiquement déployés

#### Option 3 : Firebase comme Base de Données
1. Créer un projet Firebase
2. Utiliser Firebase Realtime Database
3. Remplacer le chargement JSON par appel API Firebase
4. Panel admin Firebase inclus

#### Option 4 : Backend Léger (PHP)
1. Créer un simple script PHP
2. Formulaire admin pour modifier le JSON
3. Écriture du fichier sur le serveur

## 📝 Guide d'Utilisation

### Ajouter un Nouveau Produit

1. **Accéder au panel admin**
   - Cliquez sur "🔧 Administration" dans le footer
   - Ou allez directement sur `admin.html`

2. **Remplir le formulaire**
   - Nom du produit
   - Prix (format: "XX XXX FCFA")
   - Catégorie (Femme, Homme, Sur mesure, Événementiel)
   - Description détaillée
   - Image (clic sur la zone d'upload)
   - Cochez "Produit mis en avant" si nécessaire

3. **Enregistrer**
   - Cliquez sur "Ajouter le produit"
   - Le produit apparaît immédiatement dans le catalogue

### Modifier un Produit

1. **Dans la liste des produits**
   - Cliquez sur "Modifier" pour le produit souhaité
   - Le formulaire se remplit avec les données existantes

2. **Apporter les modifications**
   - Changez les champs nécessaires
   - Changez l'image si souhaité
   - Modifiez le statut "mis en avant"

3. **Enregistrer**
   - Cliquez sur "Mettre à jour le produit"
   - Les modifications sont appliquées immédiatement

### Supprimer un Produit

1. **Dans la liste des produits**
   - Cliquez sur "Supprimer"
   - Confirmez la suppression

2. **Vérification**
   - Le produit disparaît de la liste
   - Il n'est plus affiché sur le catalogue

### Gestion des Images

#### Actuellement (Prototype)
- Les images sont converties en Base64 pour l'affichage
- Stockées temporairement dans le navigateur
- Pour la production : exporter le JSON et remplacer les fichiers

#### Pour Production
1. **Upload manuel**
   - Placez vos images dans `assets/images/products/`
   - Modifiez les chemins dans le JSON
   - Format recommandé : `../assets/images/products/nom-image.jpg`

2. **Via panel admin**
   - Uploadez l'image via le formulaire
   - Exportez le JSON
   - Remplacez le fichier `js/products.json`
   - Déplacez l'image dans le bon dossier
   - Ajustez le chemin dans le JSON

## 🔒 Sécurité

### Actuel (Prototype)
- Pas d'authentification
- Panel accessible publiquement
- Recommandé seulement pour environnement de développement

### Pour Production
1. **Authentification simple**
   - Ajoutez un mot de passe simple
   - Stockage dans `localStorage`
   - Protection basique du panel admin

2. **Authentification professionnelle**
   - Intégration avec service tiers (Auth0, Firebase Auth)
   - Ou création d'un système d'authentification personnalisé

## 📊 Sauvegarde et Restauration

### Sauvegarder les Données
1. **Export automatique**
   - Cliquez sur "Exporter les produits (JSON)"
   - Le fichier `products.json` est téléchargé
   - Sauvegardez ce fichier en lieu sûr

2. **Sauvegarde manuelle**
   - Copiez le contenu de `localStorage`
   - Ou sauvegardez directement le fichier `js/products.json`

### Restaurer les Données
1. **Import**
   - Cliquez sur "Importer des produits (JSON)"
   - Sélectionnez votre fichier de sauvegarde
   - Les produits sont restaurés

2. **Réinitialisation**
   - Cliquez sur "Réinitialiser les produits"
   - Retour aux produits par défaut
   - Utile en cas d'erreur

## 🎯 Avantages de Cette Approche

### ✅ Pour le Prototype
- **Rapide** : Pas de configuration serveur nécessaire
- **Simple** : Pas de base de données à gérer
- **Économique** : Pas de coûts d'hébergement de base de données
- **Flexible** : Facile à modifier et exporter

### ✅ Pour la Migration Future
- **Scalable** : Facile à migrer vers une vraie base de données
- **Portabilité** : Le JSON peut être importé dans n'importe quel système
- **Testable** : Facile de tester différentes configurations

## 🚀 Migration vers une Vraie Base de Données

### Quand migrer ?
- Plus de 100 produits
- Gestion d'inventaire complexe
- Système de commandes en ligne
- Gestion des utilisateurs
- Besoin de statistiques avancées

### Options de Migration

#### 1. Firebase (Recommandé pour petits sites)
```javascript
// Remplacer le chargement JSON
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Charger les produits
const productsRef = ref(db, 'products');
get(productsRef).then((snapshot) => {
  const data = snapshot.val();
  // Utiliser les données
});
```

#### 2. Supabase (PostgreSQL gratuit)
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('URL', 'KEY');

// Charger les produits
const { data, error } = await supabase
  .from('products')
  .select('*');
```

#### 3. Node.js + MongoDB
```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/saraki');

const Product = mongoose.model('Product', {
  name: String,
  price: String,
  description: String,
  category: String,
  image: String,
  featured: Boolean
});

// Charger les produits
const products = await Product.find();
```

## 📱 Utilisation Mobile

Le panel admin est **responsive** et fonctionne sur :
- Desktop (optimal)
- Tablettes (fonctionnel)
- Mobile (utilisables)

## 🐛 Dépannage

### Problème : Les produits ne s'affichent pas
1. Vérifiez que `js/products.json` existe
2. Vérifiez la console du navigateur (F12)
3. Assurez-vous que le JSON est valide (utilisez un validateur JSON)

### Problème : Les modifications ne s'affichent pas
1. Vérifiez que vous avez cliqué sur "Enregistrer"
2. Vérifiez la console pour les erreurs
3. Essayez de rafraîchir la page

### Problème : Les images ne s'affichent pas
1. Vérifiez le chemin de l'image dans le JSON
2. Assurez-vous que le fichier image existe
3. Pour les images Base64 : vérifiez la taille (< 2MB recommandé)

## 📞 Support

Pour toute question sur l'administration :
- Consultez le `GUIDE_UTILISATION.md` pour l'utilisation générale
- Consultez le `CUSTOMISATION.md` pour les modifications
- Consultez le `DEPLOYMENT.md` pour la mise en production

---

*Guide d'administration créé pour SARAKI - 14 août 2026*