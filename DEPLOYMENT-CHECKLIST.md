# UCFMS Website Deployment Checklist

Use this checklist to ensure a smooth deployment to Netlify with your custom domain www.ucfms.in.

## Pre-Deployment Checklist

### Repository Setup
- [ ] Code pushed to Git repository (GitHub/GitLab/Bitbucket)
- [ ] All files committed and synced
- [ ] `.env` file is in `.gitignore` (DO NOT commit)
- [ ] `.env.example` file is committed for reference

### Build Verification
- [ ] `npm install` completes successfully
- [ ] `npm run build` completes without errors
- [ ] `npm run typecheck` passes with no errors
- [ ] `npm run lint` passes (optional but recommended)
- [ ] Test locally with `npm run preview`

### Configuration Files
- [ ] `netlify.toml` is configured correctly
- [ ] `public/_redirects` exists for SPA routing
- [ ] `public/CNAME` contains `www.ucfms.in`
- [ ] `package.json` has correct build scripts

## Netlify Setup Checklist

### Account & Site Setup
- [ ] Netlify account created and logged in
- [ ] New site created from Git repository
- [ ] Repository connected and authorized
- [ ] Branch set to `main` (or your default branch)

### Build Settings
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Node version: Auto (or specify if needed)

### Environment Variables
Go to Site Settings → Environment Variables and add:

- [ ] `VITE_SUPABASE_URL` = `https://motiujuiflwefhhnjuum.supabase.co`
- [ ] `VITE_SUPABASE_ANON_KEY` = (your Supabase anon key)
- [ ] `VITE_YOUTUBE_API_KEY` = (your YouTube API key)
- [ ] `VITE_YOUTUBE_CHANNEL_ID` = (your YouTube channel ID)

**Important:** Never commit these values to Git!

## Custom Domain Setup Checklist

### Domain Configuration
- [ ] Domain `www.ucfms.in` added in Netlify
- [ ] Domain verified in Netlify dashboard
- [ ] Primary domain set to `www.ucfms.in`

### DNS Configuration (Choose One)

**Option A: Netlify DNS (Recommended)**
- [ ] Nameservers changed at domain registrar
- [ ] Using Netlify nameservers:
  - dns1.p01.nsone.net
  - dns2.p01.nsone.net
  - dns3.p01.nsone.net
  - dns4.p01.nsone.net
- [ ] DNS propagation complete (check at dnschecker.org)

**Option B: External DNS**
- [ ] CNAME record added: `www` → `your-site.netlify.app`
- [ ] A record added: `@` → `75.2.60.5`
- [ ] DNS propagation complete (check at dnschecker.org)

### SSL/HTTPS
- [ ] SSL certificate provisioned (automatic)
- [ ] HTTPS enabled
- [ ] HTTP to HTTPS redirect enabled
- [ ] Mixed content warnings resolved

## Supabase Checklist

### Database
- [ ] Supabase project is active
- [ ] `enquiries` table exists
- [ ] Row Level Security (RLS) enabled
- [ ] RLS policies configured correctly
- [ ] Test data can be inserted

### Edge Functions
- [ ] `send-enquiry-email` function deployed
- [ ] Function logs show no errors
- [ ] Test function with sample request

### API Keys
- [ ] Supabase URL is correct in environment variables
- [ ] Anon key is correct (not service role key)
- [ ] Keys are set in Netlify, not in code
- [ ] Keys are not committed to repository

## Post-Deployment Checklist

### Website Testing
- [ ] Visit https://www.ucfms.in
- [ ] All pages load correctly
  - [ ] Home page
  - [ ] Services page
  - [ ] About page
  - [ ] Contact page
  - [ ] Careers page
  - [ ] Videos page
- [ ] Navigation works on all pages
- [ ] Images load correctly
- [ ] No console errors in browser

### Form Testing
- [ ] Contact form submits successfully
- [ ] Data appears in Supabase `enquiries` table
- [ ] Email notification is sent (if configured)
- [ ] Career application form works
- [ ] Form validation works correctly
- [ ] Error messages display properly

### Mobile & Responsive Testing
- [ ] Test on mobile device (or browser DevTools)
- [ ] Test on tablet size
- [ ] Test on desktop
- [ ] All breakpoints work correctly
- [ ] Touch interactions work on mobile

### Performance Testing
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Check page load speed
- [ ] Verify images are optimized
- [ ] Check for any performance warnings

### SEO & Metadata
- [ ] Page titles are correct
- [ ] Meta descriptions present
- [ ] Social media preview images work
- [ ] robots.txt allows indexing (if needed)

### Security Testing
- [ ] HTTPS works and is enforced
- [ ] No mixed content warnings
- [ ] Security headers configured (in netlify.toml)
- [ ] No exposed API keys in frontend code
- [ ] RLS policies prevent unauthorized access

## Monitoring Setup

### Netlify Dashboard
- [ ] Bookmark site dashboard for quick access
- [ ] Enable deploy notifications (email/Slack)
- [ ] Check analytics is tracking (if enabled)
- [ ] Review deploy logs for any warnings

### Supabase Dashboard
- [ ] Bookmark project dashboard
- [ ] Check database logs for errors
- [ ] Monitor function invocations
- [ ] Set up database backups (automatic)

## Continuous Deployment

### Automatic Deploys
- [ ] Push to `main` branch triggers auto-deploy
- [ ] Build notifications enabled
- [ ] Deploy previews enabled (optional)
- [ ] Branch deploys configured (optional)

### Rollback Plan
- [ ] Know how to access deploy history
- [ ] Practice rolling back to previous deploy
- [ ] Document rollback procedure for team

## Documentation

### For Team Members
- [ ] README.md is up to date
- [ ] DEPLOYMENT.md contains all instructions
- [ ] SUPABASE.md documents backend setup
- [ ] .env.example shows required variables

### For Future Updates
- [ ] Document any custom configurations
- [ ] Note any third-party services used
- [ ] Keep migration history in supabase/migrations/
- [ ] Update documentation with major changes

## Emergency Contacts

### Service Status Pages
- Netlify Status: https://www.netlifystatus.com
- Supabase Status: https://status.supabase.com

### Support Resources
- Netlify Support: https://support.netlify.com
- Supabase Support: https://supabase.com/support
- Domain Registrar Support: (your registrar)

## Common Issues & Solutions

### Build Fails
- [ ] Check build logs in Netlify
- [ ] Verify environment variables are set
- [ ] Test `npm run build` locally
- [ ] Check for dependency conflicts

### Domain Not Working
- [ ] Wait 24-48 hours for DNS propagation
- [ ] Verify DNS records are correct
- [ ] Clear browser cache
- [ ] Try incognito/private mode

### Form Not Submitting
- [ ] Check browser console for errors
- [ ] Verify Supabase credentials
- [ ] Check RLS policies in Supabase
- [ ] Test API endpoint manually

### SSL Certificate Issues
- [ ] Wait for automatic provisioning (can take 1 hour)
- [ ] Verify DNS is pointing to Netlify
- [ ] Check domain is verified
- [ ] Contact Netlify support if persists

## Sign-Off

**Deployment Date:** _________________

**Deployed By:** _________________

**Verification:**
- [ ] All checklist items completed
- [ ] Website is live at www.ucfms.in
- [ ] All functionality tested and working
- [ ] Team notified of successful deployment

---

**Hosting:** Netlify ONLY
**Backend:** Supabase ONLY
**Domain:** www.ucfms.in
**Status:** Production Ready
