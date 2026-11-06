/*
# Secure resumes storage bucket — make private, restrict access

## Overview
The resumes bucket was created as public in a previous migration. Resumes contain
personal applicant data and must NOT be publicly accessible. This migration:
1. Sets the bucket to private (public = false)
2. Removes the public read policy
3. Allows anon to upload (applicants submit without signing in)
4. Restricts read access to authenticated (admin) users only

## Security changes
  - Bucket `resumes` set to private (public = false)
  - DROP "Anyone can read resumes" policy (was public read)
  - CREATE "Applicants can upload resumes" — anon+authenticated INSERT only
  - CREATE "Admins can read resumes" — authenticated SELECT only

## Notes
  - Applicants don't need to read files back — only upload them
  - Admins access resumes via the Supabase dashboard or signed URLs from backend
  - The resume_url stored in job_applications is the internal storage path, not a public URL
*/