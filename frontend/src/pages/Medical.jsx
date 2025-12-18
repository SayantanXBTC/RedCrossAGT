import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';
import ImageModal from '../components/common/ImageModal';

function Medical() {
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState({ isOpen: false, src: '', alt: '' });

  const openModal = (src, alt) => {
    setModalImage({ isOpen: true, src, alt });
  };

  const closeModal = () => {
    setModalImage({ isOpen: false, src: '', alt: '' });
  };
  const bloodDonationImages = [35, 36, 37, 38, 41];
  const impactStats = [
    { number: '4,200+', label: 'Units Collected' },
    { number: '2,800+', label: 'Lives Saved' },
    { number: '85+', label: 'Blood Camps' },
    { number: '1,200+', label: 'Regular Donors' },
  ];

  return (
    <PageTransition>
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src="/images/35.jpeg" 
          alt="Blood Donation" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-redcross-red/90 via-redcross-red/70 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <h1 className="heading-xl text-white mb-4">Blood Donation Program</h1>
            <p className="text-xl text-white max-w-2xl">
              Every drop counts. Join our life-saving mission to ensure blood availability for those in need.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="heading-md mb-4">Our Impact in Numbers</h2>
              <p className="text-body max-w-2xl mx-auto">
                Through the generosity of our donors, we continue to save lives every day.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, idx) => (
              <SectionReveal key={idx} delay={idx * 0.1}>
                <div className="text-center p-8 rounded-2xl bg-red-50 hover:bg-red-100 transition-all duration-300 hover:shadow-lg border-t-4 border-redcross-red">
                  <div className="text-4xl font-bold text-redcross-red mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div>
                <h2 className="heading-md mb-6">Why Donate Blood?</h2>
                <p className="text-body mb-6">
                  Blood donation is one of the most selfless acts of kindness. A single donation can save up to three lives, making it one of the most impactful ways to contribute to your community.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-redcross-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Save Lives</h3>
                      <p className="text-gray-600">Your donation can help accident victims, surgery patients, and those with blood disorders.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-redcross-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Health Benefits</h3>
                      <p className="text-gray-600">Regular donation can reduce iron overload and improve cardiovascular health.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-redcross-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Free Health Checkup</h3>
                      <p className="text-gray-600">Get a complimentary health screening with every donation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl image-hover-effect"
                onClick={() => openModal('/images/36.jpeg', 'Blood Donation Process')}
              >
                <img 
                  src="/images/36.jpeg" 
                  alt="Blood Donation Process" 
                  className="w-full h-full object-cover"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="heading-md mb-4">Blood Donation Camps</h2>
              <p className="text-body max-w-2xl mx-auto">
                We organize regular blood donation camps across Tripura to make donating convenient and accessible.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="relative overflow-hidden">
              <div className="continuous-scroll-wrapper">
                <div className="continuous-scroll-content">
                  {bloodDonationImages.map((img, idx) => (
                    <div key={idx} className="scroll-item">
                      <div 
                        className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 image-hover-effect"
                        onClick={() => openModal(`/images/${img}.jpeg`, `Blood Donation Camp ${idx + 1}`)}
                      >
                        <img 
                          src={`/images/${img}.jpeg`} 
                          alt={`Blood Donation Camp ${idx + 1}`}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="continuous-scroll-content" aria-hidden="true">
                  {bloodDonationImages.map((img, idx) => (
                    <div key={`${idx}-dup`} className="scroll-item">
                      <div 
                        className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 image-hover-effect"
                        onClick={() => openModal(`/images/${img}.jpeg`, `Blood Donation Camp ${idx + 1}`)}
                      >
                        <img 
                          src={`/images/${img}.jpeg`} 
                          alt={`Blood Donation Camp ${idx + 1}`}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <ImageModal 
              isOpen={modalImage.isOpen}
              onClose={closeModal}
              imageSrc={modalImage.src}
              imageAlt={modalImage.alt}
            />
          </SectionReveal>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl image-hover-effect"
                onClick={() => openModal('/images/37.jpeg', 'Donor Registration')}
              >
                <img 
                  src="/images/37.jpeg" 
                  alt="Donor Registration" 
                  className="w-full h-full object-cover"
                />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div>
                <h2 className="heading-md mb-6">Become a Regular Donor</h2>
                <p className="text-body mb-6">
                  Join our community of regular blood donors and be part of a life-saving network. We'll notify you when your blood type is needed and keep you informed about upcoming donation camps.
                </p>
                <div className="bg-red-50 border-l-4 border-redcross-red p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-lg mb-2">Eligibility Criteria</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <span className="text-redcross-red">•</span>
                      <span>Age: 18-65 years</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-redcross-red">•</span>
                      <span>Weight: Minimum 50 kg</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-redcross-red">•</span>
                      <span>Good general health</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-redcross-red">•</span>
                      <span>No recent illness or medication</span>
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => navigate('/volunteers')}
                  className="btn-primary w-full md:w-auto"
                >
                  Register as a Donor
                </button>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-redcross-red text-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-md mb-6">Be a Hero. Donate Blood.</h2>
              <p className="text-xl mb-8 text-red-100">
                Your single act of kindness can give someone a second chance at life. Join us in our mission to ensure no one suffers due to blood shortage.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => navigate('/blog/blood-donation-impact')}
                  className="bg-white text-redcross-red px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Read More
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-redcross-red transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}

export default Medical;
