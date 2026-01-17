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
  position?: string
) => {
  const { data, error } = await supabase
    .from('enquiries')
    .insert([
      {
        name,
        phone,
        email,
        message,
        type,
        position: position || null,
      },
    ])
    .select();

  if (error) throw error;

  try {
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-enquiry-email`;
    const headers = {
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    };

    await fetch(apiUrl, {
      method: 'POST',
      headers,
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

  return data;
};
