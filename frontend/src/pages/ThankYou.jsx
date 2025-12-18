import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';

function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Redirect to home after 30 seconds
    const timer = setTimeout(() => {
      // Uncomment if you want auto-redirect
      // navigate('/');
    }, 30000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageTransition>
      {/* Hero Section with Background */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/1.jpeg" 
            alt="Red Cross Humanitarian Work" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-redcross-red/90 via-red-800/80 to-red-900/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom text-center text-white px-6">
          <SectionReveal>
            {/* Success Icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white/30 mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Thank You for Your Support!
            </h1>

            {/* Message Body */}
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl md:text-2xl leading-relaxed mb-8 font-light">
                Thank you for your generous contribution and for supporting the Indian Red Cross Society, Tripura Branch.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed mb-8 opacity-90">
                Your donation/subscription is helping us save lives, support communities during emergencies, and carry out humanitarian services across the region.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed mb-12 opacity-90">
                Because of compassionate individuals like you, we are able to continue our mission of serving humanity.
              </p>

              {/* Highlight Message */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-12">
                <p className="text-2xl md:text-3xl font-semibold italic text-yellow-200">
                  "Your kindness today is creating hope for tomorrow."
                </p>
              </div>

              {/* Closing Line */}
              <p className="text-2xl md:text-3xl font-bold text-yellow-300 mb-12">
                Together, we are saving lives.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                to="/" 
                className="bg-white text-redcross-red px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Return to Home
              </Link>
              <Link 
                to="/volunteers" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-redcross-red transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Become a Volunteer
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.5}>
            {/* Contact Information */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 9774137698</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>ircstrp@gmail.com</span>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* Floating Elements for Visual Appeal */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-300/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-white/5 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Impact Statistics Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Impact in Numbers</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See how contributions like yours are making a difference in Tripura
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SectionReveal delay={0.1}>
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-redcross-red mb-2">500+</div>
                <div className="text-gray-600">Lives Saved</div>
              </div>
            </SectionReveal>
            
            <SectionReveal delay={0.2}>
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-redcross-red mb-2">1000+</div>
                <div className="text-gray-600">Blood Units Collected</div>
              </div>
            </SectionReveal>
            
            <SectionReveal delay={0.3}>
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-redcross-red mb-2">50+</div>
                <div className="text-gray-600">Communities Served</div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default ThankYou;