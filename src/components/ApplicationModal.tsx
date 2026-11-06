import { useState, useRef } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Upload, FileText } from 'lucide-react';
import { submitJobApplication, validateResumeFile } from '../lib/supabase';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  position?: string;
  availablePositions: string[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d\s()-]{7,}$/;

export default function ApplicationModal({
  isOpen,
  onClose,
  position: initialPosition,
  availablePositions,
}: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    position: initialPosition || '',
    city: '',
    whatsappNumber: '',
    experienceYears: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSubmitError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setResumeError('');

    if (file) {
      const err = validateResumeFile(file);
      if (err) {
        setResumeError(err);
        setResumeFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
    }
    setResumeFile(file);
  };

  const validate = () => {
    const next: Record<string, string> = {};

    if (!formData.fullName.trim()) next.fullName = 'Please enter your full name.';
    if (!formData.email.trim()) next.email = 'Please enter your email.';
    else if (!EMAIL_REGEX.test(formData.email.trim())) next.email = 'Please enter a valid email address.';
    if (!formData.phone.trim()) next.phone = 'Please enter your phone number.';
    else if (!PHONE_REGEX.test(formData.phone.trim())) next.phone = 'Please enter a valid phone number.';
    if (!formData.position.trim()) next.position = 'Please select a position.';
    if (!formData.city.trim()) next.city = 'Please enter your city.';
    if (!resumeFile) next.resume = 'Please upload your resume (PDF or DOC/DOCX, max 5 MB).';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    setIsLoading(true);

    try {
      await submitJobApplication(
        formData.fullName.trim(),
        formData.phone.trim(),
        formData.email.trim(),
        formData.position,
        formData.city.trim(),
        formData.experienceYears ? parseInt(formData.experienceYears) : 0,
        formData.whatsappNumber || undefined,
        resumeFile,
      );

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          position: '',
          city: '',
          whatsappNumber: '',
          experienceYears: '',
        });
        setResumeFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }, 2500);
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError('Failed to submit application. Please try again or call us at +91 86829 84264.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="glass-modal" onClick={onClose}>
      <div
        className="glass w-full max-w-lg mx-4 slide-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white/80 backdrop-blur-md pb-4 z-10">
          <h2 className="text-2xl font-bold text-gray-900">Apply for a Position</h2>
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
              Thank you for applying to UCFMS. Your application has been submitted successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="glass-input"
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="10-digit mobile number"
                />
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position Applied For *
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="glass-input"
                >
                  <option value="">Select Position</option>
                  {availablePositions.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
                {errors.position && <p className="text-red-600 text-sm mt-1">{errors.position}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="Your current city"
                />
                {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="experienceYears"
                  min="0"
                  max="50"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="0 for fresher"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume * <span className="text-gray-500 font-normal">(PDF or DOC/DOCX, max 5 MB)</span>
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="glass-input cursor-pointer flex items-center gap-3 hover:bg-white/70 transition-colors"
              >
                {resumeFile ? (
                  <>
                    <FileText size={20} className="text-emerald-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 truncate">{resumeFile.name}</span>
                  </>
                ) : (
                  <>
                    <Upload size={20} className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-500">Click to choose a file</span>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
              />
              {resumeError && <p className="text-red-600 text-sm mt-1">{resumeError}</p>}
              {errors.resume && <p className="text-red-600 text-sm mt-1">{errors.resume}</p>}
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
                'Submit Application'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
