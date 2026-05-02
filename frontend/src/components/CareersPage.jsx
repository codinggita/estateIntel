import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Target, Award, MapPin, Clock } from 'lucide-react';
import { SectionWrapper, Heading } from './ui/Layout';
import Card from './ui/Card';
import Button from './ui/Button';

const CareersPage = () => {
  const openPositions = [
    {
      title: "Senior Real Estate Analyst",
      department: "Analytics",
      location: "Ahmedabad",
      type: "Full-time",
      experience: "3-5 years",
      description: "Analyze property markets, trends, and investment opportunities."
    },
    {
      title: "Frontend Developer",
      department: "Technology",
      location: "Ahmedabad",
      type: "Full-time",
      experience: "2-4 years",
      description: "Build and maintain our web platform with modern React technologies."
    },
    {
      title: "Property Inspector",
      department: "Operations",
      location: "Multiple",
      type: "Field-based",
      experience: "2-3 years",
      description: "Conduct thorough property inspections and generate detailed reports."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Service",
      location: "Ahmedabad",
      type: "Full-time",
      experience: "2-4 years",
      description: "Help customers navigate their property buying journey."
    }
  ];

  return (
    <SectionWrapper className="bg-bg">
      <div className="max-w-6xl mx-auto">
        <Heading 
          badge="Careers"
          subtitle="Join our team and help revolutionize the real estate industry with data-driven insights."
          centered
        >
          Build Your Career at EstateIntel
        </Heading>

        <div className="mt-16 space-y-12">
          {/* Why Join Us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Target size={24} />,
                  title: "Mission-Driven",
                  description: "Help people make smart property decisions with data"
                },
                {
                  icon: <Users size={24} />,
                  title: "Great Team",
                  description: "Work with passionate and talented professionals"
                },
                {
                  icon: <Award size={24} />,
                  title: "Growth Opportunities",
                  description: "Learn and grow in a fast-paced environment"
                },
                {
                  icon: <Briefcase size={24} />,
                  title: "Impact",
                  description: "Make a real difference in the real estate industry"
                }
              ].map((benefit, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2">{benefit.title}</h3>
                  <p className="text-subtext text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Open Positions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-3xl font-bold text-text mb-8 text-center">Open Positions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {openPositions.map((position, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-text mb-2">{position.title}</h4>
                      <p className="text-subtext text-sm mb-4">{position.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-1 text-xs bg-card/50 px-3 py-1 rounded-full border border-white/5">
                      <Briefcase size={12} />
                      <span className="text-subtext">{position.department}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs bg-card/50 px-3 py-1 rounded-full border border-white/5">
                      <MapPin size={12} />
                      <span className="text-subtext">{position.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs bg-card/50 px-3 py-1 rounded-full border border-white/5">
                      <Clock size={12} />
                      <span className="text-subtext">{position.type}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-subtext">
                      <span className="font-semibold">Experience:</span> {position.experience}
                    </div>
                    <Button size="sm" variant="outline">
                      Apply Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Culture Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border border-white/10">
              <h3 className="text-2xl font-bold text-text mb-6 text-center">Our Culture</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Innovation",
                    description: "We encourage creative thinking and new ideas to solve complex problems."
                  },
                  {
                    title: "Collaboration",
                    description: "We believe in teamwork and supporting each other to achieve common goals."
                  },
                  {
                    title: "Excellence",
                    description: "We strive for excellence in everything we do and continuously improve."
                  }
                ].map((value, index) => (
                  <div key={index} className="text-center">
                    <h4 className="text-lg font-bold text-text mb-2">{value.title}</h4>
                    <p className="text-subtext text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 text-center bg-card/50 border border-white/5">
              <h3 className="text-2xl font-bold text-text mb-4">Don't See What You're Looking For?</h3>
              <p className="text-subtext mb-6">
                We're always looking for talented individuals to join our team. Send us your resume 
                and we'll keep you in mind for future opportunities.
              </p>
              <Button className="mx-auto">
                Send Your Resume
              </Button>
              
              <div className="mt-8 text-sm text-subtext">
                <p><strong>Email:</strong> careers@estateintel.in</p>
                <p><strong>Phone:</strong> +91 22 4567 8900</p>
                <p><strong>Address:</strong> 123, Business Bay, Ahmedabad, Gujarat 380001, India</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CareersPage;
