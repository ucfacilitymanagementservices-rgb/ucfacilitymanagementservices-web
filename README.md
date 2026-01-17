# UC Facility Management Services (UCFMS) Website

Official website for UC Facility Management Services - providing comprehensive security, housekeeping, and facility management solutions.

**Live Site:** [https://www.ucfms.in](https://www.ucfms.in)

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Backend & Database:** Supabase (PostgreSQL)
- **Hosting:** Netlify
- **Icons:** Lucide React

## Features

- Modern, responsive design optimized for all devices
- Service catalog with detailed descriptions
- Contact and enquiry form with database storage
- Career opportunities portal
- Video gallery integration
- Professional security and facility management presentation

## Project Structure

```
ucfms-website/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── EnquiryModal.tsx
│   ├── pages/            # Page components
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Careers.tsx
│   │   └── Videos.tsx
│   ├── lib/              # Utilities and configurations
│   │   └── supabase.ts   # Supabase client setup
│   ├── App.tsx           # Main app component with routing
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── supabase/            # Supabase configuration
│   ├── migrations/      # Database migrations
│   └── functions/       # Edge functions
├── netlify.toml         # Netlify configuration
└── .env                 # Environment variables (not in git)
```

## Environment Variables

This project requires the following environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_YOUTUBE_API_KEY=your_youtube_api_key
VITE_YOUTUBE_CHANNEL_ID=your_youtube_channel_id
```

**Important:** Never commit the `.env` file to version control. It's already in `.gitignore`.

## Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   - Copy `.env.example` to `.env` (if available)
   - Add your Supabase credentials
   - Add YouTube API credentials

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Deployment to Netlify

### Prerequisites
- Netlify account (already configured)
- Supabase project (already configured)
- Custom domain: www.ucfms.in (configured in Netlify)

### Automatic Deployment

This project is configured for automatic deployment to Netlify:

1. **Push to Repository**
   ```bash
   git add .
   git commit -m "your commit message"
   git push origin main
   ```

2. **Netlify Auto-Deploy**
   - Netlify automatically detects the push
   - Runs `npm run build` using the configuration in `netlify.toml`
   - Deploys the `dist` folder to www.ucfms.in

### Environment Variables in Netlify

Environment variables are already configured in your Netlify dashboard:
- Go to Site Settings → Environment Variables
- All `VITE_*` variables are set there
- They are automatically injected during build time

### Custom Domain Configuration

The custom domain **www.ucfms.in** is configured with:
- Primary domain: www.ucfms.in
- DNS managed through Netlify
- HTTPS automatically enabled with Let's Encrypt SSL certificate

## Supabase Backend

### Database
- **Provider:** Supabase (PostgreSQL)
- **Tables:**
  - `enquiries` - Stores contact form submissions
  - Additional tables as per requirements

### Edge Functions
- `send-enquiry-email` - Sends email notifications for new enquiries

### Connection
The Supabase client is configured in `src/lib/supabase.ts` and uses environment variables for secure connection.

## Database Schema

See `supabase/migrations/` for all database migrations and schema definitions.

### Enquiries Table
```sql
- id (uuid, primary key)
- name (text)
- phone (text)
- email (text)
- message (text)
- type (text: 'general' or 'career')
- position (text, nullable)
- created_at (timestamp)
```

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

## Key Features

### Services Offered
- Security Service
- Housekeeping
- STP-WTP (Water Treatment)
- DG Set Management
- Lift Maintenance
- Landscaping
- Pest Control
- Sump-OHT
- MEP Services
- Fire Safety
- Gym Management
- Front Office

### Contact Form
- Integrated with Supabase database
- Email notifications via Edge Function
- Form validation and error handling

### Career Portal
- Job listings
- Application submission
- Database storage of applications

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security

- All sensitive data stored in environment variables
- HTTPS enforced on production domain
- Row Level Security (RLS) enabled on Supabase tables
- Secure API key management

## Hosting Details

**Hosting Provider:** Netlify (ONLY)
- No other hosting providers are used
- Build command: `npx vite build`
- Publish directory: `dist`
- Automatic deploys from git repository

**Backend Provider:** Supabase (ONLY)
- No other backend services are used
- All data persistence through Supabase PostgreSQL
- Authentication handled by Supabase
- Edge functions for serverless operations

## Support

For technical issues or questions:
- Website: www.ucfms.in
- Email: info@ucfms.in

## License

Proprietary - UC Facility Management Services

---

**Built with care for UCFMS** | Hosted on Netlify | Powered by Supabase
