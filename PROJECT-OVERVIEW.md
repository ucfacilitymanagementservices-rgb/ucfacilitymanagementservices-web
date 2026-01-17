# UCFMS Website - Project Overview

## Quick Summary

**Project:** UC Facility Management Services Website
**Live URL:** https://www.ucfms.in
**Hosting:** Netlify (ONLY)
**Backend:** Supabase (ONLY)
**Status:** Production Ready

## Project Structure

```
ucfms-website/
├── README.md                     # Main project documentation
├── DEPLOYMENT.md                 # Step-by-step deployment guide
├── SUPABASE.md                   # Supabase configuration docs
├── DEPLOYMENT-CHECKLIST.md       # Deployment checklist
├── PROJECT-OVERVIEW.md           # This file
│
├── .env                          # Environment variables (NOT in git)
├── .env.example                  # Example environment variables
├── .gitignore                    # Git ignore rules
├── netlify.toml                  # Netlify configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite build configuration
├── tailwind.config.js            # Tailwind CSS configuration
│
├── public/                       # Static assets
│   ├── CNAME                     # Domain: www.ucfms.in
│   ├── _redirects                # SPA routing configuration
│   └── [images...]               # Service images and assets
│
├── src/                          # Source code
│   ├── main.tsx                  # Application entry point
│   ├── App.tsx                   # Main app with routing
│   ├── index.css                 # Global styles
│   │
│   ├── components/               # Reusable components
│   │   ├── Header.tsx            # Site header with navigation
│   │   ├── Footer.tsx            # Site footer
│   │   └── EnquiryModal.tsx      # Contact/career form modal
│   │
│   ├── pages/                    # Page components
│   │   ├── Home.tsx              # Homepage
│   │   ├── Services.tsx          # Services catalog
│   │   ├── About.tsx             # About UCFMS
│   │   ├── Contact.tsx           # Contact form page
│   │   ├── Careers.tsx           # Job listings
│   │   └── Videos.tsx            # Video gallery
│   │
│   └── lib/                      # Utilities
│       └── supabase.ts           # Supabase client & API
│
└── supabase/                     # Supabase configuration
    ├── migrations/               # Database migrations
    │   └── 20251215141404_create_enquiries_table.sql
    └── functions/                # Edge functions
        └── send-enquiry-email/   # Email notification function
            └── index.ts
```

## Technology Stack

### Frontend
- **Framework:** React 18.3.1
- **Language:** TypeScript 5.5.3
- **Build Tool:** Vite 5.4.2
- **Styling:** Tailwind CSS 3.4.1
- **Routing:** React Router DOM 7.10.1
- **Icons:** Lucide React 0.344.0

### Backend & Database
- **Platform:** Supabase
- **Database:** PostgreSQL (via Supabase)
- **API:** @supabase/supabase-js 2.57.4
- **Functions:** Supabase Edge Functions (Deno runtime)

### Hosting & Deployment
- **Hosting:** Netlify
- **Domain:** www.ucfms.in
- **SSL:** Automatic via Netlify (Let's Encrypt)
- **CI/CD:** Automatic deploy on Git push

## Key Features

### Services Offered (12 Total)
1. Security Service - Professional security solutions
2. Housekeeping - Office cleaning and maintenance
3. STP-WTP - Water treatment plants
4. DG Set Management - Generator maintenance
5. Lift Maintenance - Elevator services
6. Landscaping - Outdoor maintenance
7. Pest Control - Integrated pest management
8. Sump-OHT - Water tank management
9. MEP Services - Mechanical, electrical, plumbing
10. Fire Safety - Safety equipment and training
11. Gym Management - Fitness facility operations
12. Front Office - Reception services

### Core Functionality
- **Responsive Design:** Mobile-first, works on all devices
- **Service Catalog:** Detailed descriptions with images
- **Contact Forms:** Database-backed enquiry system
- **Career Portal:** Job listings and applications
- **Video Gallery:** YouTube integration
- **Professional UI:** Modern, clean, production-ready

## Database Schema

### Enquiries Table
```sql
CREATE TABLE enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('general', 'career')),
  position text,
  created_at timestamptz DEFAULT now()
);
```

**Purpose:** Stores contact form submissions and career applications
**Security:** Row Level Security (RLS) enabled
**Policies:** Public can insert, authenticated users can read

## Environment Variables

Required variables (set in Netlify):

```env
VITE_SUPABASE_URL=https://motiujuiflwefhhnjuum.supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
VITE_YOUTUBE_API_KEY=[your-youtube-key]
VITE_YOUTUBE_CHANNEL_ID=[your-channel-id]
```

**Security:** Never commit `.env` file to Git

## Build & Deploy Process

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run typecheck    # TypeScript type checking
npm run lint         # ESLint code quality check
```

### Automatic Deployment
1. Push code to Git repository
2. Netlify detects push automatically
3. Runs `npm run build`
4. Deploys `dist` folder to www.ucfms.in
5. Usually completes in 2-3 minutes

### Manual Deployment
Not required - use automatic deployment

## Configuration Files

### netlify.toml
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirects configured
- Security headers enabled

### tsconfig.json
- TypeScript configuration
- Strict mode enabled
- Path aliases configured

### vite.config.ts
- React plugin enabled
- Build optimizations
- Development server settings

### tailwind.config.js
- Custom color palette
- Responsive breakpoints
- Typography settings

## API Integration

### Supabase Client
```typescript
import { supabase } from './lib/supabase';

// Submit enquiry
await supabase.from('enquiries').insert({
  name: 'John Doe',
  phone: '+91 9876543210',
  email: 'john@example.com',
  message: 'Need security services',
  type: 'general'
});
```

### Edge Functions
- **send-enquiry-email:** Sends email notifications
- Endpoint: `https://[project].supabase.co/functions/v1/send-enquiry-email`
- Authentication: Supabase anon key required

## Security Implementation

### Frontend Security
- Environment variables for sensitive data
- No hardcoded API keys
- HTTPS enforced everywhere
- Security headers configured

### Database Security
- Row Level Security (RLS) enabled
- Restrictive policies (least privilege)
- Only anon key used in frontend
- Service role key never exposed

### Hosting Security
- SSL certificate automatic
- Security headers in netlify.toml
- HTTPS redirect enabled
- DNSSEC available (if using Netlify DNS)

## Performance Optimization

### Build Optimization
- Code splitting enabled
- Tree shaking for unused code
- Minification and compression
- Lazy loading for routes

### Asset Optimization
- Images optimized for web
- Static assets cached
- Gzip compression enabled
- CDN delivery via Netlify

### Best Practices
- Lighthouse score target: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Mobile-friendly responsive design

## Browser Support

**Supported Browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Mobile Support:**
- iOS Safari
- Chrome Mobile
- Samsung Internet

## Documentation Files

1. **README.md** - Main documentation, getting started guide
2. **DEPLOYMENT.md** - Complete deployment instructions
3. **SUPABASE.md** - Backend and database documentation
4. **DEPLOYMENT-CHECKLIST.md** - Pre/post-deployment checklist
5. **PROJECT-OVERVIEW.md** - This file, project summary

## Important Constraints

### Hosting
- ✅ **ONLY Netlify** - No other hosting providers
- ❌ No Vercel, AWS, Firebase, etc.
- ✅ Custom domain: www.ucfms.in

### Backend
- ✅ **ONLY Supabase** - No other backend services
- ❌ No Firebase, AWS, MongoDB Atlas, etc.
- ✅ PostgreSQL via Supabase

### Deployment
- ✅ Automatic deploys from Git
- ✅ Environment variables in Netlify dashboard
- ✅ SSL automatically managed
- ❌ No manual server configuration

## Next Steps for Production

### Immediate
- [x] Build and test locally
- [x] Push to Git repository
- [ ] Connect to Netlify
- [ ] Configure environment variables
- [ ] Add custom domain www.ucfms.in
- [ ] Verify DNS configuration
- [ ] Test all forms and functionality

### Post-Launch
- [ ] Monitor performance with Lighthouse
- [ ] Set up analytics (Google Analytics)
- [ ] Configure email notifications
- [ ] Set up monitoring alerts
- [ ] Regular database backups
- [ ] Performance optimization
- [ ] SEO optimization

### Ongoing Maintenance
- [ ] Monitor Netlify deploy logs
- [ ] Check Supabase database logs
- [ ] Review form submissions
- [ ] Update dependencies monthly
- [ ] Backup database regularly
- [ ] Monitor uptime and performance

## Support & Resources

### Documentation
- Project docs in repository
- Netlify docs: https://docs.netlify.com
- Supabase docs: https://supabase.com/docs
- React docs: https://react.dev
- Tailwind docs: https://tailwindcss.com

### Status Pages
- Netlify: https://www.netlifystatus.com
- Supabase: https://status.supabase.com

### Community
- Netlify Support: https://support.netlify.com
- Supabase Discord: https://discord.supabase.com
- GitHub Issues: (your repo issues page)

## Version Information

- **Project Version:** 1.0.0
- **Node Version:** 18+ recommended
- **Last Updated:** 2026-01-12
- **Production Status:** Ready for deployment

## Contact

**Website:** www.ucfms.in
**Email:** ucfacilitymanagementservices@gmail.com
**Phone:** +91 98804 05254

---

**Built for:** UC Facility Management Services
**Hosting:** Netlify ONLY
**Backend:** Supabase ONLY
**Domain:** www.ucfms.in
**Status:** ✅ Production Ready
