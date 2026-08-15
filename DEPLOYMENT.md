# Instructions de Déploiement - Site Web SARAKI

## 📋 Table des Matières

1. [Pré-requis](#pré-requis)
2. [Options d'Hébergement](#options-dhébergement)
3. [Déploiement sur Hébergement Traditionnel](#déploiement-sur-hébergement-traditionnel)
4. [Déploiement sur Services Cloud](#déploiement-sur-services-cloud)
5. [Configuration DNS](#configuration-dns)
6. [SSL et HTTPS](#ssl-et-https)
7. [Optimisation Production](#optimisation-production)
8. [Surveillance et Maintenance](#surveillance-et-maintenance)

---

## 🚀 Pré-requis

### Avant le Déploiement

1. **Vérifier le contenu**
   - Remplacer tous les placeholders par du contenu réel
   - Optimiser toutes les images
   - Tester tous les liens et formulaires
   - Vérifier la responsivité

2. **Préparer les fichiers**
   - Minifier CSS et JS (optionnel mais recommandé)
   - Compresser les images
   - Créer une sauvegarde complète

3. **Informations nécessaires**
   - Nom de domaine
   - Identifiants d'hébergement
   - Informations de contact pour le site

---

## 🌐 Options d'Hébergement

### 1. Hébergement Partagé (cPanel, Plesk)

**Avantages** : Simple, économique, support inclus
**Inconvénients** : Ressources limitées, moins flexible

**Fournisseurs recommandés** :
- Hostinger
- Bluehost
- SiteGround
- OVHcloud

### 2. VPS (Serveur Privé Virtuel)

**Avantages** : Plus de contrôle, meilleur performance
**Inconvénients** : Nécessite plus de connaissances techniques

**Fournisseurs recommandés** :
- DigitalOcean
- Linode
- Vultr
- AWS Lightsail

### 3. Services Cloud (PaaS)

**Avantages** : Déploiement automatique, scalable, moderne
**Inconvénients** : Peut être plus coûteux à grande échelle

**Fournisseurs recommandés** :
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

---

## 📁 Déploiement sur Hébergement Traditionnel

### Méthode 1 : FTP/SFTP

1. **Préparer les fichiers**
   ```bash
   # Structure finale
   public_html/
   ├── index.html
   ├── about.html
   ├── catalog.html
   ├── services.html
   ├── gallery.html
   ├── contact.html
   ├── favicon.svg
   ├── sitemap.xml
   ├── css/
   │   └── style.css
   ├── js/
   │   └── main.js
   └── assets/
       ├── logo.svg
       └── images/
   ```

2. **Utiliser un client FTP**
   - FileZilla (Windows/Mac/Linux)
   - Cyberduck (Mac)
   - WinSCP (Windows)

3. **Connexion et upload**
   ```
   Hôte : ftp.votre-hebergeur.com
   Utilisateur : votre-username
   Mot de passe : votre-motdepasse
   Port : 21 (FTP) ou 22 (SFTP)
   ```

4. **Uploader les fichiers**
   - Connectez-vous au serveur
   - Naviguez vers `public_html` ou `www`
   - Uploadez tous les fichiers du dossier `public/`

### Méthode 2 : Gestionnaire de Fichiers (cPanel)

1. **Connectez-vous à cPanel**
   - URL : `https://votre-domaine.com/cpanel`
   - Identifiants fournis par votre hébergeur

2. **Ouvrir le Gestionnaire de Fichiers**
   - Section "Fichiers"
   - Cliquez sur "Gestionnaire de Fichiers"

3. **Uploader les fichiers**
   - Naviguez vers `public_html`
   - Cliquez sur "Upload"
   - Sélectionnez tous les fichiers du projet
   - Ou uploadez un fichier ZIP et extrayez-le

### Méthode 3 : Git (pour les utilisateurs avancés)

1. **Initialiser Git sur le serveur**
   ```bash
   ssh utilisateur@votre-serveur.com
   cd public_html
   git init
   git remote add origin https://github.com/votre-username/saraki.git
   git pull origin main
   ```

2. **Configuration du hook post-receive**
   ```bash
   cd /var/www/votre-site.git/hooks
   nano post-receive
   ```

   ```bash
   #!/bin/bash
   git --work-tree=/var/www/html --git-dir=/var/www/votre-site.git checkout -f
   ```

   ```bash
   chmod +x post-receive
   ```

---

## ☁️ Déploiement sur Services Cloud

### Netlify

1. **Préparer le projet**
   ```bash
   # Déplacer le contenu de public/ à la racine
   mv public/* .
   rmdir public
   ```

2. **Créer un compte Netlify**
   - Allez sur [netlify.com](https://netlify.com)
   - Créez un compte gratuit

3. **Déployer via Drag & Drop**
   - Connectez-vous à Netlify
   - Glissez-déposez le dossier du projet
   - Netlify déploiera automatiquement

4. **Configuration**
   - Domaine : Configurez votre domaine personnalisé
   - HTTPS : Activé automatiquement
   - Redirects : Configurez si nécessaire

### Vercel

1. **Installation de Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Déploiement**
   ```bash
   cd C:\laragon\www\saraki
   vercel
   ```

3. **Configuration**
   - Suivez les instructions en ligne de commande
   - Choisissez vos préférences de projet
   - Configurez votre domaine personnalisé

### GitHub Pages

1. **Créer un repository GitHub**
   - Créez un nouveau repository `saraki-website`
   - Uploadez vos fichiers

2. **Configuration GitHub Pages**
   - Allez dans Settings > Pages
   - Sélectionnez la branche `main`
   - Choisissez le dossier `/` (root)

3. **Personnalisation de domaine**
   - Configurez votre domaine dans Settings > Pages
   - Ajoutez les enregistrements DNS appropriés

---

## 🔧 Configuration DNS

### Enregistrements DNS Requis

#### Pour A Record (Adresse IP)
```
Type : A
Host : @
Value : IP de votre serveur
TTL : 3600
```

#### Pour CNAME (Services Cloud)
```
Type : CNAME
Host : www
Value : votre-site.netlify.app (ou autre service)
TTL : 3600
```

### Configuration chez les fournisseurs populaires

**GoDaddy**
1. Connectez-vous à GoDaddy
2. Allez dans DNS Management
3. Ajoutez les enregistrements A/CNAME

**Namecheap**
1. Connectez-vous à Namecheap
2. Allez dans Domain List > Manage
3. Advanced DNS > Add New Record

**Cloudflare**
1. Ajoutez votre domaine à Cloudflare
2. Cloudflare détectera automatiquement vos enregistrements DNS
3. Configurez les enregistrements appropriés

---

## 🔒 SSL et HTTPS

### Certificat SSL Gratuit (Let's Encrypt)

#### Via cPanel
1. Allez dans "SSL/TLS"
2. Cliquez sur "Let's Encrypt"
3. Sélectionnez votre domaine
4. Cochez "www" si nécessaire
5. Cliquez sur "Install"

#### Via Certbot (VPS)
```bash
# Installation de Certbot
sudo apt-get install certbot python3-certbot-nginx

# Génération du certificat
sudo certbot --nginx -d saraki.ne -d www.saraki.ne

# Renouvellement automatique
sudo certbot renew --dry-run
```

### Forcer HTTPS

**Via .htaccess**
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

**Via configuration serveur (Nginx)**
```nginx
server {
    listen 80;
    server_name saraki.ne www.saraki.ne;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name saraki.ne www.saraki.ne;
    # Configuration SSL
}
```

---

## ⚡ Optimisation Production

### 1. Minification

**CSS**
```bash
# Utilisation de cssnano
npm install -g cssnano-cli
cssnano css/style.css css/style.min.css
```

**JavaScript**
```bash
# Utilisation de terser
npm install -g terser
terser js/main.js -o js/main.min.js
```

### 2. Compression Gzip

**Via .htaccess**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### 3. Cache Browser

**Via .htaccess**
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 4. Lazy Loading
Déjà implémenté dans le site avec `loading="lazy"` sur les images.

### 5. WebP Format
Convertissez vos images en WebP pour une meilleure compression :

```bash
# Utilisation de cwebp
cwebp input.jpg -o output.webp -q 80
```

---

## 📊 Surveillance et Maintenance

### 1. Google Search Console

1. **Ajouter votre site**
   - Allez sur [search.google.com/search-console](https://search.google.com/search-console)
   - Ajoutez votre propriété
   - Vérifiez via HTML file ou DNS

2. **Soumettre le sitemap**
   - Section "Sitemaps"
   - Soumettez `https://saraki.ne/sitemap.xml`

3. **Surveiller les erreurs**
   - Section "Coverage"
   - Section "Enhancements"

### 2. Google Analytics

1. **Créer une propriété**
   - Allez sur [analytics.google.com](https://analytics.google.com)
   - Créez une propriété GA4

2. **Ajouter le code de suivi**
   - Copiez le code de suivi
   - Ajoutez-le dans le `<head>` de chaque page

### 3. Surveillance Uptime

**Services gratuits**
- UptimeRobot
- Pingdom
- StatusCake

### 4. Sauvegardes Automatiques

**Via cPanel**
1. Allez dans "Backups"
2. Configurez les sauvegardes automatiques
3. Choisissez la fréquence (quotidienne, hebdomadaire)

**Manuel**
```bash
# Sauvegarde base de données
mysqldump -u utilisateur -p base_de_donnees > backup.sql

# Sauvegarde fichiers
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/html
```

---

## 🔍 Vérifications Post-Déploiement

### Checklist de Validation

- [ ] Tous les liens fonctionnent
- [ ] Les images s'affichent correctement
- [ ] Le formulaire de contact fonctionne
- [ ] Le site est responsive sur mobile
- [ ] HTTPS est activé et fonctionne
- [ ] Le sitemap est soumis à Google
- [ ] Google Analytics est configuré
- [ ] Les meta tags sont corrects
- [ ] Le temps de chargement est acceptable (< 3s)
- [ ] Le site est accessible sans www

### Tests de Performance

**Google PageSpeed Insights**
- Allez sur [pagespeed.web.dev](https://pagespeed.web.dev)
- Testez votre site
- Visez un score > 80

**GTmetrix**
- Allez sur [gtmetrix.com](https://gtmetrix.com)
- Analysez les performances
- Suivez les recommandations

---

## 🛠️ Dépannage

### Problèmes Courants

**Site inaccessible**
1. Vérifiez les enregistrements DNS
2. Vérifiez que les fichiers sont uploadés
3. Vérifiez les permissions des fichiers (755 pour dossiers, 644 pour fichiers)

**Images ne s'affichent pas**
1. Vérifiez les chemins relatifs
2. Vérifiez la casse des noms de fichiers
3. Vérifiez les permissions

**Formulaire ne fonctionne pas**
1. Vérifiez la configuration du formulaire
2. Vérifiez les restrictions du serveur
3. Testez avec un service de formulaire tiers

**Lent au chargement**
1. Optimisez les images
2. Activez la compression Gzip
3. Minifiez CSS et JS
4. Utilisez un CDN

---

## 📞 Support

Si vous rencontrez des problèmes lors du déploiement :

1. **Documentation de votre hébergeur**
   - Consultez la documentation officielle
   - Contactez le support technique

2. **Ressources en ligne**
   - Stack Overflow
   - GitHub Issues
   - Forums de développement

3. **Contactez l'équipe de développement**
   - Email : contact@saraki.ne
   - WhatsApp : +227 97 09 33 87

---

## 📝 Notes Importantes

1. **Sauvegarde** : Faites toujours une sauvegarde avant de modifier
2. **Test** : Testez sur un environnement de staging si possible
3. **Patience** : La propagation DNS peut prendre jusqu'à 48h
4. **Sécurité** : Gardez vos identifiants en sécurité

---

*Instructions de déploiement créées pour SARAKI - 14 août 2026*