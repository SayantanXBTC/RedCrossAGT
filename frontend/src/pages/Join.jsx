import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';

function Join() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    membershipType: 'individual',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    occupation: '',
    interests: [],
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const membershipTypes = [
    {
      type: 'individual',
      title: 'Individual Membership',
      price: '₹500/year',
      benefits: [
        'Official Red Cross membership card',
        'Access to all training programs',
        'Volunteer opportunities',
        'Monthly newsletter',
        'Exclusive member events',
        'Certificate of membership'
      ],
    },
    {
      type: 'family',
      title: 'Family Membership',
      price: '₹1,000/year',
      benefits: [
        'Membership for up to 4 family members',
        'All individual benefits',
        'Family volunteer activities',
        'Priority in blood donation requests',
        'Special family events',
        'Recognition certificate'
      ]
    },
    {
      type: 'corporate',
      title: 'Corporate Membership',
      price: 'Custom',
      benefits: [
        'Corporate social responsibility partnership',
        'Employee volunteer programs',
        'Customized training sessions',
        'Brand visibility at events',
        'CSR impact reports',
        'Recognition as corporate partner'
      ]
    },
  ];

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'fullName':
        if (value.trim().length < 2) {
          error = 'Full name must be at least 2 characters long';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name should only contain letters and spaces';
        }
        break;

      case 'email':
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        if (!value) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address (e.g., name@example.com)';
        }
        break;

      case 'phone':
        const phoneRegex = /^[6-9]\d{9}$/;
        const cleanPhone = value.replace(/[\s\-\+]/g, '');
        if (!value) {
          error = 'Phone number is required';
        } else if (cleanPhone.length !== 10) {
          error = 'Phone number must be 10 digits';
        } else if (!phoneRegex.test(cleanPhone)) {
          error = 'Please enter a valid Indian phone number (10 digits starting with 6-9)';
        }
        break;

      case 'address':
        if (value.trim().length < 10) {
          error = 'Please enter a complete address (at least 10 characters)';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [showPdfDownload, setShowPdfDownload] = useState(false);

  // Function to download PDF receipt
  const downloadPdfReceipt = async () => {
    if (!memberData || !memberData.id) {
      console.error('No member data available for PDF download');
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/members/${memberData.id}/receipt`);
      
      if (response.ok) {
        const blob = await response.blob();
        const filename = `membership-receipt-${memberData.fullName.replace(/\s+/g, '-')}.pdf`;
        saveAs(blob, filename);
        
        // Redirect to Thank You page after successful download
        setTimeout(() => {
          navigate('/thank-you');
        }, 1500); // Small delay to ensure download starts
        
      } else {
        console.error('Failed to download PDF receipt');
        alert('Failed to download receipt. Please try again or contact support.');
      }
    } catch (error) {
      console.error('PDF download error:', error);
      alert('Failed to download receipt. Please try again or contact support.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all required fields before submission
    const errors = {};
    ['fullName', 'email', 'phone', 'address'].forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please correct the errors in the form before submitting' 
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      console.log('Submitting membership data:', formData);
      
      const response = await fetch(`${API_URL}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (data.success) {
        setSubmitStatus({ type: 'success', message: data.message });
        setMemberData(data.data);
        setShowPdfDownload(true);
        
        // Clear form data
        setFormData({
          membershipType: 'individual',
          fullName: '',
          email: '',
          phone: '',
          address: '',
          occupation: '',
          interests: [],
          message: ''
        });
        setFormErrors({});
      } else {
        // Display specific error messages
        let errorMessage = data.message || 'Application failed';
        if (data.errors && data.errors.length > 0) {
          // Handle validation errors from express-validator
          errorMessage = data.errors.map(err => err.message || err).join(', ');
        }
        
        // Check for database connection errors
        if (data.error && data.error.includes('SSL') || data.error && data.error.includes('ECONNREFUSED')) {
          errorMessage = 'Database connection error. Please contact the administrator or try again later.';
        }
        
        setSubmitStatus({ type: 'error', message: errorMessage });
      }
    } catch (error) {
      console.error('Membership application error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Unable to connect to the server. Please check your internet connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src="/images/53.jpeg" 
          alt="Join Us" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-redcross-red/90 via-redcross-red/70 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <h1 className="heading-xl text-white mb-4">Join the Red Cross Family</h1>
            <p className="text-xl text-white max-w-2xl">
              Become a member and support our mission to serve humanity with compassion and dedication.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <SectionReveal>
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-4 border-redcross-red">
                <div className="text-center mb-10">
                  <h2 className="heading-md mb-4">Become a Member</h2>
                  <p className="text-lg text-gray-600">Join the Red Cross family and make a difference in your community</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-redcross-red transition-all ${
                          formErrors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-redcross-red'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.fullName && (
                        <p className="text-red-600 text-sm mt-1">
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-redcross-red transition-all ${
                          formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-redcross-red'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-600 text-sm mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-redcross-red transition-all ${
                          formErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-redcross-red'
                        }`}
                        placeholder="10-digit mobile number"
                      />
                      {formErrors.phone && (
                        <p className="text-red-600 text-sm mt-1">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation</label>
                      <input 
                        type="text" 
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-redcross-red focus:border-redcross-red transition-all"
                        placeholder="Your occupation"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Membership Type *</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {membershipTypes.map((membership) => (
                        <label 
                          key={membership.type}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                            formData.membershipType === membership.type 
                              ? 'border-redcross-red bg-red-50 shadow-md' 
                              : 'border-gray-200 hover:border-redcross-red hover:bg-gray-50'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="membershipType"
                            value={membership.type}
                            checked={formData.membershipType === membership.type}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className="font-semibold text-gray-900 mb-1">{membership.title.replace(' Membership', '')}</div>
                          <div className="text-sm font-bold text-redcross-red">{membership.price}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Complete Address *</label>
                    <textarea 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      required
                      rows="3"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-redcross-red transition-all ${
                        formErrors.address ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-redcross-red'
                      }`}
                      placeholder="Your complete address with city and pin code"
                    ></textarea>
                    {formErrors.address && (
                      <p className="text-red-600 text-sm mt-1">
                        {formErrors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Areas of Interest (Select all that apply)</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Disaster Relief', 'Blood Donation', 'First Aid', 'Community Health', 'Training', 'Youth Programs'].map((interest) => (
                        <label key={interest} className="flex items-center space-x-2 cursor-pointer bg-gray-50 p-3 rounded-lg hover:bg-red-50 transition-all">
                          <input 
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={() => handleInterestChange(interest)}
                            className="w-4 h-4 text-redcross-red border-gray-300 rounded focus:ring-redcross-red"
                          />
                          <span className="text-sm text-gray-700">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Why do you want to join? (Optional)</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-redcross-red focus:border-redcross-red transition-all"
                      placeholder="Tell us about your motivation to join the Red Cross..."
                    ></textarea>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-redcross-red p-6 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Membership Benefits</h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start">
                          <span className="text-redcross-red mr-2">•</span>
                          <span>Official Red Cross membership card</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-redcross-red mr-2">•</span>
                          <span>Access to training programs</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-redcross-red mr-2">•</span>
                          <span>Volunteer opportunities</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-redcross-red mr-2">•</span>
                          <span>Monthly newsletter and updates</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                    <input 
                      type="checkbox" 
                      required
                      className="w-5 h-5 text-redcross-red border-gray-300 rounded focus:ring-redcross-red mt-0.5"
                    />
                    <label className="text-sm text-gray-700">
                      I agree to the terms and conditions and commit to upholding the principles and values of the Red Cross. I understand that membership fees are non-refundable.
                    </label>
                  </div>

                  {submitStatus && (
                    <div className={`p-4 rounded-lg border-2 ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}`}>
                      <p className="font-semibold">{submitStatus.message}</p>
                      
                      {/* PDF Download Button */}
                      {submitStatus.type === 'success' && showPdfDownload && memberData && (
                        <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">Download Your Receipt</h4>
                              <p className="text-sm text-gray-600">
                                Download your membership receipt to complete payment at our office.
                              </p>
                            </div>
                            <button
                              onClick={downloadPdfReceipt}
                              className="bg-redcross-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>Download PDF</span>
                            </button>
                          </div>
                          
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div className="text-sm text-blue-800">
                                <p className="font-medium mb-1">Next Steps:</p>
                                <ul className="list-disc list-inside space-y-1 text-xs">
                                  <li>Download and print your receipt</li>
                                  <li>Visit our office: Red Cross Bhavan, Agartala</li>
                                  <li>Present receipt and complete payment</li>
                                  <li>Office Hours: Mon-Fri, 10 AM - 5 PM</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex justify-center">
                            <button
                              onClick={() => navigate('/thank-you')}
                              className="text-sm text-gray-600 hover:text-redcross-red underline transition-colors"
                            >
                              Continue without downloading →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all shadow-lg"
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Membership Application'}
                  </button>
                </form>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="heading-md mb-4">Membership Benefits</h2>
              <p className="text-body max-w-2xl mx-auto">
                As a Red Cross member, you become part of a global humanitarian network.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Training Access', desc: 'Free or discounted training programs' },
              { title: 'Recognition', desc: 'Certificates and awards for service' },
              { title: 'Stay Informed', desc: 'Regular updates on our activities' },
              { title: 'Network', desc: 'Connect with fellow humanitarians' },
            ].map((benefit, idx) => (
              <SectionReveal key={idx} delay={idx * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-red-50 transition-all duration-300 border-t-4 border-redcross-red">
                  <h3 className="font-semibold text-lg mb-2 text-redcross-red">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-redcross-red text-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-md mb-6">Questions About Membership?</h2>
              <p className="text-xl mb-8 text-red-100">
                Our team is here to help you understand the benefits and responsibilities of Red Cross membership.
              </p>
              <button 
                onClick={() => navigate('/contact')}
                className="bg-white text-redcross-red px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Contact Membership Team
              </button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}

export default Join;
