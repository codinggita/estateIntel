import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { SectionWrapper, Heading } from './ui/Layout';
import Card from './ui/Card';
import Button from './ui/Button';

const ContactPage = () => {
  return (
    <SectionWrapper className="bg-bg">
      <div className="max-w-4xl mx-auto">
        <Heading 
          badge="Contact Us"
          subtitle="Get in touch with our real estate experts for personalized assistance"
          centered
        >
          Connect with EstateIntel
        </Heading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 text-text">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text mb-1">Email</h4>
                    <p className="text-subtext">hello@estateintel.in</p>
                    <p className="text-subtext text-sm">support@estateintel.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text mb-1">Phone</h4>
                    <p className="text-subtext">+91 22 4567 8900</p>
                    <p className="text-subtext text-sm">Mon-Fri: 9AM-6PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text mb-1">Office</h4>
                    <p className="text-subtext">
                      123, Business Bay,<br />
                      Ahmedabad, Gujarat 380001<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-card/50 rounded-xl border border-white/5">
                <h4 className="font-semibold text-text mb-3">Response Time</h4>
                <p className="text-subtext text-sm">
                  We typically respond to inquiries within 24 hours during business days.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 text-text">Send us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-text mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 bg-card border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-text transition-all"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-text mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 bg-card border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-text transition-all"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-text mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-card border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-text transition-all"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-text mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 bg-card border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-text transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-text mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 bg-card border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-text transition-all"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="property-inquiry">Property Inquiry</option>
                    <option value="general-support">General Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-text mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-card border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-text transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 rounded-2xl group"
                >
                  <Send size={20} className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactPage;
