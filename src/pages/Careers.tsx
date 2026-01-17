import { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  Upload,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Clock,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salaryRange?: string;
  description: string;
  requirements: string[];
}

export default function Careers() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    position: '',
    city: '',
    whatsappNumber: '',
    experienceYears: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);

  const jobPositions: JobPosition[] = [
    {
      id: '1',
      title: 'Security Guard',
      department: 'Security Services',
      location: 'Multiple Locations',
      type: 'Full-time',
      experience: '0-2 years',
      salaryRange: '₹15,000 - ₹20,000',
      description: 'Looking for dedicated security personnel to ensure safety and security of client facilities.',
      requirements: [
        'Good physical fitness',
        'Alert and responsible',
        'Basic English & Hindi communication',
        'Willing to work in shifts',
      ],
    },
    {
      id: '2',
      title: 'Housekeeping Staff',
      department: 'Housekeeping Services',
      location: 'Corporate Offices, Bangalore',
      type: 'Full-time',
      experience: '0-1 year',
      salaryRange: '₹12,000 - ₹18,000',
      description: 'Join our housekeeping team to maintain cleanliness and hygiene in premium facilities.',
      requirements: [
        'Attention to detail',
        'Basic cleaning knowledge',
        'Team player',
        'Punctual and reliable',
      ],
    },
    {
      id: '3',
      title: 'Electrical Technician',
      department: 'MEP Services',
      location: 'Bangalore, Hyderabad',
      type: 'Full-time',
      experience: '2-5 years',
      salaryRange: '₹20,000 - ₹35,000',
      description: 'Experienced electrician needed for maintenance and repair of electrical systems.',
      requirements: [
        'ITI/Diploma in Electrical',
        'Hands-on experience',
        'Knowledge of safety standards',
        'Problem-solving skills',
      ],
    },
    {
      id: '4',
      title: 'Mechanical Technician',
      department: 'MEP Services',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '2-5 years',
      salaryRange: '₹20,000 - ₹35,000',
      description: 'Maintain and service mechanical equipment including HVAC, pumps, and DG sets.',
      requirements: [
        'ITI/Diploma in Mechanical',
        'Equipment maintenance experience',
        'Good technical knowledge',
        'Willing to work on-site',
      ],
    },
    {
      id: '5',
      title: 'Facility Supervisor',
      department: 'Operations',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '3-7 years',
      salaryRange: '₹25,000 - ₹40,000',
      description: 'Supervise daily facility operations and manage on-site teams.',
      requirements: [
        'Proven supervisory experience',
        'Good communication skills',
        'Knowledge of facility management',
        'Leadership qualities',
      ],
    },
    {
      id: '6',
      title: 'Fire Safety Officer',
      department: 'Fire Safety',
      location: 'Multiple Locations',
      type: 'Full-time',
      experience: '2-4 years',
      salaryRange: '₹22,000 - ₹32,000',
      description: 'Ensure fire safety compliance and conduct regular safety audits.',
      requirements: [
        'Fire safety certification',
        'Knowledge of fire systems',
        'Training experience',
        'Emergency response skills',
      ],
    },
    {
      id: '7',
      title: 'Front Office Executive',
      department: 'Front Office',
      location: 'Corporate Offices, Bangalore',
      type: 'Full-time',
      experience: '1-3 years',
      salaryRange: '₹18,000 - ₹28,000',
      description: 'Manage reception, visitor management, and provide administrative support.',
      requirements: [
        'Excellent communication skills',
        'Professional appearance',
        'Computer knowledge',
        'Customer service oriented',
      ],
    },
    {
      id: '8',
      title: 'Facility Manager',
      department: 'Operations',
      location: 'Bangalore, Hyderabad',
      type: 'Full-time',
      experience: '5-10 years',
      salaryRange: '₹40,000 - ₹70,000',
      description: 'Lead facility operations, manage teams, and ensure client satisfaction.',
      requirements: [
        'Degree in Engineering/Management',
        'Extensive FM experience',
        'Strong leadership skills',
        'Client relationship management',
      ],
    },
  ];

  const testimonials = [
    {
      text: 'UCFMS provided me with job security and a respectful work culture. The training program helped me grow professionally.',
      author: 'Rajesh Kumar',
      position: 'Security Supervisor',
      years: '3 years',
    },
    {
      text: 'Working with UCFMS has been a great experience. On-time salary, proper training, and growth opportunities.',
      author: 'Priya Singh',
      position: 'Housekeeping Team Leader',
      years: '2 years',
    },
    {
      text: 'The company values its employees and provides a safe working environment. I have learned a lot here.',
      author: 'Arun Verma',
      position: 'Electrical Technician',
      years: '4 years',
    },
  ];

  const faqs = [
    {
      id: 'faq1',
      question: 'Do you provide training?',
      answer: 'Yes, we provide comprehensive training for all positions. New employees undergo orientation and job-specific training before deployment.',
    },
    {
      id: 'faq2',
      question: 'Is experience mandatory?',
      answer: 'Not for all positions. We have entry-level roles for security guards and housekeeping staff. Technical positions require relevant experience.',
    },
    {
      id: 'faq3',
      question: 'How soon is deployment after selection?',
      answer: 'Deployment typically happens within 7-15 days after selection, depending on verification and documentation completion.',
    },
    {
      id: 'faq4',
      question: 'Is salary paid on time?',
      answer: 'Yes, we ensure timely salary payments between 1st-5th of every month. ESIC and PF contributions are also made regularly.',
    },
    {
      id: 'faq5',
      question: 'Do you provide accommodation?',
      answer: 'For certain positions and locations, we provide accommodation support. This is discussed during the interview process.',
    },
    {
      id: 'faq6',
      question: 'What are the working hours?',
      answer: 'Working hours vary by position. Security roles have shift-based schedules (8-12 hours), while other positions follow standard office hours.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
        });
      }

      gsap.utils.toArray('.reveal-on-scroll').forEach((element) => {
        gsap.from(element as Element, {
          scrollTrigger: {
            trigger: element as Element,
            start: 'top 85%',
          },
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: 'power3.out',
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const { error } = await supabase.from('job_applications').insert([
        {
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email || null,
          position: formData.position,
          city: formData.city,
          whatsapp_number: formData.whatsappNumber || null,
          experience_years: formData.experienceYears ? parseInt(formData.experienceYears) : 0,
        },
      ]);

      if (error) throw error;

      setSubmitMessage('Application submitted successfully! We will contact you soon.');
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        position: '',
        city: '',
        whatsappNumber: '',
        experienceYears: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitMessage('Failed to submit application. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/portrait-male-security-guard-with-barbed-wire-fence.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/95 via-[#0a1628]/85 to-[#0a1628]/75" />
        </div>

        <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-block px-6 py-3 bg-emerald-600/20 border border-emerald-500/30 backdrop-blur-lg rounded-full text-emerald-400 text-sm font-semibold mb-8">
            Join Our Team
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Build Your Career with UCFMS
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12">
            Careers in Security, Housekeeping, Technical & Facility Operations
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#positions"
              className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              View Open Positions
              <ArrowRight size={24} />
            </a>
            <a
              href="#apply"
              className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-[#0a1628] transition-all duration-300 hover:scale-105"
            >
              Submit Resume
              <Upload size={24} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Why Work With UCFMS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a company that values its employees and provides growth opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: 'Stable & Growing Company', desc: 'Part of an expanding organization with consistent growth' },
              { icon: CheckCircle, title: 'On-Time Salary Payments', desc: 'Regular salary between 1st-5th of every month' },
              { icon: Award, title: 'Training & Skill Development', desc: 'Comprehensive training programs for career growth' },
              { icon: Shield, title: 'Respect, Safety & Compliance', desc: 'Safe working environment with all legal compliances' },
              { icon: Users, title: 'Career Growth Opportunities', desc: 'Clear promotion paths and internal growth' },
              { icon: Briefcase, title: 'Professional Work Culture', desc: 'Respectful, disciplined, and team-oriented environment' },
            ].map((item, index) => (
              <div
                key={index}
                className="reveal-on-scroll bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <item.icon className="w-16 h-16 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-[#0a1628] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Life at UCFMS
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-white/90 leading-relaxed">
                  At UCFMS, we value discipline, professionalism, and teamwork. Our employees are our strength.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  We believe in creating a work environment where every team member feels valued and respected. From security guards to facility managers, everyone plays a crucial role in our success.
                </p>
                <div className="space-y-4 pt-6">
                  {[
                    'Uniform & ID cards provided',
                    'ESIC & PF benefits',
                    'Regular health & safety training',
                    'Performance recognition programs',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-emerald-400 flex-none" />
                      <span className="text-white text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/whatsapp_image_2025-12-12_at_10.04.30_am.jpeg"
                alt="Life at UCFMS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section id="positions" className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore career opportunities across multiple departments and locations
            </p>
          </div>

          <div className="space-y-6">
            {jobPositions.map((job) => (
              <div
                key={job.id}
                className="reveal-on-scroll bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className="p-8 cursor-pointer"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#0a1628] mb-3">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Briefcase size={18} />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={18} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={18} />
                          <span>{job.type}</span>
                        </div>
                        {job.salaryRange && (
                          <div className="flex items-center gap-2">
                            <DollarSign size={18} />
                            <span>{job.salaryRange}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-700 transition-colors">
                      {expandedJob === job.id ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
                    </button>
                  </div>

                  {expandedJob === job.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in-up">
                      <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>
                      <div className="mb-6">
                        <h4 className="font-semibold text-[#0a1628] mb-3 text-lg">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle size={20} className="text-emerald-600 flex-none mt-0.5" />
                              <span className="text-gray-600">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Experience: {job.experience}</span>
                      </div>
                      <a
                        href="#apply"
                        className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
                      >
                        Apply for this position
                        <ArrowRight size={20} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Simple Hiring Process
            </h2>
            <p className="text-xl text-gray-600">
              From application to deployment in 5 easy steps
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-emerald-600/30 -translate-x-1/2" />

            {[
              { step: '1', title: 'Apply Online / Walk-in', desc: 'Submit your application through our website or visit our office' },
              { step: '2', title: 'Verification & Interview', desc: 'Document verification followed by face-to-face interview' },
              { step: '3', title: 'Training & Orientation', desc: 'Comprehensive training on job responsibilities and safety' },
              { step: '4', title: 'Deployment', desc: 'Assignment to client location with uniform and ID card' },
              { step: '5', title: 'Growth & Promotion', desc: 'Regular performance reviews and promotion opportunities' },
            ].map((item, index) => (
              <div
                key={index}
                className="reveal-on-scroll relative mb-16 last:mb-0"
              >
                <div className="flex items-center gap-8">
                  <div className="flex-none w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg relative z-10">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                    <h3 className="text-2xl font-bold text-[#0a1628] mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-20">
            What Our Employees Say
          </h2>

          <div className="relative min-h-[350px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentTestimonial
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <div className="bg-white/10 backdrop-blur-lg p-12 rounded-2xl border border-white/20">
                  <p className="text-2xl text-white mb-8 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {testimonial.author[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-white">{testimonial.author}</p>
                      <p className="text-emerald-400">{testimonial.position}</p>
                      <p className="text-white/70 text-sm">With UCFMS for {testimonial.years}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-emerald-500 w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Apply Now
            </h2>
            <p className="text-xl text-gray-600">
              Start your career journey with UCFMS
            </p>
          </div>

          <form onSubmit={handleSubmit} className="reveal-on-scroll bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Position Applying For <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                  >
                    <option value="">Select Position</option>
                    {jobPositions.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                    placeholder="Your current city"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                  placeholder="0 for fresher"
                />
              </div>

              {submitMessage && (
                <div
                  className={`p-4 rounded-lg ${
                    submitMessage.includes('success')
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    Submit Application
                    <ArrowRight size={24} />
                  </>
                )}
              </button>

              <div className="text-center pt-6">
                <a
                  href="https://wa.me/918682984264"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                >
                  <Phone size={20} />
                  Or call us directly
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Compliance & Safety
            </h2>
            <p className="text-xl text-gray-600">
              We ensure all legal compliances for our employees
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, text: 'ESIC & PF Compliant' },
              { icon: Shield, text: 'Background Verification' },
              { icon: Award, text: 'Safety Training Provided' },
              { icon: Users, text: 'Uniform & ID Card Issued' },
            ].map((item, index) => (
              <div
                key={index}
                className="reveal-on-scroll bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <item.icon className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <p className="text-lg font-semibold text-[#0a1628]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="reveal-on-scroll bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg font-semibold text-[#0a1628] pr-4">{faq.question}</span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp size={24} className="text-emerald-600 flex-none" />
                  ) : (
                    <ChevronDown size={24} className="text-gray-400 flex-none" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-8 pb-6 animate-fade-in-up">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/1553014001617.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 via-emerald-700/85 to-emerald-800/90" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Your Career. Our Responsibility.
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Join UCFMS and be part of a team that values professionalism, growth, and respect.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#apply"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-emerald-700 text-lg font-bold rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Upload size={24} />
              Apply Now
            </a>
            <a
              href="tel:+918682984264"
              className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-emerald-700 transition-all duration-300 hover:scale-105"
            >
              <Phone size={24} />
              Call HR: +91 86829 84264
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
