import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { SectionWrapper, Heading } from './ui/Layout';
import Card from './ui/Card';

const TermsPage = () => {
  return (
    <SectionWrapper className="bg-bg">
      <div className="max-w-4xl mx-auto">
        <Heading 
          badge="Terms of Service"
          subtitle="Please read these terms carefully before using EstateIntel services."
          centered
        >
          Terms & Conditions
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
                  <FileText size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text">Agreement to Terms</h3>
              </div>
              
              <div className="space-y-4 text-subtext">
                <p>
                  By accessing and using EstateIntel, you agree to be bound by these Terms of Service 
                  and all applicable laws and regulations.
                </p>
                <p>
                  If you do not agree with any of these terms, you are prohibited from using or accessing 
                  this site. The materials contained in this website are protected by copyright and trademark law.
                </p>
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
                  <Users size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text">User Responsibilities</h3>
              </div>
              
              <div className="space-y-4 text-subtext">
                <p>As a user of EstateIntel, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Not use the service for any illegal or unauthorized purpose</li>
                  <li>Not interfere with or disrupt the service</li>
                  <li>Respect the intellectual property rights of others</li>
                  <li>Comply with all applicable laws and regulations</li>
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
                  <AlertCircle size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text">Limitation of Liability</h3>
              </div>
              
              <div className="space-y-4 text-subtext">
                <p>
                  In no event shall EstateIntel, nor its directors, employees, partners, agents, suppliers, 
                  or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>
                <p>
                  The information provided on EstateIntel is for general informational purposes only. 
                  We make no warranties about the accuracy or reliability of property information.
                </p>
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
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text">Service Availability</h3>
              </div>
              
              <div className="space-y-4 text-subtext">
                <p>
                  We reserve the right to modify, suspend, or discontinue the service at any time 
                  without prior notice.
                </p>
                <p>
                  We are not liable for any modification, suspension, or discontinuation of the service.
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 bg-card/50 border border-white/5">
              <h3 className="text-xl font-bold text-text mb-4">Contact Information</h3>
              <p className="text-subtext mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="space-y-2 text-subtext">
                <p><strong>Email:</strong> legal@estateintel.in</p>
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

export default TermsPage;
