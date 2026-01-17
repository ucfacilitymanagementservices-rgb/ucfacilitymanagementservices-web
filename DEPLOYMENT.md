# Deployment Guide - UCFMS Website

Complete guide for deploying the UCFMS website to Netlify with custom domain www.ucfms.in

## Prerequisites

- [x] Netlify account
- [x] Supabase project
- [x] Custom domain: ucfms.in
- [x] Git repository (GitHub/GitLab/Bitbucket)

## Step-by-Step Deployment

### 1. Netlify Setup

#### Initial Netlify Configuration

1. **Login to Netlify**
   - Go to [https://app.netlify.com](https://app.netlify.com)
   - Sign in with your account

2. **Import Your Repository**
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider (GitHub/GitLab/Bitbucket)
   - Authorize Netlify to access your repositories
   - Select your UCFMS website repository

3. **Configure Build Settings**

   Netlify will auto-detect the settings from `netlify.toml`, but verify:

   ```
   Build command: npx vite build
   Publish directory: dist
   ```

4. **Set Environment Variables**

   Before deploying, add these in Site Settings → Environment Variables:

   ```
   VITE_SUPABASE_URL=https://motiujuiflwefhhnjuum.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_YOUTUBE_API_KEY=your_youtube_api_key
   VITE_YOUTUBE_CHANNEL_ID=your_youtube_channel_id
   ```

   **Important:** These are already configured in your account.

5. **Deploy Site**
   - Click "Deploy site"
   - Wait for the build to complete (usually 1-3 minutes)
   - You'll get a random Netlify subdomain like `random-name-123.netlify.app`

### 2. Custom Domain Configuration

#### Add Custom Domain www.ucfms.in

1. **Add Domain in Netlify**
   - Go to Site Settings → Domain Management
   - Click "Add custom domain"
   - Enter: `www.ucfms.in`
   - Click "Verify"

2. **Configure DNS**

   **Option A: Use Netlify DNS (Recommended)**
   - Netlify will provide nameservers
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Update nameservers to Netlify's nameservers:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```
   - DNS propagation takes 24-48 hours

   **Option B: Use External DNS**
   - Add CNAME record in your DNS provider:
     ```
     Type: CNAME
     Name: www
     Value: your-site-name.netlify.app
     TTL: 3600
     ```
   - Add A record for root domain:
     ```
     Type: A
     Name: @
     Value: 75.2.60.5 (Netlify's load balancer)
     TTL: 3600
     ```

3. **Set Primary Domain**
   - In Netlify → Domain Management
   - Set `www.ucfms.in` as primary domain
   - Enable "Redirect automatically" from non-www to www

4. **Enable HTTPS**
   - Netlify automatically provisions SSL certificate
   - This happens automatically once DNS is configured
   - Force HTTPS redirect in Site Settings → HTTPS

### 3. Supabase Configuration

Your Supabase project is already configured, but here's a verification checklist:

1. **Database Tables**
   - Verify `enquiries` table exists
   - Check Row Level Security policies are enabled

2. **Edge Functions**
   - Verify `send-enquiry-email` function is deployed
   - Test function endpoint

3. **API Keys**
   - Supabase URL: `https://motiujuiflwefhhnjuum.supabase.co`
   - Anon key is set in Netlify environment variables
   - Never expose service role key in frontend

### 4. Automatic Deployments

Once set up, deployments are automatic:

1. **Make Changes Locally**
   ```bash
   # Make your code changes
   git add .
   git commit -m "Description of changes"
   ```

2. **Push to Repository**
   ```bash
   git push origin main
   ```

3. **Automatic Build & Deploy**
   - Netlify detects the push
   - Starts build automatically
   - Deploys to www.ucfms.in
   - Usually completes in 2-3 minutes

4. **Monitor Deployment**
   - Go to Netlify dashboard
   - Click on your site
   - View "Deploys" tab for build logs

### 5. Build Configuration Details

The `netlify.toml` file contains:

```toml
[build]
command = "npx vite build"
publish = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

This ensures:
- Vite builds the project correctly
- Single Page Application routing works
- All routes redirect to index.html (client-side routing)

### 6. Post-Deployment Verification

After deployment, verify:

1. **Website Access**
   - Visit https://www.ucfms.in
   - Check all pages load correctly
   - Test navigation

2. **Forms & Database**
   - Submit contact form
   - Verify data reaches Supabase
   - Check email notifications work

3. **Performance**
   - Run Lighthouse audit
   - Check mobile responsiveness
   - Verify images load properly

4. **SSL Certificate**
   - Verify HTTPS works
   - Check certificate is valid
   - Test automatic redirect from HTTP to HTTPS

### 7. Rollback Procedure

If something goes wrong:

1. **Go to Netlify Dashboard**
   - Click on your site
   - Go to "Deploys" tab

2. **Find Previous Deploy**
   - Find the last working deployment
   - Click "..." menu
   - Select "Publish deploy"

3. **Instant Rollback**
   - Previous version goes live immediately
   - No rebuild required

### 8. Environment-Specific Settings

**Production (www.ucfms.in)**
- Use production Supabase credentials
- Enable all error tracking
- Optimize builds for performance

**Development (Local)**
- Use development environment variables
- Enable source maps
- Hot module replacement active

### 9. Troubleshooting

**Build Fails**
- Check build logs in Netlify
- Verify environment variables are set
- Check `package.json` dependencies
- Run `npm run build` locally first

**Domain Not Working**
- Verify DNS propagation: use [https://dnschecker.org](https://dnschecker.org)
- Check CNAME record is correct
- Wait 24-48 hours for full propagation

**Form Submissions Fail**
- Check Supabase credentials in Netlify
- Verify network requests in browser console
- Check Supabase RLS policies

**Build Time is Slow**
- Normal build time: 2-3 minutes
- Clear Netlify cache if needed
- Check for large dependencies

### 10. Monitoring & Analytics

**Netlify Analytics**
- Site Settings → Analytics
- View traffic and performance
- Monitor build times

**Custom Analytics**
- Add Google Analytics (if needed)
- Add environment variable for GA tracking ID
- Implement in main.tsx

## Important Reminders

### Hosting
- **ONLY Netlify** - No other hosting providers
- All hosting configuration in `netlify.toml`
- Custom domain: www.ucfms.in

### Backend
- **ONLY Supabase** - No other backend services
- Database: PostgreSQL via Supabase
- Authentication: Supabase Auth (if needed)
- Storage: Supabase Storage (if needed)

### Security
- Never commit `.env` file
- Never expose Supabase service role key
- Keep environment variables in Netlify dashboard only
- Use HTTPS everywhere (enforced)

## Quick Deploy Checklist

- [ ] Repository connected to Netlify
- [ ] Build command: `npx vite build`
- [ ] Publish directory: `dist`
- [ ] Environment variables set in Netlify
- [ ] Custom domain www.ucfms.in added
- [ ] DNS configured (CNAME or nameservers)
- [ ] SSL certificate active
- [ ] Automatic deploys enabled
- [ ] Supabase connection working
- [ ] Forms submitting successfully
- [ ] All pages accessible

## Support

For deployment issues:
- Check Netlify status: [https://www.netlifystatus.com](https://www.netlifystatus.com)
- Check Supabase status: [https://status.supabase.com](https://status.supabase.com)
- Review build logs in Netlify dashboard

---

**Deployed on:** Netlify
**Custom Domain:** www.ucfms.in
**Backend:** Supabase
**Last Updated:** 2026-01-12
