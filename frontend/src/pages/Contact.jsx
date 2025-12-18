import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';

function Contact() {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'subject':
        return value.trim().length < 3 ? 'Subject must be at least 3 characters' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : '';
      case 'phone':
        if (value && value.trim()) {
          const phoneRegex = /^[0-9]{10}$/;
          return !phoneRegex.test(value.replace(/\D/g, '')) ? 'Please enter a valid 10-digit phone number' : '';
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validate all fields before submission
    const errors = {};
    Object.keys(contactForm).forEach(key => {
      if (['name', 'email', 'subject', 'message'].includes(key)) {
        const error = validateField(key, contactForm[key]);
        if (error) errors[key] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please correct the errors in the form before submitting' 
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ type: 'success', message: data.message });
        setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
        setFormErrors({});
        
        // Redirect to Thank You page after successful submission
        setTimeout(() => {
          navigate('/thank-you');
        }, 2000);
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to send message' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again or contact us directly.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img 
          src="/images/60.jpeg" 
          alt="Contact Us" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <h1 className="heading-xl text-white mb-4">Contact Us</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Indian Red Cross Society - Tripura State Branch
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <SectionReveal>
            <div className="bg-gray-50 rounded-2xl p-12 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                      <a href="tel:+919774137698" className="text-2xl text-redcross-red hover:underline font-semibold">
                        +91-97741 37698
                      </a>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Red Cross Bhavan<br />
                        Agartala, Tripura 799001<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Office Timings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-300">
                      <span className="font-semibold text-gray-900">Monday to Friday</span>
                      <span className="text-gray-700">10:00 AM – 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-300">
                      <span className="font-semibold text-gray-900">Saturday</span>
                      <span className="text-gray-700">Closed</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-semibold text-gray-900">Sunday</span>
                      <span className="text-gray-700">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have a question or want to get involved? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-redcross-red transition-all ${
                        formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-redcross-red'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-red-600 text-sm mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-redcross-red transition-all ${
                        formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-redcross-red'
                      }`}
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
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="10-digit mobile number"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-redcross-red transition-all ${
                        formErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-redcross-red'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-red-600 text-sm mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="What is this regarding?"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-redcross-red transition-all ${
                        formErrors.subject ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-redcross-red'
                      }`}
                    />
                    {formErrors.subject && (
                      <p className="text-red-600 text-sm mt-1">
                        {formErrors.subject}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    rows="5"
                    placeholder="Tell us how we can help you or how you'd like to get involved..."
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-redcross-red transition-all resize-none ${
                      formErrors.message ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-redcross-red'
                    }`}
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-red-600 text-sm mt-1">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Status Messages */}
                {submitStatus && (
                  <div className={`p-4 rounded-lg ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-100 border border-green-300 text-green-800' 
                      : 'bg-red-100 border border-red-300 text-red-800'
                  }`}>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {submitStatus.type === 'success' ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">
                          {submitStatus.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Red Cross Bhavan, Agartala, Tripura
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="rounded-2xl overflow-hidden shadow-xl h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.4449!2d91.2743!3d23.8315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3753f5e5e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sIndian%20Red%20Cross%20Society%20Tripura%20State%20Branch!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Red Cross Tripura Location"
              ></iframe>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}

export default Contact;
