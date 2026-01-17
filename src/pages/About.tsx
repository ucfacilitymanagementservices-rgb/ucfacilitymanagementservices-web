import { useEffect, useRef } from 'react';
import { Shield, TrendingUp, Award, Target, Heart, Lightbulb, Users as UsersIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
          scale: 0.8,
          opacity: 0,
          rotation: -5,
        });
      }

      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
          },
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
        });
      }

      if (valuesRef.current) {
        gsap.from(valuesRef.current.children, {
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 70%',
          },
          opacity: 0,
          scale: 0.8,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: 'back.out(1.7)',
        });
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.mission-card');
        cards.forEach((card) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
            opacity: 0,
            x: -50,
            rotationY: -15,
            duration: 1,
            ease: 'power3.out',
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#0a1628] via-[#1a2844] to-[#0a1628] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/portrait-male-security-guard-with-barbed-wire-fence.jpg)',
              backgroundAttachment: 'fixed',
            }}
          />
        </div>

        <div ref={heroRef} className="relative z-10 text-center max-w-4xl mx-auto px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
            Building trust through excellence in facility management
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={imageRef} className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl opacity-20 blur-2xl" />
              <div className="relative w-80 h-80 mx-auto rounded-3xl overflow-hidden border-8 border-emerald-100 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="/whatsapp_image_2025-12-18_at_8.04.42_pm.jpeg"
                  alt="Founder CHITHAMBARASELVAN"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                <Award className="w-16 h-16 text-white" />
              </div>
            </div>

            <div ref={contentRef}>
              <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
                Meet Our Founder
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-4">
                CHITHAMBARASELVAN
              </h2>
              <p className="text-xl font-semibold text-emerald-600 mb-8">
                Founder & CEO, UC Facility Management Services
              </p>

              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  With a passion for excellence and a commitment to quality service delivery,
                  CHITHAMBARASELVAN founded UC Facility Management Services to revolutionize the
                  facility management industry.
                </p>
                <p>
                  Our vision is to provide comprehensive, professional, and reliable facility
                  management solutions that empower businesses to focus on their core operations
                  while we take care of their facility needs.
                </p>
                <p>
                  We believe that exceptional facility management is the backbone of operational
                  excellence, and we are dedicated to delivering nothing but the best to our
                  partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driven by purpose, guided by values
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="mission-card group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full" />
              <Target className="w-16 h-16 text-emerald-600 mb-6 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-[#0a1628] mb-4 relative z-10">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed relative z-10">
                To deliver superior facility management services that enhance the value of our
                partners' assets and operations through innovation, dedication, and excellence.
              </p>
            </div>

            <div className="mission-card group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
              <Lightbulb className="w-16 h-16 text-blue-600 mb-6 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-[#0a1628] mb-4 relative z-10">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed relative z-10">
                To be the most trusted and innovative facility management service provider,
                setting industry standards for quality, reliability, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The principles that drive everything we do
            </p>
          </div>

          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Excellence',
                desc: 'Delivering top-quality services that exceed expectations every single time',
                color: 'emerald',
              },
              {
                icon: Heart,
                title: 'Integrity',
                desc: 'Building lasting trust through honesty, transparency, and ethical practices',
                color: 'blue',
              },
              {
                icon: TrendingUp,
                title: 'Innovation',
                desc: 'Continuously improving solutions with cutting-edge technology and methods',
                color: 'purple',
              },
              {
                icon: UsersIcon,
                title: 'Partnership',
                desc: 'Growing together with clients through collaboration and mutual success',
                color: 'orange',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-${value.color}-600 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-6">
              Our Location
            </h2>
            <p className="text-xl text-gray-600">
              Serving excellence from the heart of Bangalore
            </p>
          </div>

          <div className="relative bg-white rounded-3xl shadow-2xl p-12 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500" />
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-200 rounded-full filter blur-3xl opacity-30" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-200 rounded-full filter blur-3xl opacity-30" />

            <div className="relative z-10">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-emerald-600" />
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We are looking for our Head office at Bangalore city or exploring good office space options in prime locations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Being strategically located in Bangalore, we serve businesses across the city with world-class facility management solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
