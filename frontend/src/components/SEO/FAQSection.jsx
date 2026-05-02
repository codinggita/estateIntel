import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Home, Building, DollarSign, MapPin, Search } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      question: "What is EstateIntel and how does it work?",
      answer: "EstateIntel is a leading real estate platform in Ahmedabad, Gujarat that offers verified property listings, luxury homes, apartments for rent, flats for sale, and commercial property. We provide comprehensive property investment opportunities and smart property decisions tools.",
      icon: <Home className="w-5 h-5" />
    },
    {
      question: "How can I buy property online through EstateIntel?",
      answer: "You can buy property online through EstateIntel by browsing our verified property listings, using our advanced search filters to find the perfect property, and connecting with our real estate experts for seamless property purchase transactions in Ahmedabad and Gujarat.",
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      question: "What types of properties are available on EstateIntel?",
      answer: "EstateIntel offers a wide range of properties including luxury homes, apartments for rent, flats for sale, commercial property, affordable housing, and verified property listings across Ahmedabad and Gujarat region.",
      icon: <Building className="w-5 h-5" />
    },
    {
      question: "Is EstateIntel the best property website in Ahmedabad?",
      answer: "EstateIntel is recognized as one of the best property websites in Ahmedabad, offering verified listings, comprehensive property analytics, and expert real estate services to help you make smart property decisions.",
      icon: <Search className="w-5 h-5" />
    },
    {
      question: "How do I find rental properties on EstateIntel?",
      answer: "Finding rental properties on EstateIntel is easy. Use our search filters to browse apartments for rent, set your preferences for location and budget, and contact property owners directly through our platform.",
      icon: <MapPin className="w-5 h-5" />
    },
    {
      question: "What makes EstateIntel different from other real estate platforms?",
      answer: "EstateIntel stands out with verified property listings, advanced property analytics, local expertise in Ahmedabad and Gujarat real estate market, and comprehensive services for both buyers and renters.",
      icon: <Home className="w-5 h-5" />
    },
    {
      question: "Can I find commercial property for investment on EstateIntel?",
      answer: "Yes, EstateIntel specializes in commercial property listings including office spaces, retail spaces, and investment properties across Ahmedabad and Gujarat with detailed analytics and ROI calculations.",
      icon: <Building className="w-5 h-5" />
    },
    {
      question: "How do I know if property listings are verified?",
      answer: "All property listings on EstateIntel undergo a rigorous verification process including document verification, site visits, and legal compliance checks to ensure authentic and reliable property information.",
      icon: <Search className="w-5 h-5" />
    }
  ];

  const [expandedIndex, setExpandedIndex] = React.useState(null);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about EstateIntel, the best real estate platform in Ahmedabad and Gujarat
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-zinc-800 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {faq.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-text pr-2 sm:pr-4">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown 
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-5"
                >
                  <div className="pl-16 sm:pl-20 text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl sm:rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Still have questions about buying property in Ahmedabad?
            </h3>
            <p className="mb-4 sm:mb-6 text-primary/90 text-sm sm:text-base">
              Our real estate experts are here to help you make the best property decisions
            </p>
            <button className="bg-white text-primary px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base">
              Contact Our Experts
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
