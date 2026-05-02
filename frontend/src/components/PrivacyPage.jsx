import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database } from 'lucide-react';
import { SectionWrapper, Heading } from './ui/Layout';
import Card from './ui/Card';

const PrivacyPage = () => {
  return (
    <SectionWrapper className="bg-bg">
      <div className="max-w-4xl mx-auto">
        <Heading 
          badge="Privacy Policy"
          subtitle="Your privacy is important to us. Learn how we collect, use, and protect your information."
          centered
        >
          Privacy & Data Protection
        </Heading>

        <div className="mt-16 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Shield size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text">Information We Collect</h3>
              </div>
              
              <div className="space-y-4 text-subtext">
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  use our services, or contact us for support.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name, email address, and contact information</li>
                  <li>Property preferences and search history</li>
                  <li>Usage data and analytics information</li>
                  <li>Device and browser information</li>
                </ul>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Database size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text">How We Use Your Information</h3>
              </div>
              
              <div className="space-y-4 text-subtext">
                <p>
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To provide personalized property recommendations</li>
                  <li>To process transactions and send confirmations</li>
                  <li>To communicate with you about our services</li>
                  <li>To analyze usage patterns to improve our platform</li>
                  <li>To ensure security and prevent fraud</li>
                </ul>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Lock size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text">Data Security</h3>
              </div>
              
              <div className="space-y-4 text-subtext">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal data:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL encryption for all data transmissions</li>
                  <li>Secure servers with regular security updates</li>
                  <li>Access controls and authentication systems</li>
                  <li>Regular security audits and penetration testing</li>
                </ul>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Eye size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text">Your Rights</h3>
              </div>
              
              <div className="space-y-4 text-subtext">
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and personal data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your data</li>
                  <li>Object to processing of your data</li>
                </ul>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 bg-card/50 border border-white/5">
              <h3 className="text-xl font-bold text-text mb-4">Contact Us</h3>
              <p className="text-subtext mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="space-y-2 text-subtext">
                <p><strong>Email:</strong> privacy@estateintel.in</p>
                <p><strong>Phone:</strong> +91 22 4567 8900</p>
                <p><strong>Address:</strong> 123, Business Bay, Ahmedabad, Gujarat 380001, India</p>
              </div>
              <div className="mt-6 text-sm text-subtext">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default PrivacyPage;
