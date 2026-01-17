/*
  # Create job applications table

  ## Overview
  This migration creates a table to store job applications submitted through the careers page.

  ## New Tables
    - `job_applications`
      - `id` (uuid, primary key) - Unique identifier for each application
      - `full_name` (text) - Applicant's full name
      - `phone` (text) - Contact phone number
      - `email` (text) - Contact email address
      - `position` (text) - Position applying for
      - `city` (text) - Current city/location
      - `whatsapp_number` (text, optional) - WhatsApp contact number
      - `resume_url` (text, optional) - URL to uploaded resume file
      - `experience_years` (integer, optional) - Years of experience
      - `status` (text) - Application status (new, reviewed, shortlisted, rejected)
      - `created_at` (timestamptz) - Timestamp of application submission
      - `updated_at` (timestamptz) - Timestamp of last update

  ## Security
    - Enable RLS on `job_applications` table
    - Add policy for public to insert applications
    - Add policy for authenticated admin users to view/update applications

  ## Notes
    - Default status is 'new' for all new applications
    - Resume uploads will be stored in Supabase Storage
    - Updated timestamp automatically updates on row modification
*/

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  position text NOT NULL,
  city text NOT NULL,
  whatsapp_number text,
  resume_url text,
  experience_years integer DEFAULT 0,
  status text DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'shortlisted', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit job applications"
  ON job_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all applications"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update applications"
  ON job_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();