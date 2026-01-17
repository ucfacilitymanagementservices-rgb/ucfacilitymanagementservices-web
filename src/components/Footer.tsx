import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram, Briefcase, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/whatsapp_image_2025-12-12_at_10.04.30_am.jpeg"
                alt="UC Facility Management Services"
                className="h-12 w-auto"
              />
              <span
                className="font-bold text-white text-sm"
                style={{
                  fontFamily: 'Georgia, serif',
                  textShadow: '1px 1px 0px rgba(255,255,255,0.2), 2px 2px 0px rgba(0,0,0,0.3)',
                  letterSpacing: '0.3px'
                }}
              >
                UC Facility Management Services
              </span>
            </div>
            <p className="text-blue-100 text-sm">YOU SEE OUR SERVICE</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  On-Demand Services
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-blue-100 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+919880405254" className="hover:text-white transition-colors">
                  +91 98804 05254
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a
                  href="mailto:ucfacilitymanagementservices@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  Email us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Briefcase size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 pt-8">
          <div className="text-center text-blue-100 text-sm">
            <p className="mb-4">
              © 2025 UC Facility Management Services. All rights reserved.
            </p>
            <div className="flex justify-center gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
