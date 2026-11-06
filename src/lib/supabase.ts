import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const submitEnquiry = async (
  name: string,
  phone: string,
  email: string,
  message: string,
  type: 'general' | 'career' = 'general',
  position?: string,
  company?: string,
  service?: string,
) => {
  const { error } = await supabase.from('enquiries').insert([
    {
      name,
      phone,
      email,
      message,
      type,
      position: position || null,
      company: company || null,
      service: service || null,
    },
  ]);

  if (error) throw error;

  try {
    const apiUrl = `${supabaseUrl}/functions/v1/send-enquiry-email`;
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        message,
        type,
        position: position || null,
      }),
    });
  } catch (emailError) {
    console.error('Email notification failed:', emailError);
  }
};

const ACCEPTED_RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_RESUME_SIZE = 5 * 1024 * 1024;

export const validateResumeFile = (file: File): string | null => {
  if (!ACCEPTED_RESUME_TYPES.includes(file.type)) {
    return 'Please upload a PDF or DOC/DOCX file.';
  }
  if (file.size > MAX_RESUME_SIZE) {
    return 'File size must be 5 MB or less.';
  }
  return null;
};

export const submitJobApplication = async (
  fullName: string,
  phone: string,
  email: string,
  position: string,
  city: string,
  experienceYears: number,
  whatsappNumber?: string,
  resumeFile?: File | null,
) => {
  let resumePath: string | null = null;

  if (resumeFile) {
    const fileExt = resumeFile.name.split('.').pop() || 'pdf';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    resumePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(resumePath, resumeFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;
  }

  const { error } = await supabase.from('job_applications').insert([
    {
      full_name: fullName,
      phone,
      email: email || null,
      position,
      city,
      whatsapp_number: whatsappNumber || null,
      experience_years: experienceYears,
      resume_url: resumePath,
    },
  ]);

  if (error) {
    if (resumePath) {
      await supabase.storage.from('resumes').remove([resumePath]);
    }
    throw error;
  }
};
