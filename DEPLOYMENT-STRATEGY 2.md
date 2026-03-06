# Deployment Strategy & Staging Environment

## ⚠️ CRITICAL RULE
**NEVER DEPLOY TO PRODUCTION WITHOUT EXPLICIT APPROVAL**

---

## 🌐 Environment Structure

### 1. Development (Local)
- **URL**: http://localhost:8000
- **Branch**: `develop`
- **Purpose**: Active development and testing
- **Auto-deploy**: No

### 2. Staging (Netlify)
- **URL**: https://staging-uxmeas.netlify.app
- **Branch**: `staging`
- **Purpose**: Client/stakeholder review
- **Auto-deploy**: Yes (from staging branch)
- **Protection**: Password protected

### 3. Production (Netlify)
- **URL**: https://uxmeas.netlify.app
- **Branch**: `main`
- **Purpose**: Live portfolio
- **Auto-deploy**: NO - Manual only with approval
- **Protection**: Public

---

## 📋 Deployment Workflow

### Step 1: Local Development
```bash
# Work on develop branch
git checkout develop

# Make changes
# Test locally
python3 -m http.server 8000

# Commit changes
git add .
git commit -m "feat: add new case study template"
```

### Step 2: Deploy to Staging
```bash
# Merge to staging branch
git checkout staging
git merge develop

# Push to trigger auto-deploy
git push origin staging

# Staging will auto-deploy to:
# https://staging-uxmeas.netlify.app
```

### Step 3: Review in Staging
- [ ] Visual design review
- [ ] Content accuracy check
- [ ] Mobile responsiveness test
- [ ] Performance audit (Lighthouse)
- [ ] Cross-browser testing
- [ ] Get stakeholder approval

### Step 4: Production Deployment (ONLY WITH APPROVAL)
```bash
# STOP! Do you have explicit approval?
# If NO, do not proceed

# If YES, continue:
git checkout main
git merge staging
git push origin main

# Manual deployment on Netlify:
# 1. Log into Netlify
# 2. Go to uxmeas site
# 3. Manually trigger deploy
# 4. Verify deployment
```

---

## 🔧 Netlify Configuration

### netlify.toml (Updated)
```toml
# Base configuration
[build]
  publish = "."

# Staging environment
[context.staging]
  command = "echo 'Building staging'"
  
  [[headers]]
    for = "/*"
    [headers.values]
      X-Robots-Tag = "noindex, nofollow"
      
  [[redirects]]
    from = "/*"
    to = "/"
    status = 200
    force = true
    conditions = {Role = ["staging"]}

# Production (main branch)
[context.production]
  command = "echo 'Building production'"
  
  [[headers]]
    for = "/*"
    [headers.values]
      X-Frame-Options = "DENY"
      X-Content-Type-Options = "nosniff"
      Referrer-Policy = "strict-origin-when-cross-origin"
      Cache-Control = "public, max-age=31536000, immutable"

# Branch deploys
[context.branch-deploy]
  command = "echo 'Building branch'"

# Deploy previews
[context.deploy-preview]
  command = "echo 'Building preview'"

# Redirects
[[redirects]]
  from = "/resume"
  to = "/public/resume.pdf"
  status = 200

[[redirects]]
  from = "/case-study/*"
  to = "/case-studies/:splat/index.html"
  status = 200

# Headers for performance
[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 🔐 Staging Password Protection

### Enable Password Protection
1. Go to Netlify Dashboard
2. Select staging site
3. Settings → Access control → Password protection
4. Enable and set password
5. Share password with reviewers only

### Staging Access Credentials
```
URL: https://staging-uxmeas.netlify.app
Username: [not required]
Password: [set in Netlify]
```

---

## 🧪 Pre-Deployment Checklist

### Staging Checklist
- [ ] All links working (no 404s)
- [ ] Images optimized and loading
- [ ] Forms functioning (if any)
- [ ] Analytics tracking code present
- [ ] SEO meta tags correct
- [ ] Social sharing images set
- [ ] Favicon displaying
- [ ] Console errors resolved

### Performance Checklist
- [ ] Lighthouse score >90
- [ ] First Contentful Paint <1.5s
- [ ] Time to Interactive <3.5s
- [ ] Cumulative Layout Shift <0.1
- [ ] Images lazy loaded
- [ ] CSS/JS minified

### Content Checklist
- [ ] Spelling and grammar checked
- [ ] Contact information accurate
- [ ] Copyright year current
- [ ] Privacy policy linked (if needed)
- [ ] Resume PDF updated

### Production Approval Required From:
- [ ] You (portfolio owner)
- [ ] Optional: Trusted colleague review
- [ ] Optional: Target audience feedback

---

## 🚀 Quick Commands

### Set Up Staging
```bash
# First time setup
git checkout -b staging
git push -u origin staging

# Configure Netlify
# 1. Add new site from Git
# 2. Connect to staging branch
# 3. Set site name: staging-uxmeas
# 4. Enable password protection
```

### Deploy to Staging
```bash
# Quick deploy to staging
git checkout staging
git merge develop
git push
# Auto-deploys to staging
```

### Emergency Rollback
```bash
# If something goes wrong in production
git checkout main
git revert HEAD
git push

# Or use Netlify's instant rollback:
# Dashboard → Deploys → Select previous → Publish deploy
```

---

## 📊 Monitoring

### Staging Monitoring
- Check build status in Netlify
- Monitor for build failures
- Review deploy previews

### Production Monitoring (After Approval)
- Google Analytics for traffic
- Uptime monitoring
- Performance monitoring
- Error tracking (if implemented)

---

## 🔄 Version Control Strategy

```
main (production - protected)
  ↑
staging (review environment)
  ↑
develop (active development)
  ↑
feature/[feature-name] (feature branches)
```

### Branch Protection Rules
1. **main branch**: 
   - No direct pushes
   - Require approval
   - Must pass staging review

2. **staging branch**:
   - Auto-deploy enabled
   - Merge from develop only
   - Reset after production deploy

3. **develop branch**:
   - Main development branch
   - Feature branches merge here
   - Regular commits allowed

---

## ⛔ What NOT to Do

### Never:
- Push directly to main branch
- Deploy to production without testing in staging
- Skip the staging review process
- Share production credentials publicly
- Deploy on Fridays (unless critical)

### Always:
- Test in staging first
- Get explicit approval for production
- Document what changed
- Have a rollback plan
- Monitor after deployment

---

## 📝 Deployment Log

Keep track of deployments:

```markdown
## Deployment History

### [Date]
- **Environment**: Staging/Production
- **Version**: v1.x.x
- **Changes**: Brief description
- **Approved by**: Name
- **Status**: Success/Failed
- **Notes**: Any issues or observations
```

---

*Remember: The staging environment is your safety net. Use it!*

*NEVER DEPLOY TO PRODUCTION WITHOUT EXPLICIT APPROVAL*

---

*Last Updated: [Current Date]*  
*Next Review: After first deployment cycle*