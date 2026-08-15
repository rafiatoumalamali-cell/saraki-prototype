# Git & Netlify Deployment Guide - SARAKI

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setting Up Git](#setting-up-git)
3. [Creating a GitHub Repository](#creating-a-github-repository)
4. [Connecting Netlify to GitHub](#connecting-netlify-to-github)
5. [Deploying to Netlify](#deploying-to-netlify)
6. [Custom Domain Setup](#custom-domain-setup)
7. [Continuous Deployment](#continuous-deployment)
8. [Troubleshooting](#troubleshooting)

---

## 📦 Prerequisites

### Required Software

1. **Git** - Version control system
   - Download: https://git-scm.com/downloads
   - Install with default settings

2. **GitHub Account** - Free code hosting
   - Sign up: https://github.com/signup
   - Free plan is sufficient

3. **Netlify Account** - Deployment platform
   - Sign up: https://app.netlify.com/signup
   - Free plan is sufficient

### Project Location
- **Project folder**: `C:\laragon\www\saraki`
- **Public folder**: `C:\laragon\www\saraki\public`

---

## 🔧 Setting Up Git

### Step 1: Verify Git Installation

Open Command Prompt or PowerShell and run:

```bash
git --version
```

If you see a version number (e.g., `git version 2.40.0`), Git is installed.

If not, download and install from: https://git-scm.com/downloads

### Step 2: Configure Git

Run these commands to configure your Git identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Example:
```bash
git config --global user.name "SARAKI Admin"
git config --global user.email "admin@saraki.ne"
```

### Step 3: Initialize Git Repository

Navigate to your project folder:

```bash
cd C:\laragon\www\saraki
```

Initialize Git:

```bash
git init
```

You should see: `Initialized empty Git repository in C:/laragon/www/saraki/.git/`

### Step 4: Create .gitignore File

Create a `.gitignore` file in the project root to exclude unnecessary files:

```bash
# Create .gitignore file
notepad .gitignore
```

Add this content:

```
# Dependencies
node_modules/
package-lock.json

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Temporary files
*.tmp
*.temp
```

Save and close the file.

---

## 🐙 Creating a GitHub Repository

### Step 1: Create New Repository on GitHub

1. Go to https://github.com
2. Click the **+** icon in the top-right corner
3. Select **New repository**
4. Fill in the details:
   - **Repository name**: `saraki-website` (or your preferred name)
   - **Description**: SARAKI - African Contemporary Fashion Website
   - **Visibility**: Public (or Private if you prefer)
   - **Initialize with**: Leave all checkboxes unchecked
5. Click **Create repository**

### Step 2: Add Files to Git

Back in your terminal, add all files:

```bash
git add .
```

Check the status:

```bash
git status
```

You should see all your files listed as "new file".

### Step 3: Create First Commit

```bash
git commit -m "Initial commit - SARAKI website prototype"
```

Example commit message:
```
Initial commit - SARAKI website prototype

- Added complete website with 6 main pages
- Implemented shopping cart and checkout
- Added admin panel with CRUD operations
- Created inventory management system
- Added analytics dashboard
- Implemented product search and filters
- Added responsive mobile navigation
- Created legal pages (CGV, Privacy, Legal)
- Added 404 and maintenance pages
- Implemented toast notifications
- Added loading indicators
```

### Step 4: Connect Local Repository to GitHub

Copy the repository URL from GitHub. It should look like:
```
https://github.com/your-username/saraki-website.git
```

Add the remote:

```bash
git remote add origin https://github.com/your-username/saraki-website.git
```

Replace `your-username` with your actual GitHub username.

### Step 5: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

You may be asked to authenticate:
- **Username**: Your GitHub username
- **Password**: Your GitHub personal access token (NOT your password)

**Note**: GitHub now requires a Personal Access Token (PAT) instead of password for Git operations.

### Step 6: Create Personal Access Token (if needed)

1. Go to GitHub → Settings (top-right profile icon)
2. Scroll down to "Developer settings"
3. Click "Personal access tokens" → "Tokens (classic)"
4. Click "Generate new token (classic)"
5. Configure:
   - **Note**: SARAKI deployment
   - **Expiration**: No expiration (or choose a date)
   - **Scopes**: Check `repo` (full control of repositories)
6. Click "Generate token"
7. **IMPORTANT**: Copy the token immediately (you won't see it again)

Use this token as your password when pushing.

---

## 🌐 Connecting Netlify to GitHub

### Step 1: Log in to Netlify

1. Go to https://app.netlify.com
2. Log in with your GitHub account (recommended)
3. Authorize Netlify to access your GitHub repositories

### Step 2: Create New Site from Git

1. Click **"Add new site"** or **"New site from Git"**
2. Click **"GitHub"**
3. If prompted, authorize Netlify to access your GitHub
4. You'll see a list of your repositories
5. Find and select `saraki-website` (or your repository name)

### Step 3: Configure Build Settings

Since this is a static site (no build process), configure:

- **Build command**: Leave empty
- **Publish directory**: `public`
- **Branch to deploy**: `main`

Click **"Deploy site"**

### Step 4: Wait for Deployment

Netlify will:
1. Clone your repository
2. Deploy the `public` folder
3. Generate a random URL like: `https://saraki-website-123456.netlify.app`

Wait for the deployment to complete (usually 1-2 minutes).

---

## 🚀 Deploying to Netlify

### Automatic Deployment

After the initial setup, Netlify will automatically:

- **Deploy on push**: Every time you push to GitHub
- **Deploy on pull request**: When you create/merge PRs
- **Deploy on branch**: When you push to different branches

### Manual Deployment

If you need to trigger a manual deployment:

1. Go to Netlify dashboard
2. Select your site
3. Click **"Deploys"** in the left menu
4. Click **"Trigger deploy"**
5. Choose the branch
6. Click **"Deploy site"**

---

## 🌍 Custom Domain Setup

### Option 1: Use Netlify Subdomain (Free)

1. Go to Netlify dashboard
2. Select your site
3. Click **"Site settings"** → **"Domain management"**
4. Click **"Add custom domain"**
5. Enter: `saraki.netlify.app` (or your preferred name)
6. Click **"Save"**

### Option 2: Use Your Own Domain

#### Step 1: Buy a Domain

Recommended registrars:
- Namecheap: https://www.namecheap.com
- GoDaddy: https://www.godaddy.com
- Google Domains: https://domains.google

#### Step 2: Add Domain to Netlify

1. Go to Netlify dashboard
2. Select your site
3. Click **"Site settings"** → **"Domain management"**
4. Click **"Add custom domain"**
5. Enter your domain (e.g., `saraki-ne.com`)
6. Click **"Verify DNS configuration"**

#### Step 3: Update DNS at Your Registrar

1. Log in to your domain registrar
2. Find DNS settings or DNS management
3. Add these records:

```
Type: A
Name: @
Value: 75.2.70.75
TTL: 3600

Type: CNAME
Name: www
Value: your-site-name.netlify.app
TTL: 3600
```

**Note**: Netlify will provide the correct IP address when you add the domain.

#### Step 4: Enable HTTPS

1. In Netlify domain settings
2. Click **"HTTPS"** tab
3. Click **"Verify DNS configuration"**
4. Wait for DNS propagation (up to 48 hours)
5. Click **"Enable HTTPS"**

---

## 🔄 Continuous Deployment

### Workflow

1. **Make changes locally**
   - Edit files in `C:\laragon\www\saraki`
   - Test on local server (`python -m http.server 8080`)

2. **Stage changes**
   ```bash
   git add .
   ```

3. **Commit changes**
   ```bash
   git commit -m "Your commit message"
   ```

4. **Push to GitHub**
   ```bash
   git push
   ```

5. **Automatic deployment**
   - Netlify detects the push
   - Automatically deploys the changes
   - Site is live in 1-2 minutes

### Best Practices for Commit Messages

Use clear, descriptive messages:

```
✅ Good:
"Added new products to catalog"
"Fixed mobile navigation menu"
"Updated checkout form validation"

❌ Bad:
"update"
"changes"
"stuff"
```

---

## 🔧 Troubleshooting

### Issue: Authentication Failed

**Problem**: GitHub asks for password but won't accept it

**Solution**:
1. GitHub requires Personal Access Token (PAT)
2. Create a PAT as described in Step 6 above
3. Use the PAT as your password

### Issue: Deployment Failed

**Problem**: Netlify deployment shows errors

**Solutions**:
1. Check the Deploy logs in Netlify dashboard
2. Ensure `public` folder contains `index.html`
3. Verify file paths are correct (no absolute paths)
4. Check for broken links or missing files

### Issue: Site Not Loading

**Problem**: Netlify site shows 404 or errors

**Solutions**:
1. Verify the Publish directory is set to `public`
2. Check that `index.html` exists in the `public` folder
3. Review Netlify deploy logs for specific errors
4. Ensure JavaScript files are referenced correctly

### Issue: Images Not Loading

**Problem**: Images show as broken

**Solutions**:
1. Check image paths in HTML
2. Use relative paths: `../assets/logo.svg`
3. Verify images exist in the repository
4. Check file names (case-sensitive on Linux)

### Issue: LocalStorage Not Working

**Problem**: Cart or admin data not persisting

**Note**: This is expected on deployed sites
- LocalStorage is browser-specific
- Data is NOT shared between users
- This is a prototype limitation
- For production, you need a backend + database

### Issue: Build Fails

**Problem**: Netlify shows build errors

**Solutions**:
1. Since this is a static site, no build should run
2. Ensure Build command is empty
3. Check Publish directory is `public`

---

## 📊 Deployment Checklist

Before deploying to production:

- [ ] Git installed and configured
- [ ] GitHub repository created
- [ ] Initial commit pushed
- [ ] Netlify account created
- [ ] Netlify connected to GitHub
- [ ] Publish directory set to `public`
- [ ] Branch set to `main`
- [ ] Initial deployment successful
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Images load properly
- [ ] Cart and checkout work
- [ ] Admin panel works
- [ ] Mobile responsive tested
- [ ] HTTPS enabled (if using custom domain)
- [ ] DNS configured (if using custom domain)

---

## 🎯 Next Steps After Deployment

### 1. Test the Live Site

Visit your Netlify URL and test:
- All pages load
- Navigation works
- Cart and checkout
- Admin panel
- Mobile view

### 2. Share the URL

Share your Netlify URL with stakeholders:
- Client: `https://your-site.netlify.app`
- Team: For review and feedback
- Portfolio: For showcasing

### 3. Set Up Analytics

1. Create Google Analytics account
2. Add tracking code to `public/index.html`
3. Verify tracking works

### 4. Monitor Performance

Use Netlify's built-in analytics:
- Bandwidth usage
- Visitor statistics
- Build logs
- Function logs

---

## 📚 Useful Resources

### Git Documentation
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Pro Git Book](https://git-scm.com/book)

### Netlify Documentation
- [Netlify Docs](https://docs.netlify.com/)
- [Netlify Deployments](https://docs.netlify.com/site-deploys/overview)
- [Netlify Domains](https://docs.netlify.com/domains-https/)

### GitHub Documentation
- [GitHub Getting Started](https://docs.github.com/en/get-started)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

---

## 🆘 Support

If you encounter issues:

### Git/GitHub
- GitHub Support: https://support.github.com
- GitHub Community Forum: https://github.community

### Netlify
- Netlify Support: https://www.netlify.com/support
- Netlify Community: https://community.netlify.com

### SARAKI Project
- Email: contact@saraki.ne
- Phone: +227 97 09 33 87
- Address: Niamey, Niger

---

## ✅ Quick Reference Commands

### Git Commands

```bash
# Initialize repository
git init

# Add files
git add .
git add specific-file.html

# Commit changes
git commit -m "Your message"

# Check status
git status

# View changes
git diff

# Push to GitHub
git push

# Pull from GitHub
git pull

# View commit history
git log

# Create new branch
git checkout -b branch-name

# Switch branches
git checkout branch-name

# Merge branch
git merge branch-name
```

### Netlify Commands

No CLI commands needed - use the web dashboard for all operations.

---

**Version**: 1.0  
**Last Updated**: January 2026  
**SARAKI** – Élégance & Fierté du Niger