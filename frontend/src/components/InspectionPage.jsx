import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Calendar, Clock, MapPin, User, Phone, Mail, FileText, ShieldCheck, CheckCircle, AlertCircle, Home, Wrench, Droplets, Zap } from 'lucide-react';

// Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9+\s()-]+$/, 'Phone number can only contain numbers, spaces, and symbols')
    .min(10, 'Phone number must be at least 10 digits'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  propertyType: Yup.string()
    .required('Property type is required')
    .oneOf(['apartment', 'house', 'villa', 'commercial', 'shop', 'office', 'warehouse', 'factory', 'land'], 'Invalid property type'),
  propertyAddress: Yup.string()
    .required('Property address is required')
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must be less than 200 characters'),
  preferredDate: Yup.string()
    .required('Preferred date is required')
    .test('future-date', 'Date must be in the future', function(value) {
      return new Date(value) > new Date();
    }),
  preferredTime: Yup.string()
    .required('Preferred time is required')
    .oneOf(['morning', 'afternoon', 'evening'], 'Invalid time preference'),
  inspectionType: Yup.string()
    .required('Inspection type is required')
    .oneOf(['standard', 'premium', 'comprehensive'], 'Invalid inspection type'),
  message: Yup.string()
    .max(500, 'Message must be less than 500 characters')
});

const InspectionPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const initialValues = {
    name: '',
    phone: '',
    email: '',
    propertyType: 'apartment',
    propertyAddress: '',
    preferredDate: '',
    preferredTime: 'morning',
    inspectionType: 'standard',
    message: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/inspection/book', values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 201) {
        setIsSubmitted(true);
        // Store booking details for confirmation page
        localStorage.setItem('lastBooking', JSON.stringify(response.data.inspection));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book inspection. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (isSubmitted) {
    // Get stored booking details
    const bookingDetails = JSON.parse(localStorage.getItem('lastBooking') || '{}');
    
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
                  <span className="text-slate-600">Preferred Date: {bookingDetails.preferredDate || formData.preferredDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-slate-400" />
                  <span className="text-slate-600">Preferred Time: {bookingDetails.preferredTime || formData.preferredTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-slate-400" />
                  <span className="text-slate-600">Property: {bookingDetails.propertyAddress || formData.propertyAddress}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-slate-400" />
                  <span className="text-slate-600">Inspection Type: {bookingDetails.inspectionType || formData.inspectionType}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User size={18} className="text-slate-400" />
                  <span className="text-slate-600">Booking ID: {bookingDetails.id || 'Pending'}</span>
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
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <AlertCircle size={20} className="text-red-600" />
                    <span className="text-red-700 font-medium">{error}</span>
                  </div>
                </div>
              )}
              
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-xl font-bold text-text mb-6 flex items-center gap-3">
                        <User size={20} className="text-primary" />
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">Full Name *</label>
                          <Field
                            type="text"
                            name="name"
                            className={`w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text placeholder:text-slate-400 focus:outline-none focus:border-primary transition-all ${
                              errors.name && touched.name ? 'border-red-500' : ''
                            }`}
                            placeholder="John Doe"
                          />
                          <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number *</label>
                          <Field
                            type="tel"
                            name="phone"
                            className={`w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text placeholder:text-slate-400 focus:outline-none focus:border-primary transition-all ${
                              errors.phone && touched.phone ? 'border-red-500' : ''
                            }`}
                            placeholder="+91 98765 43210"
                          />
                          <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-slate-400 mb-2">Email Address *</label>
                        <Field
                          type="email"
                          name="email"
                          className={`w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text placeholder:text-slate-400 focus:outline-none focus:border-primary transition-all ${
                            errors.email && touched.email ? 'border-red-500' : ''
                          }`}
                          placeholder="john@example.com"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
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
                          <Field
                            as="select"
                            name="propertyType"
                            className={`w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text focus:outline-none focus:border-primary transition-all ${
                              errors.propertyType && touched.propertyType ? 'border-red-500' : ''
                            }`}
                          >
                            <option value="apartment">Apartment</option>
                            <option value="house">Independent House</option>
                            <option value="villa">Villa</option>
                            <option value="commercial">Commercial Property</option>
                            <option value="shop">Shop/Retail Space</option>
                            <option value="office">Office Space</option>
                            <option value="warehouse">Warehouse/Godown</option>
                            <option value="factory">Factory/Industrial</option>
                            <option value="land">Land/Plot</option>
                          </Field>
                          <ErrorMessage name="propertyType" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">Inspection Type *</label>
                          <Field
                            as="select"
                            name="inspectionType"
                            className={`w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text focus:outline-none focus:border-primary transition-all ${
                              errors.inspectionType && touched.inspectionType ? 'border-red-500' : ''
                            }`}
                          >
                            <option value="standard">Standard Inspection (₹5,999)</option>
                            <option value="premium">Premium Inspection (₹9,999)</option>
                            <option value="comprehensive">Comprehensive Audit (₹14,999)</option>
                          </Field>
                          <ErrorMessage name="inspectionType" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-slate-400 mb-2">Property Address *</label>
                        <Field
                          as="textarea"
                          name="propertyAddress"
                          rows={3}
                          className={`w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text placeholder:text-slate-400 focus:outline-none focus:border-primary transition-all resize-none ${
                            errors.propertyAddress && touched.propertyAddress ? 'border-red-500' : ''
                          }`}
                          placeholder="Enter complete property address with city and pincode"
                        />
                        <ErrorMessage name="propertyAddress" component="div" className="text-red-500 text-sm mt-1" />
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
                          <Field
                            type="date"
                            name="preferredDate"
                            min={new Date().toISOString().split('T')[0]}
                            className={`w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text focus:outline-none focus:border-primary transition-all ${
                              errors.preferredDate && touched.preferredDate ? 'border-red-500' : ''
                            }`}
                          />
                          <ErrorMessage name="preferredDate" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">Preferred Time *</label>
                          <Field
                            as="select"
                            name="preferredTime"
                            className={`w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text focus:outline-none focus:border-primary transition-all ${
                              errors.preferredTime && touched.preferredTime ? 'border-red-500' : ''
                            }`}
                          >
                            <option value="morning">Morning (9 AM - 12 PM)</option>
                            <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                            <option value="evening">Evening (4 PM - 7 PM)</option>
                          </Field>
                          <ErrorMessage name="preferredTime" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Additional Message */}
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Additional Message (Optional)</label>
                      <Field
                        as="textarea"
                        name="message"
                        rows={4}
                        className={`w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-text placeholder:text-slate-400 focus:outline-none focus:border-primary transition-all resize-none ${
                          errors.message && touched.message ? 'border-red-500' : ''
                        }`}
                        placeholder="Any specific concerns or areas you'd like us to focus on..."
                      />
                      <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
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
                  </Form>
                )}
              </Formik>
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
