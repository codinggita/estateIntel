import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail, FileText, ShieldCheck, CheckCircle, AlertCircle, Home, Wrench, Droplets, Zap } from 'lucide-react';

const InspectionPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: 'apartment',
    propertyAddress: '',
    preferredDate: '',
    preferredTime: 'morning',
    inspectionType: 'standard',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-bg font-sans pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-white/10 rounded-3xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-3xl font-bold text-text mb-4">Inspection Booking Confirmed!</h1>
            <p className="text-lg text-slate-500 mb-8">
              Thank you for booking a property inspection with EstateIntel. Our team will contact you within 24 hours to confirm your appointment.
            </p>
            <div className="bg-slate-50 rounded-2xl p-8 mb-8 text-left max-w-2xl mx-auto">
              <h3 className="font-bold text-text mb-4">Booking Details:</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-slate-400" />
                  <span className="text-slate-600">Preferred Date: {formData.preferredDate || 'To be confirmed'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-slate-400" />
                  <span className="text-slate-600">Preferred Time: {formData.preferredTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-slate-400" />
                  <span className="text-slate-600">Property: {formData.propertyAddress}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-slate-400" />
                  <span className="text-slate-600">Inspection Type: {formData.inspectionType}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg font-sans pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Property Inspection Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 tracking-tight">
            Book Professional Property Inspection
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Our certified civil engineers provide comprehensive 120-point property audits to identify defects, safety issues, and maintenance requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-white/10 rounded-3xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-text mb-6 flex items-center gap-3">
                    <User size={20} className="text-primary" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text placeholder:text-slate-400 focus:outline-none focus:border-primary transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text placeholder:text-slate-400 focus:outline-none focus:border-primary transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-400 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text placeholder:text-slate-400 focus:outline-none focus:border-primary transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Property Details */}
                <div>
                  <h3 className="text-xl font-bold text-text mb-6 flex items-center gap-3">
                    <Home size={20} className="text-primary" />
                    Property Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Property Type *</label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text focus:outline-none focus:border-primary transition-all"
                      >
                        <option value="apartment">Apartment</option>
                        <option value="house">Independent House</option>
                        <option value="villa">Villa</option>
                        <option value="commercial">Commercial Property</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Inspection Type *</label>
                      <select
                        name="inspectionType"
                        value={formData.inspectionType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text focus:outline-none focus:border-primary transition-all"
                      >
                        <option value="standard">Standard Inspection (₹5,999)</option>
                        <option value="premium">Premium Inspection (₹9,999)</option>
                        <option value="comprehensive">Comprehensive Audit (₹14,999)</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-400 mb-2">Property Address *</label>
                    <textarea
                      name="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text placeholder:text-slate-400 focus:outline-none focus:border-primary transition-all resize-none"
                      placeholder="Enter complete property address with city and pincode"
                    />
                  </div>
                </div>

                {/* Scheduling */}
                <div>
                  <h3 className="text-xl font-bold text-text mb-6 flex items-center gap-3">
                    <Calendar size={20} className="text-primary" />
                    Schedule Inspection
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Preferred Date *</label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Preferred Time *</label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text focus:outline-none focus:border-primary transition-all"
                      >
                        <option value="morning">Morning (9 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                        <option value="evening">Evening (4 PM - 7 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Additional Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text placeholder:text-slate-400 focus:outline-none focus:border-primary transition-all resize-none"
                    placeholder="Any specific concerns or areas you'd like us to focus on..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Booking...
                    </>
                  ) : (
                    <>
                      <Calendar size={20} />
                      Book Inspection Now
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* What We Check */}
            <div className="bg-card border border-white/10 rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-text mb-6 flex items-center gap-3">
                <Wrench size={20} className="text-primary" />
                What We Check
              </h3>
              <ul className="space-y-4">
                {[
                  'Structural integrity & cracks',
                  'Water seepage & dampness',
                  'Electrical safety & wiring',
                  'Plumbing & drainage',
                  'Window & door fittings',
                  'Flooring & wall quality',
                  'Ventilation & natural light',
                  'Safety compliance'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-slate-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Info */}
            <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-bold mb-6">Pricing Plans</h3>
              <div className="space-y-4">
                <div className="border-b border-white/20 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Standard</span>
                    <span className="font-bold">₹5,999</span>
                  </div>
                  <p className="text-sm text-white/80">Basic 120-point checklist</p>
                </div>
                <div className="border-b border-white/20 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Premium</span>
                    <span className="font-bold">₹9,999</span>
                  </div>
                  <p className="text-sm text-white/80">Includes thermal imaging</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Comprehensive</span>
                    <span className="font-bold">₹14,999</span>
                  </div>
                  <p className="text-sm text-white/80">Full audit with legal verification</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-slate-50 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-text mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-primary" />
                  <span className="text-sm text-slate-600">+91 8080 555 333</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-primary" />
                  <span className="text-sm text-slate-600">inspect@estateintel.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionPage;
