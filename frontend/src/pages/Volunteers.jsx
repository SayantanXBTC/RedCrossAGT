import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';
import ImageModal from '../components/common/ImageModal';

function Volunteers() {
  const navigate = useNavigate();
  
  const [modalImage, setModalImage] = useState({ isOpen: false, src: '', alt: '' });

  const openModal = (src, alt) => {
    setModalImage({ isOpen: true, src, alt });
  };

  const closeModal = () => {
    setModalImage({ isOpen: false, src: '', alt: '' });
  };

  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    areaOfInterest: '',
    availability: '',
    experience: '',
    skills: [],
    message: ''
  });
  const [isVolunteerSubmitting, setIsVolunteerSubmitting] = useState(false);
  const [volunteerStatus, setVolunteerStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters long';
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

      case 'areaOfInterest':
        if (!value) {
          error = 'Please select your area of interest';
        }
        break;

      case 'availability':
        if (!value) {
          error = 'Please select your availability';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleVolunteerChange = (e) => {
    const { name, value } = e.target;
    setVolunteerForm(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleVolunteerBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const errors = {};
    Object.keys(volunteerForm).forEach(key => {
      if (['name', 'email', 'phone', 'areaOfInterest', 'availability'].includes(key)) {
        const error = validateField(key, volunteerForm[key]);
        if (error) errors[key] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setVolunteerStatus({ 
        type: 'error', 
        message: 'Please correct the errors in the form before submitting' 
      });
      return;
    }

    setIsVolunteerSubmitting(true);
    setVolunteerStatus(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/volunteers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(volunteerForm)
      });

      const data = await response.json();

      if (data.success) {
        setVolunteerStatus({ type: 'success', message: data.message });
        setVolunteerForm({ name: '', email: '', phone: '', areaOfInterest: '', availability: '', experience: '', skills: [], message: '' });
        setFormErrors({});
        
        // Redirect to Thank You page after successful submission
        setTimeout(() => {
          navigate('/thank-you');
        }, 2000);
      } else {
        setVolunteerStatus({ type: 'error', message: data.message || 'Registration failed' });
      }
    } catch (error) {
      console.error('Volunteer registration error:', error);
      setVolunteerStatus({ 
        type: 'error', 
        message: 'Failed to submit application. Please try again.' 
      });
    } finally {
      setIsVolunteerSubmitting(false);
    }
  };

  const volunteerRoles = [
    {
      title: 'Emergency Response Volunteer',
      description: 'Be part of rapid response teams during disasters and emergencies.',
      commitment: 'On-call basis'
    },
    {
      title: 'Blood Donation Coordinator',
      description: 'Help organize blood donation camps and manage donor relations.',
      commitment: '10 hours/month'
    },
    {
      title: 'Community Health Worker',
      description: 'Conduct health awareness programs in communities.',
      commitment: '15 hours/month'
    },
    {
      title: 'Training Facilitator',
      description: 'Assist in conducting first aid and disaster management training.',
      commitment: '12 hours/month'
    },
  ];

  const volunteerImages = [55, 60, 34, 28, 51, 40];
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Volunteer since 2020',
      quote: 'Being a Red Cross volunteer has been the most rewarding experience of my life. Every day, I get to make a real difference.',
      image: 41
    },
    {
      name: 'Rahul Das',
      role: 'Emergency Response Team',
      quote: 'The training and support I received helped me save lives during the 2023 floods. I am proud to be part of this mission.',
      image: 52
    },
  ];

  return (
    <PageTransition>
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src="/images/29.jpeg" 
          alt="Volunteers" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-redcross-red/90 via-redcross-red/70 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <h1 className="heading-xl text-white mb-4">Join Our Volunteer Network</h1>
            <p className="text-xl text-white max-w-2xl">
              Be part of a compassionate community dedicated to serving humanity and making a lasting impact.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="heading-md mb-4">Why Volunteer with Us?</h2>
              <p className="text-body max-w-3xl mx-auto">
                Volunteering with the Red Cross is more than just giving your time—it's about being part of a global movement dedicated to alleviating human suffering.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SectionReveal delay={0.1}>
              <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-red-50 transition-all duration-300 border-l-4 border-redcross-red">
                <h3 className="text-xl font-semibold mb-3 text-redcross-red">Make an Impact</h3>
                <p className="text-gray-600">Directly contribute to saving lives and improving communities across Tripura.</p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-red-50 transition-all duration-300 border-l-4 border-redcross-red">
                <h3 className="text-xl font-semibold mb-3 text-redcross-red">Learn & Grow</h3>
                <p className="text-gray-600">Gain valuable skills through certified training programs and hands-on experience.</p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.3}>
              <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-red-50 transition-all duration-300 border-l-4 border-redcross-red">
                <h3 className="text-xl font-semibold mb-3 text-redcross-red">Build Connections</h3>
                <p className="text-gray-600">Join a network of like-minded individuals committed to humanitarian service.</p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="heading-md mb-4">Volunteer Opportunities</h2>
              <p className="text-body max-w-2xl mx-auto">
                Find a role that matches your skills, interests, and availability.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {volunteerRoles.map((role, idx) => (
              <SectionReveal key={idx} delay={idx * 0.1}>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-redcross-red">
                  <div className="flex items-start justify-between mb-4">
                    <span className="bg-red-100 text-redcross-red px-3 py-1 rounded-full text-sm font-semibold">
                      {role.commitment}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{role.title}</h3>
                  <p className="text-gray-600 mb-4">{role.description}</p>
                  <button 
                    onClick={() => document.getElementById('volunteer-form').scrollIntoView({ behavior: 'smooth' })}
                    className="text-redcross-red font-semibold hover:underline"
                  >
                    Apply Now →
                  </button>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="heading-md mb-4">Our Volunteers in Action</h2>
              <p className="text-body max-w-2xl mx-auto">
                See the dedication and passion of our volunteer community.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="relative overflow-hidden">
              <div className="continuous-scroll-wrapper">
                <div className="continuous-scroll-content">
                  {volunteerImages.map((img, idx) => (
                    <div key={idx} className="scroll-item">
                      <div 
                        className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 image-hover-effect"
                        onClick={() => openModal(`/images/${img}.jpeg`, `Volunteer Activity ${idx + 1}`)}
                      >
                        <img 
                          src={`/images/${img}.jpeg`} 
                          alt={`Volunteer Activity ${idx + 1}`}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="continuous-scroll-content" aria-hidden="true">
                  {volunteerImages.map((img, idx) => (
                    <div key={`${idx}-dup`} className="scroll-item">
                      <div 
                        className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 image-hover-effect"
                        onClick={() => openModal(`/images/${img}.jpeg`, `Volunteer Activity ${idx + 1}`)}
                      >
                        <img 
                          src={`/images/${img}.jpeg`} 
                          alt={`Volunteer Activity ${idx + 1}`}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="heading-md mb-4">Volunteer Stories</h2>
              <p className="text-body max-w-2xl mx-auto">
                Hear from our volunteers about their experiences and the impact they've made.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <SectionReveal key={idx} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div 
                    className="h-64 overflow-hidden image-hover-effect"
                    onClick={() => openModal(`/images/${testimonial.image}.jpeg`, testimonial.name)}
                  >
                    <img 
                      src={`/images/${testimonial.image}.jpeg`} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center space-x-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div>
                <h2 className="heading-md mb-6">How to Get Started</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-redcross-red text-white rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Submit Application</h3>
                      <p className="text-gray-600">Fill out our volunteer application form with your details and interests.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-redcross-red text-white rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Attend Orientation</h3>
                      <p className="text-gray-600">Join our orientation session to learn about Red Cross values and operations.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-redcross-red text-white rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Complete Training</h3>
                      <p className="text-gray-600">Receive specialized training based on your chosen volunteer role.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-redcross-red text-white rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Start Volunteering</h3>
                      <p className="text-gray-600">Begin your journey of service and make a difference in your community.</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div id="volunteer-form" className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl shadow-xl">
                <h3 className="text-3xl font-bold mb-2 text-gray-900">Volunteer Application</h3>
                <p className="text-gray-600 mb-6">Join our mission to serve humanity</p>
                <form onSubmit={handleVolunteerSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={volunteerForm.name}
                        onChange={handleVolunteerChange}
                        onBlur={handleVolunteerBlur}
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={volunteerForm.email}
                        onChange={handleVolunteerChange}
                        onBlur={handleVolunteerBlur}
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={volunteerForm.phone}
                        onChange={handleVolunteerChange}
                        onBlur={handleVolunteerBlur}
                        required
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Availability *</label>
                      <select 
                        name="availability"
                        value={volunteerForm.availability}
                        onChange={handleVolunteerChange}
                        onBlur={handleVolunteerBlur}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-redcross-red transition-all ${
                          formErrors.availability ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-redcross-red'
                        }`}
                      >
                        <option value="">Select availability</option>
                        <option value="Weekdays">Weekdays</option>
                        <option value="Weekends">Weekends</option>
                        <option value="Flexible">Flexible</option>
                        <option value="On-call">On-call basis</option>
                      </select>
                      {formErrors.availability && (
                        <p className="text-red-600 text-sm mt-1">
                          {formErrors.availability}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Area of Interest *</label>
                    <select 
                      name="areaOfInterest"
                      value={volunteerForm.areaOfInterest}
                      onChange={handleVolunteerChange}
                      onBlur={handleVolunteerBlur}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-redcross-red transition-all ${
                        formErrors.areaOfInterest ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-redcross-red'
                      }`}
                    >
                      <option value="">Select your primary interest</option>
                      <option value="Emergency Response Volunteer">Emergency Response Volunteer</option>
                      <option value="Blood Donation Coordinator">Blood Donation Coordinator</option>
                      <option value="Community Health Worker">Community Health Worker</option>
                      <option value="Training Facilitator">Training Facilitator</option>
                      <option value="Disaster Relief">Disaster Relief</option>
                      <option value="First Aid Trainer">First Aid Trainer</option>
                      <option value="Youth Programs">Youth Programs</option>
                      <option value="Administrative Support">Administrative Support</option>
                    </select>
                    {formErrors.areaOfInterest && (
                      <p className="text-red-600 text-sm mt-1">
                        {formErrors.areaOfInterest}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Previous Experience</label>
                    <select 
                      name="experience"
                      value={volunteerForm.experience}
                      onChange={handleVolunteerChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-redcross-red focus:border-redcross-red transition-all"
                    >
                      <option value="">Select experience level</option>
                      <option value="No Experience">No Experience (Willing to learn)</option>
                      <option value="Some Experience">Some Experience (1-2 years)</option>
                      <option value="Experienced">Experienced (3-5 years)</option>
                      <option value="Highly Experienced">Highly Experienced (5+ years)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Skills & Certifications (Optional)</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['First Aid', 'CPR', 'Medical Training', 'Teaching', 'Event Management', 'Social Media'].map((skill) => (
                        <label key={skill} className="flex items-center space-x-2 cursor-pointer bg-white p-3 rounded-lg hover:bg-red-50 transition-all">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 text-redcross-red border-gray-300 rounded focus:ring-redcross-red"
                          />
                          <span className="text-sm text-gray-700">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Why do you want to volunteer? (Optional)</label>
                    <textarea 
                      name="message"
                      value={volunteerForm.message}
                      onChange={handleVolunteerChange}
                      rows="3"
                      placeholder="Tell us about your motivation..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-redcross-red focus:border-redcross-red transition-all"
                    ></textarea>
                  </div>

                  {volunteerStatus && (
                    <div className={`p-4 rounded-lg ${volunteerStatus.type === 'success' ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-red-100 text-red-800 border-2 border-red-300'}`}>
                      <p className="font-semibold">{volunteerStatus.message}</p>
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={isVolunteerSubmitting}
                    className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all"
                  >
                    {isVolunteerSubmitting ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-redcross-red text-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-md mb-6">Ready to Make a Difference?</h2>
              <p className="text-xl mb-8 text-red-100">
                Join our community of dedicated volunteers and be part of something greater than yourself.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => document.getElementById('volunteer-form').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-redcross-red px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Become a Volunteer Today
                </button>
                <button 
                  onClick={() => navigate('/blog/becoming-a-volunteer')}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-redcross-red transition-all duration-300"
                >
                  Read More
                </button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <ImageModal 
        isOpen={modalImage.isOpen}
        onClose={closeModal}
        imageSrc={modalImage.src}
        imageAlt={modalImage.alt}
      />
    </PageTransition>
  );
}

export default Volunteers;
