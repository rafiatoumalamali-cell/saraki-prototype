# Guide de Test - Prototype SARAKI

## 📋 Table des Matières

1. [Configuration de Test](#configuration-de-test)
2. [Test du Site Public](#test-du-site-public)
3. [Test du Panier et Checkout](#test-du-panier-et-checkout)
4. [Test de l'Administration](#test-de-ladministration)
5. [Test de l'Inventaire](#test-de-linventaire)
6. [Test des Analytics](#test-des-analytics)
7. [Test Responsive](#test-responsive)
8. [Checklist de Validation](#checklist-de-validation)

---

## 🖥️ Configuration de Test

### Démarrer le Serveur Local

```bash
cd C:\laragon\www\saraki
python -m http.server 8080
```

### URL de Test

- **Site principal** : http://localhost:8080/public
- **Catalogue** : http://localhost:8080/public/catalog.html
- **Panier** : http://localhost:8080/public/cart.html
- **Checkout** : http://localhost:8080/public/checkout.html
- **Admin** : http://localhost:8080/public/admin.html
- **Analytics** : http://localhost:8080/public/analytics.html
- **Inventaire** : http://localhost:8080/public/inventory.html

### Navigateurs Recommandés

- Chrome (dernière version)
- Firefox (dernière version)
- Edge (dernière version)

---

## 🌐 Test du Site Public

### 1. Page d'Accueil

#### Navigation
- [ ] Le menu de navigation s'affiche correctement
- [ ] Les liens vers toutes les pages fonctionnent
- [ ] Le logo SARAKI est visible et cliquable
- [ ] Le footer contient tous les liens

#### Contenu
- [ ] Les produits phares s'affichent
- [ ] Les boutons "Ajouter au panier" fonctionnent
- [ ] Les images de produits cliquent sur le modal
- [ ] Le bouton WhatsApp fonctionne

#### Modal Produit
- [ ] Clic sur image ouvre le modal
- [ ] Le modal affiche les détails du produit
- [ ] Le stock est affiché (en stock, limité, rupture)
- [ ] Le sélecteur de quantité fonctionne
- [ ] Le bouton "Ajouter au panier" fonctionne
- [ ] Le bouton "Passer la commande" fonctionne
- [ ] La fermeture du modal fonctionne (X, extérieur, Escape)

### 2. Page Catalogue

#### Affichage
- [ ] La page charge sans erreur
- [ ] Tous les produits s'affichent
- [ ] Les images sont visibles
- [ ] Les prix sont affichés correctement

#### Recherche
- [ ] La barre de recherche fonctionne
- [ ] La recherche en temps réel fonctionne
- [ ] La recherche par nom fonctionne
- [ ] La recherche par description fonctionne
- [ ] Le bouton reset fonctionne
- [ ] Le message "Aucun produit trouvé" s'affiche quand nécessaire

#### Filtres Avancés
- [ ] Le filtre par prix fonctionne
- [ ] Le tri par prix croissant fonctionne
- [ ] Le tri par prix décroissant fonctionne
- [ ] Le tri par nom A-Z fonctionne
- [ ] Le tri par nom Z-A fonctionne
- [ ] Le filtre par stock fonctionne
- [ ] Les filtres par catégorie fonctionnent
- [ ] Les filtres se combinent correctement

#### Actions
- [ ] "Ajouter au panier" fonctionne
- [ ] Le compteur de panier se met à jour
- [ ] La notification toast s'affiche
- [ ] Clic sur image ouvre le modal

### 3. Page À Propos

- [ ] La page charge sans erreur
- [ ] Le contenu s'affiche correctement
- [ ] Les images et textes sont visibles
- [ ] La navigation fonctionne

### 4. Page Services

- [ ] La page charge sans erreur
- [ ] Les services sont listés
- [ ] Les cartes de services s'affichent
- [ ] Les liens fonctionnent

### 5. Page Galerie

- [ ] La page charge sans erreur
- [ ] Les images de galerie s'affichent
- [ ] Le lightbox fonctionne (clic sur image)
- [ ] Les filtres par catégorie fonctionnent
- [ ] La navigation fonctionne

### 6. Page Contact

- [ ] La page charge sans erreur
- [ ] Le formulaire de contact s'affiche
- [ ] Google Maps s'affiche
- [ ] Les informations de contact sont visibles
- [ ] Le bouton WhatsApp fonctionne

### 7. Pages Légales

#### CGV
- [ ] La page charge sans erreur
- [ ] Le contenu est lisible
- [ ] Toutes les sections sont présentes

#### Politique de Confidentialité
- [ ] La page charge sans erreur
- [ ] Le contenu est lisible
- [ ] Toutes les sections sont présentes

#### Mentions Légales
- [ ] La page charge sans erreur
- [ ] Le contenu est lisible
- [ ] Toutes les sections sont présentes

### 8. Pages Spéciales

#### 404
- [ ] Accès à une page inexistante affiche la page 404
- [ ] Le design est cohérent
- [ ] Les boutons de retour fonctionnent

#### Maintenance
- [ ] La page maintenance s'affiche
- [ ] Le design est cohérent
- [ ] Les informations sont claires

---

## 🛒 Test du Panier et Checkout

### 1. Ajout au Panier

Depuis le catalogue ou l'accueil :
- [ ] Clic sur "Ajouter au panier" ajoute le produit
- [ ] Le compteur de panier augmente
- [ ] La notification toast s'affiche
- [ ] Ajout multiple du même produit augmente la quantité

### 2. Page Panier

#### Affichage
- [ ] La page panier charge sans erreur
- [ ] Les produits ajoutés s'affichent
- [ ] Les images, noms, prix sont corrects
- [ ] Les quantités sont correctes

#### Actions
- [ ] Bouton +1 augmente la quantité
- [ ] Bouton -1 diminue la quantité
- [ ] Quantité 0 supprime le produit
- [ ] Input direct modifie la quantité
- [ ] Bouton "Supprimer" retire le produit
- [ ] Le sous-total se met à jour
- [ ] Les frais de livraison sont calculés
- [ ] Le total est correct

#### Navigation
- [ ] "Continuer mes achats" retourne au catalogue
- [ ] "Passer la commande" va au checkout

### 3. Page Checkout

#### Formulaire
- [ ] La page charge sans erreur
- [ ] Le récapitulatif s'affiche
- [ ] Les champs obligatoires sont identifiés
- [ ] Les placeholders sont clairs

#### Validation
- [ ] Le formulaire se valide correctement
- [ ] Les champs vides bloquent la soumission
- [ ] Les messages d'erreur s'affichent

#### Méthodes de Paiement
- [ ] Les 3 méthodes sont cliquables
- [ ] La sélection visuelle fonctionne
- [ ] La méthode choisie est sauvegardée

#### Soumission
- [ ] Le bouton "Passer la commande" fonctionne
- [ ] La commande est sauvegardée
- [ ] Le panier est vidé
- [ ] Redirection vers la confirmation

### 4. Page Confirmation

#### Affichage
- [ ] La page charge sans erreur
- [ ] Le numéro de commande s'affiche
- [ ] La date de commande s'affiche
- [ ] La méthode de paiement s'affiche
- [ ] Le total s'affiche

#### Instructions
- [ ] Les prochaines étapes sont claires
- [ ] Les boutons de retour fonctionnent

---

## 🔧 Test de l'Administration

### 1. Accès Admin

- [ ] La page admin charge sans erreur
- [ ] L'interface est intuitive
- [ ] Les boutons de navigation fonctionnent

### 2. Gestion des Produits

#### Liste des Produits
- [ ] Tous les produits s'affichent
- [ ] Les informations sont correctes
- [ ] Les filtres par catégorie fonctionnent
- [ ] La recherche fonctionne

#### Ajout Produit
- [ ] Le formulaire d'ajout s'affiche
- [ ] Tous les champs sont présents
- [ ] L'upload d'image fonctionne
- [ ] Le drag & drop fonctionne
- [ ] La validation fonctionne
- [ ] L'ajout fonctionne
- [ ] Le produit apparaît dans la liste
- [ ] Le produit apparaît sur le site public

#### Modification Produit
- [ ] Le bouton d'édition fonctionne
- [ ] Le formulaire se pré-remplit
- [ ] L'image existante s'affiche
- [ ] La modification fonctionne
- [ ] Les changements s'appliquent
- [ ] Le produit se met à jour sur le site public

#### Suppression Produit
- [ ] Le bouton de suppression fonctionne
- [ ] La confirmation fonctionne
- [ ] Le produit est retiré
- [ ] Le produit disparaît du site public

#### Image Upload
- [ ] L'upload fonctionne
- [ ] Les types acceptés sont respectés
- [ ] La limite de taille est respectée
- [ ] La prévisualisation fonctionne
- [ ] L'erreur s'affiche si problème

#### Stock
- [ ] Le champ stock s'affiche
- [ ] Le champ seuil d'alerte s'affiche
- [ ] Les valeurs sont sauvegardées
- [ ] Les valeurs s'affichent dans l'inventaire

### 3. Paramètres

#### Import/Export
- [ ] L'export JSON fonctionne
- [ ] L'import JSON fonctionne
- [ ] Le format est correct
- [ ] Les données sont préservées

#### Reset
- [ ] Le reset fonctionne
- [ ] Les données par défaut sont restaurées
- [ ] La confirmation est demandée

---

## 📦 Test de l'Inventaire

### 1. Accès Inventaire

- [ ] La page inventaire charge sans erreur
- [ ] L'interface est intuitive
- [ ] Les boutons de navigation fonctionnent

### 2. Vue d'Ensemble

- [ ] Les métriques s'affichent
- [ ] Le total produits est correct
- [ ] Le stock total est correct
- [ ] Les alertes s'affichent
- [ ] Le graphique s'affiche

### 3. Liste de Stock

- [ ] Tous les produits s'affichent
- [ ] Les informations sont correctes
- [ ] Le stock actuel est visible
- [ ] Le seuil d'alerte est visible

### 4. Actions de Stock

#### Ajustement Rapide
- [ ] Les boutons +1/-1 fonctionnent
- [ ] Le stock se met à jour
- [ ] L'ajout rapide fonctionne
- [ ] La validation fonctionne

#### Modification
- [ ] Le bouton de modification fonctionne
- [ ] Le formulaire s'affiche
- [ ] La modification fonctionne
- [ ] Le stock se met à jour

### 5. Historique des Mouvements

- [ ] L'historique s'affiche
- [ ] Les mouvements sont enregistrés
- [ ] Les filtres fonctionnent
- [ ] Les détails sont corrects

### 6. Alertes de Stock

- [ ] Les alertes de stock bas s'affichent
- [ ] Les alertes de rupture s'affichent
- [ ] Les liens vers les produits fonctionnent

---

## 📊 Test des Analytics

### 1. Accès Analytics

- [ ] La page analytics charge sans erreur
- [ ] L'interface est intuitive
- [ ] Les boutons de navigation fonctionnent

### 2. Vue d'Ensemble

- [ ] Les métriques principales s'affichent
- [ ] Les graphiques s'affichent
- [ ] Les données sont cohérentes

### 3. Filtres de Période

- [ ] Les boutons de période fonctionnent
- [ ] Les données se mettent à jour
- [ ] Les graphiques s'adaptent

### 4. Sections

#### Visiteurs
- [ ] Les métriques s'affichent
- [ ] Le graphique de tendance s'affiche

#### Produits
- [ ] Les top produits s'affichent
- [ ] Le graphique par catégorie s'affiche

#### Trafic
- [ ] Les sources de trafic s'affichent
- [ ] La répartition par device s'affiche

#### Activité
- [ ] Les pages les plus visitées s'affichent
- [ ] L'activité récente s'affiche
- [ ] L'activité horaire s'affiche

---

## 📱 Test Responsive

### Desktop (1920x1080)
- [ ] Le site s'affiche correctement
- [ ] La navigation fonctionne
- [ ] Les grilles sont correctes
- [ ] Les images sont bien dimensionnées

### Tablet (768x1024)
- [ ] Le site s'adapte correctement
- [ ] Le menu hamburger fonctionne
- [ ] Les grilles passent en 2 colonnes
- [ ] Les formulaires sont adaptés

### Mobile (375x667)
- [ ] Le site s'adapte correctement
- [ ] Le menu hamburger fonctionne
- [ ] Les grilles passent en 1 colonne
- [ ] Les filtres s'adaptent
- [ ] Les formulaires sont adaptés
- [ ] Le panier est responsive
- [ ] Le checkout est responsive
- [ ] Le modal est responsive

---

## ✅ Checklist de Validation

### Fonctionnalités Core
- [ ] Navigation complète
- [ ] Page d'accueil fonctionnelle
- [ ] Catalogue avec filtres
- [ ] Panier et checkout
- [ ] Modal de détails produit
- [ ] Administration CRUD
- [ ] Inventaire avec stock
- [ ] Analytics dashboard

### UX/UI
- [ ] Design cohérent
- [ ] Animations fluides
- [ ] Notifications toast
- [ ] Indicateurs de chargement
- [ ] Mobile responsive
- [ ] Accessibilité

### Technique
- [ ] Pas d'erreurs console
- [ ] Liens brisés aucun
- [ ] Images chargent
- [ ] Performance acceptable
- [ ] LocalStorage fonctionne

### Légal
- [ ] CGV présente
- [ ] Politique de confidentialité présente
- [ ] Mentions légales présentes
- [ ] Liens fonctionnels

---

## 🐛 Résolution de Problèmes

### Si un test échoue

1. **Vérifier la console** : F12 → Console pour les erreurs
2. **Vider le cache** : Ctrl + F5
3. **Vérifier localStorage** : Application → Local Storage
4. **Redémarrer le serveur** : Arrêter et relancer Python
5. **Vérifier les chemins** : Assurez-vous que les fichiers existent

### Problèmes Courants

- **Panier vide** : Vérifier localStorage
- **Images ne chargent pas** : Vérifier les chemins
- **Modal ne s'ouvre pas** : Vérifier product-modal.js
- **Filtres ne fonctionnent pas** : Vérifier les données produits
- **Admin ne sauvegarde pas** : Vérifier localStorage

---

## 📝 Notes de Test

Date : ___________
Testeur : ___________
Navigateur : ___________
Version : ___________

### Résultats

| Test | Statut | Notes |
|------|--------|-------|
| Navigation | ✅/❌ | |
| Panier | ✅/❌ | |
| Checkout | ✅/❌ | |
| Admin | ✅/❌ | |
| Inventaire | ✅/❌ | |
| Analytics | ✅/❌ | |
| Mobile | ✅/❌ | |

### Observations

___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________

---

**Version** : 1.0  
**Dernière mise à jour** : Janvier 2026  
**SARAKI** – Élégance & Fierté du Niger