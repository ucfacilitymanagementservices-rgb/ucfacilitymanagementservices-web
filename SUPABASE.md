# Supabase Configuration - UCFMS Website

Complete documentation for Supabase backend setup and usage.

## Overview

**Backend Provider:** Supabase (ONLY - No other backend services)

**Supabase Project Details:**
- Project URL: `https://motiujuiflwefhhnjuum.supabase.co`
- Region: Auto-selected optimal region
- Database: PostgreSQL

## Database Schema

### Tables

#### 1. Enquiries Table

Stores all contact form submissions and career applications.

```sql
CREATE TABLE IF NOT EXISTS enquiries (
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

**Columns:**
- `id` - Unique identifier (UUID)
- `name` - Applicant/enquirer name
- `phone` - Contact phone number
- `email` - Contact email address
- `message` - Enquiry message or application details
- `type` - Either 'general' for contact form or 'career' for job applications
- `position` - Job position (only for career type)
- `created_at` - Timestamp of submission

**Row Level Security (RLS):**
- Table is protected with RLS policies
- Public can insert (for form submissions)
- Only authenticated admins can read/update/delete

### Migrations

All database migrations are stored in `supabase/migrations/`.

**Applied Migrations:**
- `20251215141404_create_enquiries_table.sql` - Initial enquiries table creation

To view migration:
```bash
cat supabase/migrations/20251215141404_create_enquiries_table.sql
```

## Edge Functions

### 1. send-enquiry-email

**Purpose:** Sends email notifications when new enquiries are submitted.

**Location:** `supabase/functions/send-enquiry-email/index.ts`

**Trigger:** Called automatically after form submission

**Endpoint:**
```
POST https://motiujuiflwefhhnjuum.supabase.co/functions/v1/send-enquiry-email
```

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "+91 9876543210",
  "email": "john@example.com",
  "message": "I need security services",
  "type": "general",
  "position": null
}
```

**Authentication:** Requires Supabase anon key in Authorization header

## Client Configuration

### Supabase Client Setup

Location: `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Environment Variables

Required in `.env` and Netlify:

```env
VITE_SUPABASE_URL=https://motiujuiflwefhhnjuum.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Security Notes:**
- Only use ANON KEY in frontend (never service role key)
- Environment variables are prefixed with `VITE_` for Vite access
- Keys are injected at build time, not runtime

## Usage Examples

### Submit Contact Form

```typescript
import { submitEnquiry } from './lib/supabase';

const handleSubmit = async () => {
  try {
    await submitEnquiry(
      'John Doe',           // name
      '+91 9876543210',     // phone
      'john@example.com',   // email
      'Need security',      // message
      'general'             // type
    );
    console.log('Enquiry submitted successfully');
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Submit Career Application

```typescript
import { submitEnquiry } from './lib/supabase';

const handleCareerSubmit = async () => {
  try {
    await submitEnquiry(
      'Jane Smith',
      '+91 9876543210',
      'jane@example.com',
      'I am interested in this position',
      'career',
      'Security Guard'  // position
    );
    console.log('Application submitted successfully');
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Direct Database Query

```typescript
import { supabase } from './lib/supabase';

// Fetch all enquiries (requires admin authentication)
const { data, error } = await supabase
  .from('enquiries')
  .select('*')
  .order('created_at', { ascending: false });

if (error) {
  console.error('Error fetching enquiries:', error);
} else {
  console.log('Enquiries:', data);
}
```

## Security

### Row Level Security (RLS)

All tables have RLS enabled for security:

```sql
-- Enable RLS on enquiries table
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for form submissions)
CREATE POLICY "Allow public inserts"
  ON enquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "Authenticated users can read"
  ON enquiries
  FOR SELECT
  TO authenticated
  USING (true);
```

### API Key Security

**Anon Key (Public):**
- Safe to use in frontend code
- Limited permissions via RLS
- Cannot bypass security policies

**Service Role Key (Private):**
- NEVER use in frontend
- Only for backend/server operations
- Full database access
- Keep secret and secure

## Supabase Dashboard

Access your Supabase dashboard:
- URL: [https://app.supabase.com](https://app.supabase.com)
- Project: motiujuiflwefhhnjuum

**Dashboard Features:**
- Table Editor - View and edit data
- SQL Editor - Run custom queries
- Database - Manage schema and migrations
- Authentication - User management (if enabled)
- Storage - File uploads (if needed)
- Edge Functions - Manage serverless functions
- Logs - View function and database logs

## Database Management

### View Data

1. Go to Supabase Dashboard
2. Click "Table Editor"
3. Select "enquiries" table
4. View all submissions

### Run SQL Queries

1. Go to Supabase Dashboard
2. Click "SQL Editor"
3. Write your query:
   ```sql
   SELECT * FROM enquiries
   WHERE type = 'career'
   ORDER BY created_at DESC;
   ```
4. Click "Run"

### Export Data

1. Go to Table Editor
2. Select table
3. Click "..." menu
4. Choose "Download as CSV"

## Backup & Recovery

### Automatic Backups

Supabase automatically backs up your database:
- Daily backups for free tier
- Point-in-time recovery available
- Backups retained for 7 days

### Manual Backup

1. Go to Database → Backups in Supabase Dashboard
2. Click "Create backup"
3. Download backup file if needed

### Restore from Backup

1. Go to Database → Backups
2. Select backup to restore
3. Click "Restore"
4. Confirm restoration

## Monitoring

### Database Logs

View database activity:
1. Go to Logs → Database
2. Filter by error level
3. Monitor query performance

### Function Logs

View edge function logs:
1. Go to Edge Functions
2. Select function
3. View "Logs" tab
4. Monitor invocations and errors

### Performance

Monitor database performance:
- Query execution time
- Connection pooling
- Cache hit rate
- Storage usage

## Troubleshooting

### Connection Issues

**Problem:** Cannot connect to Supabase

**Solutions:**
1. Verify environment variables are set correctly
2. Check Supabase project is active
3. Verify API keys are valid
4. Check network/firewall settings

### RLS Policy Errors

**Problem:** "Row level security policy" error

**Solutions:**
1. Check RLS policies are configured
2. Verify user has proper permissions
3. Test with service role key (backend only)

### Edge Function Failures

**Problem:** Edge function not executing

**Solutions:**
1. Check function logs in dashboard
2. Verify function is deployed
3. Check CORS configuration
4. Verify request payload format

## Best Practices

1. **Never expose service role key** in frontend code
2. **Always use RLS** for data security
3. **Validate input** before inserting to database
4. **Handle errors gracefully** in frontend
5. **Monitor logs regularly** for issues
6. **Keep dependencies updated** (@supabase/supabase-js)
7. **Use prepared statements** to prevent SQL injection
8. **Implement rate limiting** on edge functions
9. **Test locally** before deploying functions
10. **Document schema changes** in migrations

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Edge Functions Guide](https://supabase.com/docs/guides/functions)

---

**Backend:** Supabase ONLY
**Database:** PostgreSQL
**Project:** motiujuiflwefhhnjuum
**Last Updated:** 2026-01-12
