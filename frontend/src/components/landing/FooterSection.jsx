import React from 'react';
import { Shield, Send, Share2, MessageCircle, Camera, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  return (
    <footer className="pt-24 pb-12 bg-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Shield size={24} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-text">
                estate<span className="text-primary italic">Intel</span>
              </span>
            </Link>
            <p className="text-subtext text-lg max-w-sm leading-relaxed">
              Standardizing property intelligence for the modern homebuyer. Know the reality of every brick before you buy.
            </p>
            <div className="flex gap-4">
              {[Send, Share2, MessageCircle, Camera].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-card border border-white/10 flex items-center justify-center text-subtext hover:text-primary hover:border-primary/50 transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-text">Platform</h4>
            <ul className="space-y-4">
              {['Home', 'Property Map', 'Resources', 'Insights', 'Reports'].map(link => (
                <li key={link}>
                  <a href="#" className="text-subtext hover:text-primary transition-colors text-sm font-semibold">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-text">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service', 'Career'].map(link => (
                <li key={link}>
                  <a href="#" className="text-subtext hover:text-primary transition-colors text-sm font-semibold">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-text">Contact</h4>
            <ul className="space-y-6">
              <li className="flex gap-3 items-start">
                <Mail size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-xs font-bold text-subtext uppercase tracking-widest mb-1">Email</p>
                  <p className="text-sm font-bold text-text">hello@estateintel.in</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Phone size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-xs font-bold text-subtext uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-sm font-bold text-text">+91 22 4567 8900</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold text-subtext">
            © {new Date().getFullYear()} EstateIntel Advisory Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs font-bold text-subtext hover:text-text tracking-widest uppercase">Privacy</a>
            <a href="#" className="text-xs font-bold text-subtext hover:text-text tracking-widest uppercase">Terms</a>
            <a href="#" className="text-xs font-bold text-subtext hover:text-text tracking-widest uppercase">Ethics</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
