import { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Droplets,
  Zap,
  Building2,
  Trees,
  Bug,
  Dumbbell,
  Flame,
  Users,
  Wrench,
  Home,
  ArrowRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EnquiryModal from '../components/EnquiryModal';

gsap.registerPlugin(ScrollTrigger);

const serviceImages: { [key: string]: string } = {
  'Security Service': '/security.jpeg',
  'Housekeeping': '/gsf-us-cellular_3.3.4.jpg',
  'STP-WTP': '/stp_and_wtp.jpg',
  'DG Set Management': '/slider2.jpg',
  'Lift Maintenance': '/lift.webp',
  'Landscaping': '/landscaping.jpg',
  'Pest Control': '/pest.jpeg',
  'Sump-OHT': '/commercial-water-tank-cleaning-services.jpg',
  'MEP Services': '/mep.png',
  'Fire Safety': '/premium_photo-1683133354908-1759ab01d631.jpeg',
  'Gym Management': '/gym-equipment-maintenance-services.jpg',
  'Front Office': '/11.jpeg',
};

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Shield,
      title: 'Security Service',
      desc: 'You See It, We Secure It.',
      taglines: [
        'At UC Facility Management Services, we secure more than buildings — we secure peace of mind.',
        'From office security to property and facility maintenance, UCFMS delivers reliability you can trust.',
        'Every camera, every corner, every system — professionally monitored and maintained.',
        'Strong security. Smart maintenance. Complete facility solutions.',
      ],
    },
    {
      icon: Users,
      title: 'Housekeeping',
      desc: 'You See It, We Secure It.',
      taglines: [
        'Behind every spotless office is UCFMS.',
        'From floors to ceilings — we secure your workspace.',
        'Clean offices. Smooth operations. Trusted service.',
        'Your workplace, our responsibility.',
      ],
    },
    {
      icon: Droplets,
      title: 'STP-WTP',
      desc: 'Water treatment and purification',
      taglines: [
        'Advanced sewage and water treatment solutions',
        'Eco-friendly and compliant with regulations',
        'Regular maintenance and monitoring',
      ],
    },
    {
      icon: Zap,
      title: 'DG Set Management',
      desc: 'Diesel generator maintenance and operations',
      taglines: [
        'Uninterrupted power backup solutions',
        '24/7 monitoring and preventive maintenance',
        'Fuel management and optimization',
      ],
    },
    {
      icon: Building2,
      title: 'Lift Maintenance',
      desc: 'Elevator installation and upkeep',
      taglines: [
        'Regular inspection and certification',
        'Emergency breakdown services',
        'Safety compliance and upgrades',
      ],
    },
    {
      icon: Trees,
      title: 'Landscaping',
      desc: 'Outdoor maintenance and beautification',
      taglines: [
        'Garden design and maintenance',
        'Seasonal planting and care',
        'Irrigation system management',
      ],
    },
    {
      icon: Bug,
      title: 'Pest Control',
      desc: 'Integrated pest management solutions',
      taglines: [
        'Eco-friendly pest control methods',
        'Regular inspection and treatment',
        'Prevention-focused approach',
      ],
    },
    {
      icon: Home,
      title: 'Sump-OHT',
      desc: 'Water tank maintenance and management',
      taglines: [
        'Sump and overhead tank cleaning',
        'Water quality testing',
        'Leak detection and repair',
      ],
    },
    {
      icon: Wrench,
      title: 'MEP Services',
      desc: 'Mechanical, electrical, and plumbing',
      taglines: [
        'Complete MEP system maintenance',
        'Energy efficiency optimization',
        'Expert technicians on call',
      ],
    },
    {
      icon: Flame,
      title: 'Fire Safety',
      desc: 'Fire safety equipment and training',
      taglines: [
        'Fire alarm systems and extinguishers',
        'Safety audits and compliance',
        'Emergency response training',
      ],
    },
    {
      icon: Dumbbell,
      title: 'Gym Management',
      desc: 'Fitness facility operations',
      taglines: [
        'Equipment maintenance and cleaning',
        'Facility hygiene management',
        'Member safety protocols',
      ],
    },
    {
      icon: Users,
      title: 'Front Office',
      desc: 'Reception and administrative services',
      taglines: [
        'Professional reception services',
        'Visitor management systems',
        'Administrative support',
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          y: 200,
          opacity: 0.3,
        });
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            opacity: 0,
            y: 60,
            rotationX: 15,
            scale: 0.9,
            duration: 0.8,
            ease: 'power3.out',
            delay: (index % 3) * 0.1,
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#1a2844] to-[#0a1628]">
        <div
          ref={parallaxRef}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/3966173/pexels-photo-3966173.jpeg?auto=compress&cs=tinysrgb&w=2000&h=1500&dpr=2)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1628]/50 to-[#0a1628]" />

        <div ref={heroRef} className="relative z-10 text-center max-w-5xl mx-auto px-4 py-20">
          <div className="inline-block px-6 py-3 bg-emerald-600/20 border border-emerald-500/30 backdrop-blur-lg rounded-full text-emerald-400 text-sm font-semibold mb-8">
            Comprehensive Solutions
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Your ultimate goal is smooth operation for our partners
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const imageUrl = serviceImages[service.title];
              return (
                <div
                  key={index}
                  className="service-card group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100"
                >
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 z-10">
                      <div className="w-14 h-14 bg-white/90 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                        {service.title === 'Housekeeping' ? (
                          <img
                            src="/image-removebg-preview_(6).png"
                            alt="Housekeeping"
                            className="w-8 h-8 object-contain"
                          />
                        ) : service.title === 'Security Service' ? (
                          <img
                            src="/image-removebg-preview_(7).png"
                            alt="Security Service"
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <Icon size={28} className="text-emerald-600" />
                        )}
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {index + 1}
                    </div>
                  </div>

                  <div className="p-8 relative">
                    <h3 className="text-2xl font-bold text-[#0a1628] mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 font-medium mb-4 text-lg">{service.desc}</p>

                    {service.taglines && service.taglines.length > 0 && (
                      <div className="mt-6 space-y-3 pt-6 border-t border-gray-200">
                        {service.taglines.slice(0, 3).map((tagline, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm text-gray-600 leading-relaxed">{tagline}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/kitchen-plumbing-repair_wide_01.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 via-emerald-700/85 to-emerald-800/90" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white text-sm font-semibold mb-8">
            Custom Solutions Available
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Need a Specific Service?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            We offer on-demand services tailored to your unique requirements. Let's discuss how we
            can help your facility thrive.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-emerald-700 text-lg font-bold rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Request Custom Service
              <ArrowRight
                size={24}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-emerald-700 transition-all duration-300 hover:scale-105"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
