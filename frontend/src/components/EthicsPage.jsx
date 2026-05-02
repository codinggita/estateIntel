import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Award, Users } from 'lucide-react';
import { SectionWrapper, Heading } from './ui/Layout';
import Card from './ui/Card';

const EthicsPage = () => {
  return (
    <SectionWrapper className="bg-bg">
      <div className="max-w-4xl mx-auto">
        <Heading 
          badge="Ethics & Values"
          subtitle="Our commitment to ethical practices and transparency in real estate."
          centered
        >
          Our Ethical Standards
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
                  <Heart size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text">Customer First</h3>
              </div>
              
              <div className="space-y-4 text-subtext">
                <p>
                  We prioritize our customers' interests above all else. Our success is measured by your satisfaction.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Transparent pricing with no hidden fees</li>
                  <li>Honest property assessments and valuations</li>
                  <li>Clear communication throughout the process</li>
                  <li>Personalized service tailored to your needs</li>
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
                  <Shield size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text">Integrity & Transparency</h3>
              </div>
              
              <div className="space-y-4 text-subtext">
                <p>
                  We conduct business with the highest standards of integrity and transparency.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Accurate and verified property information</li>
                  <li>Full disclosure of all property details</li>
                  <li>No misleading claims or promises</li>
                  <li>Regular audits of our processes</li>
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
                  <Award size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text">Professional Excellence</h3>
              </div>
              
              <div className="space-y-4 text-subtext">
                <p>
                  We maintain the highest professional standards in all our interactions and services.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Continuous training and development</li>
                  <li>Industry best practices</li>
                  <li>Expert knowledge of local markets</li>
                  <li>Commitment to innovation</li>
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
                  <Users size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text">Community Responsibility</h3>
              </div>
              
              <div className="space-y-4 text-subtext">
                <p>
                  We believe in giving back to the communities we serve and building lasting relationships.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Supporting local initiatives</li>
                  <li>Promoting sustainable development</li>
                  <li>Educating first-time buyers</li>
                  <li>Building trust through consistent actions</li>
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
              <h3 className="text-xl font-bold text-text mb-4">Our Commitment</h3>
              <p className="text-subtext mb-4">
                At EstateIntel, we're committed to upholding these ethical standards in everything we do.
              </p>
              <div className="space-y-2 text-subtext">
                <p><strong>Email:</strong> ethics@estateintel.in</p>
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

export default EthicsPage;
