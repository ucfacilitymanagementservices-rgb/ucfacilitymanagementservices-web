import { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitEnquiry } from '../lib/supabase';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'general' | 'career';
  position?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d\s()-]{7,}$/;

export default function EnquiryModal({
  isOpen,
  onClose,
  type = 'general',
  position,
}: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: position ? `Application for ${position}` : '',
  });
  const [errors, setErrors] = useState<{ name?: string; contact?: string; email?: string; phone?: string; message?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined, contact: undefined });
    setSubmitError('');
  };

  const validate = () => {
    const next: typeof errors = {};

    if (!formData.name.trim()) {
      next.name = 'Please enter your name.';
    }

    const hasPhone = formData.phone.trim().length > 0;
    const hasEmail = formData.email.trim().length > 0;

    if (!hasPhone && !hasEmail) {
      next.contact = 'Please provide at least a phone number or email address.';
    }

    if (hasEmail && !EMAIL_REGEX.test(formData.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }

    if (hasPhone && !PHONE_REGEX.test(formData.phone.trim())) {
      next.phone = 'Please enter a valid phone number.';
    }

    if (!formData.message.trim()) {
      next.message = 'Please tell us what you are looking for.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    setIsLoading(true);

    try {
      await submitEnquiry(
        formData.name.trim(),
        formData.phone.trim(),
        formData.email.trim(),
        formData.message.trim(),
        type,
        position
      );

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }, 2500);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setSubmitError('Something went wrong. Please try again or call us at +91 98804 05254.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="glass-modal" onClick={onClose}>
      <div
        className="glass w-full max-w-md mx-4 slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Get in touch with us</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/50 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900">
              Thank you! We'll get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="glass-input"
                placeholder="John Doe"
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="glass-input"
                placeholder="+91 98804 05254"
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="glass-input"
                placeholder="your@email.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {errors.contact && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.contact}
              </p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === 'career' ? 'Why are you interested?' : 'What are you looking for?'} *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="glass-input resize-none"
                placeholder="Tell us more..."
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm flex items-start gap-2">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </button>
            <p className="text-xs text-gray-500 text-center">
              Provide at least a phone number or email so we can reach you.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
