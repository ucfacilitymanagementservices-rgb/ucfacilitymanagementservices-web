/*
  # Create enquiries table for contact form submissions

  1. New Tables
    - `enquiries`
      - `id` (uuid, primary key)
      - `name` (text) - visitor's name
      - `phone` (text) - visitor's phone number
      - `email` (text) - visitor's email address
      - `message` (text) - inquiry message
      - `type` (text) - 'general' or 'career' (for job applications)
      - `position` (text, nullable) - job position applied for
      - `created_at` (timestamp)
      - `status` (text) - 'new' or 'responded'

  2. Security
    - Enable RLS on `enquiries` table
    - Add public policy to allow anyone to submit enquiries
    - Add policy for admin/authenticated users to read all enquiries

  3. Notes
    - Table stores all contact form and job application submissions
    - Public insert access for website visitors
    - Admin access controlled via authenticated users
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'general',
  position text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new'
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enquiries"
  ON enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all enquiries"
  ON enquiries
  FOR SELECT
  TO authenticated
  USING (true);
