import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Phone, Mail, Shield, CheckCircle, Building2, Users, TrendingUp, Award } from 'lucide-react';
import EnquiryModal from '../components/EnquiryModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const servicesScrollRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: 'Security Service',
      image: '/security.jpeg',
      description: 'Professional security solutions with trained personnel and advanced monitoring systems',
    },
    {
      title: 'Housekeeping',
      image: '/gsf-us-cellular_3.3.4.jpg',
      description: 'Comprehensive cleaning and maintenance services for spotless facilities',
    },
    {
      title: 'STP-WTP',
      image: '/stp_and_wtp.jpg',
      description: 'Water treatment plant management and sewage treatment solutions',
    },
    {
      title: 'DG Set Management',
      image: '/slider2.jpg',
      description: 'Generator maintenance and power backup management services',
    },
    {
      title: 'Lift Maintenance',
      image: '/lift.webp',
      description: 'Elevator servicing and emergency response for vertical transportation',
    },
    {
      title: 'Landscaping',
      image: '/landscaping.jpg',
      description: 'Garden maintenance and outdoor space beautification services',
    },
    {
      title: 'Pest Control',
      image: '/pest.jpeg',
      description: 'Integrated pest management solutions for healthy environments',
    },
    {
      title: 'Sump-OHT',
      image: '/commercial-water-tank-cleaning-services.jpg',
      description: 'Water tank cleaning and maintenance for sump and overhead tanks',
    },
    {
      title: 'MEP Services',
      image: '/mep.png',
      description: 'Mechanical, electrical, and plumbing infrastructure management',
    },
    {
      title: 'Fire Safety',
      image: '/premium_photo-1683133354908-1759ab01d631.jpeg',
      description: 'Fire safety equipment, training, and compliance management',
    },
    {
      title: 'Gym Management',
      image: '/gym-equipment-maintenance-services.jpg',
      description: 'Fitness facility operations, equipment maintenance, and hygiene management',
    },
    {
      title: 'Front Office',
      image: '/11.jpeg',
      description: 'Professional reception and administrative support services',
    },
  ];

  const testimonials = [
    {
      text: 'UCFMS delivers reliable security and maintenance services with professionalism and dedication.',
      author: 'Corporate Office Manager',
      company: 'Tech Solutions India',
    },
    {
      text: 'Outstanding facility management services. Their team is always responsive and professional.',
      author: 'Facility Head',
      company: 'Healthcare Complex',
    },
    {
      text: 'We have seen significant improvement in our facility operations since partnering with UCFMS.',
      author: 'Operations Director',
      company: 'Manufacturing Unit',
    },
  ];

  const industries = [
    { name: 'Corporate Offices', icon: Building2 },
    { name: 'IT Parks', icon: TrendingUp },
    { name: 'Hospitals', icon: Shield },
    { name: 'Residential Societies', icon: Users },
    { name: 'Malls & Retail', icon: Building2 },
    { name: 'Warehouses', icon: Award },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollContainer = servicesScrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;
    let isPaused = false;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (isPaused) return;

        const cardWidth = 450 + 32;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const currentScroll = scrollContainer.scrollLeft;

        if (currentScroll >= maxScroll - 10) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }, 3000);
    };

    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    startAutoScroll();

    return () => {
      clearInterval(scrollInterval);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-[3000ms] ease-out"
          style={{
            backgroundImage: 'url(/common-area-office-clean-shared-office-cleaning.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/90 via-blue-900/80 to-[#0a1628]/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up opacity-0 animation-delay-200">
            You See It, We Secure It
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mb-12 font-light animate-fade-in-up opacity-0 animation-delay-400">
            Complete Facility Management Solutions Under One Roof
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up opacity-0 animation-delay-600"
          >
            <Phone size={24} />
            Enquire Now
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/50 rounded-full animate-scroll-indicator" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll opacity-0">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              About UC Facility Management Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              UC Facility Management Services provides reliable, professional, and technology-driven solutions
              for commercial and residential properties. With years of experience and a commitment to excellence,
              we ensure your facilities operate smoothly and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Shield, title: 'Trusted & Reliable', desc: 'Background verified and trained personnel' },
              { icon: TrendingUp, title: 'Technology-Driven', desc: 'Advanced monitoring and reporting systems' },
              { icon: Award, title: 'Quality Assured', desc: 'Regular audits and quality checks' },
            ].map((item, index) => (
              <div
                key={index}
                className="reveal-on-scroll opacity-0 bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className="w-16 h-16 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-[#0a1628] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0a1628] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Our Services
          </h2>
          <p className="text-xl text-white/70 text-center">
            Comprehensive solutions for all your facility needs
          </p>
        </div>

        <div className="relative">
          <div
            ref={servicesScrollRef}
            className="flex gap-8 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 scroll-smooth snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="flex-none w-[85vw] md:w-[450px] snap-center"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#0a1628] mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] text-center mb-20">
            How We Work
          </h2>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-600/30 -translate-x-1/2" />

            {[
              { step: '1', title: 'Site Inspection', desc: 'Comprehensive assessment of your facility requirements' },
              { step: '2', title: 'Customized Plan', desc: 'Tailored solutions designed for your specific needs' },
              { step: '3', title: 'Skilled Manpower Deployment', desc: 'Trained and verified personnel assigned to your facility' },
              { step: '4', title: 'Daily Monitoring', desc: 'Real-time tracking and management of all operations' },
              { step: '5', title: 'Quality Audits & Reports', desc: 'Regular inspections and detailed performance reports' },
            ].map((item, index) => (
              <div
                key={index}
                className="reveal-on-scroll opacity-0 relative mb-16 last:mb-0"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-8">
                  <div className="flex-none w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg relative z-10">
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

      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] text-center mb-20">
            Industries We Serve
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="reveal-on-scroll opacity-0 bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <industry.icon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#0a1628]">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-screen py-32 bg-gradient-to-b from-white to-gray-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-8">
                Why Choose UCFMS
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We combine expertise, technology, and dedication to deliver exceptional facility management services
                that keep your operations running smoothly.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: CheckCircle, text: 'Trained & Uniformed Staff' },
                { icon: CheckCircle, text: 'Background Verified Personnel' },
                { icon: CheckCircle, text: 'Compliance & Safety Focused' },
                { icon: CheckCircle, text: 'Technology-Driven Reporting' },
                { icon: CheckCircle, text: 'Quick Response Team' },
                { icon: CheckCircle, text: '24/7 Monitoring & Support' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="reveal-on-scroll opacity-0 flex items-center gap-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-x-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <item.icon className="w-8 h-8 text-blue-600 flex-none" />
                  <span className="text-lg font-medium text-[#0a1628]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-20">
            What Our Clients Say
          </h2>

          <div className="relative min-h-[300px]">
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
                  <div className="text-white/80">
                    <p className="font-semibold text-lg">{testimonial.author}</p>
                    <p className="text-blue-400">{testimonial.company}</p>
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
                    ? 'bg-blue-500 w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/685590029eaa5d59e309aa45_communal-areas-cleaning.jpg"
            alt="Professional facility management"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/90 via-blue-900/85 to-[#0a1628]/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Your Facility Deserves Professional Care
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Partner with UCFMS for comprehensive facility management solutions that ensure
            smooth operations, enhanced security, and optimal performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-900 text-lg font-bold rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Phone size={24} />
              Call Now
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-105"
            >
              <Mail size={24} />
              Request a Proposal
            </button>
          </div>
        </div>
      </section>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scroll-indicator {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-scroll-indicator {
          animation: scroll-indicator 1.5s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </div>
  );
}
