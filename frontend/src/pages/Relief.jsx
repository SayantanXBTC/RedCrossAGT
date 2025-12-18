import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';
import ImageModal from '../components/common/ImageModal';

function Relief() {
  const navigate = useNavigate();
  const documentationImages = [48, 49, 50, 51, 52];
  
  const [modalImage, setModalImage] = useState({ isOpen: false, src: '', alt: '' });

  const openModal = (src, alt) => {
    setModalImage({ isOpen: true, src, alt });
  };

  const closeModal = () => {
    setModalImage({ isOpen: false, src: '', alt: '' });
  };

  return (
    <PageTransition>
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src="/images/25.jpeg" 
          alt="Disaster Relief" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <h1 className="heading-xl text-white mb-4">Disaster Response & Relief</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Rapid response and sustained support during times of crisis across Tripura.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div>
                <h2 className="heading-md mb-6">Always Ready, Always There</h2>
                <p className="text-body mb-6">
                  When disaster strikes, every second counts. Our dedicated disaster response team is trained and equipped to provide immediate relief to affected communities across Tripura.
                </p>
                <p className="text-body mb-6">
                  From floods and landslides to cyclones and other natural calamities, we mobilize resources swiftly to ensure that no one is left behind in their hour of need.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-redcross-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">24/7 Emergency Response</h3>
                      <p className="text-gray-600">Round-the-clock readiness to respond to any emergency situation.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-redcross-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Essential Relief Supplies</h3>
                      <p className="text-gray-600">Food, water, shelter, and medical aid delivered to affected areas.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-redcross-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Long-term Rehabilitation</h3>
                      <p className="text-gray-600">Supporting communities in rebuilding their lives after disasters.</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl image-hover-effect"
                onClick={() => openModal('/images/21.jpeg', 'Relief Operations')}
              >
                <img 
                  src="/images/21.jpeg" 
                  alt="Relief Operations" 
                  className="w-full h-full object-cover"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="heading-md mb-4">Our Relief Operations</h2>
              <p className="text-body max-w-2xl mx-auto">
                Documenting our response efforts and the resilience of communities we serve.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="relative overflow-hidden">
              <div className="continuous-scroll-wrapper">
                <div className="continuous-scroll-content">
                  {documentationImages.map((img, idx) => (
                    <div key={idx} className="scroll-item">
                      <div 
                        className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 image-hover-effect"
                        onClick={() => openModal(`/images/${img}.jpeg`, `Relief Operation ${idx + 1}`)}
                      >
                        <img 
                          src={`/images/${img}.jpeg`} 
                          alt={`Relief Operation ${idx + 1}`}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="continuous-scroll-content" aria-hidden="true">
                  {documentationImages.map((img, idx) => (
                    <div key={`${idx}-dup`} className="scroll-item">
                      <div 
                        className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 image-hover-effect"
                        onClick={() => openModal(`/images/${img}.jpeg`, `Relief Operation ${idx + 1}`)}
                      >
                        <img 
                          src={`/images/${img}.jpeg`} 
                          alt={`Relief Operation ${idx + 1}`}
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

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl image-hover-effect"
                onClick={() => openModal('/images/4.jpeg', 'Community Support')}
              >
                <img 
                  src="/images/4.jpeg" 
                  alt="Community Support" 
                  className="w-full h-full object-cover"
                />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div>
                <h2 className="heading-md mb-6">Community-Centered Approach</h2>
                <p className="text-body mb-6">
                  We believe in empowering communities to become resilient. Our disaster preparedness programs train local volunteers and community members to respond effectively during emergencies.
                </p>
                <p className="text-body mb-6">
                  Through workshops, drills, and awareness campaigns, we ensure that communities are not just recipients of aid, but active participants in their own safety and recovery.
                </p>
                <div className="bg-red-50 border-l-4 border-redcross-red p-6 rounded-lg">
                  <p className="text-gray-700 italic">
                    "The Red Cross team arrived within hours of the flood. They provided us with food, clean water, and most importantly, hope. We will never forget their kindness."
                  </p>
                  <p className="text-sm text-gray-600 mt-3">— Community Member, Agartala</p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="heading-md mb-4">Documentation & Field Records</h2>
              <p className="text-body max-w-2xl mx-auto">
                Visual records of our relief operations and community impact.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[54, 55, 56, 57, 58, 59].map((img, idx) => (
                <div 
                  key={idx} 
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 image-hover-effect"
                  onClick={() => openModal(`/images/${img}.jpeg`, `Relief Documentation ${idx + 1}`)}
                >
                  <img 
                    src={`/images/${img}.jpeg`} 
                    alt={`Relief Documentation ${idx + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="section-padding bg-redcross-red text-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-md mb-6">Support Our Relief Efforts</h2>
              <p className="text-xl mb-8 text-red-100">
                Your contribution can help us reach more communities in need and save lives during disasters.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => navigate('/blog/disaster-relief-operations')}
                  className="bg-white text-redcross-red px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Read More
                </button>
                <button 
                  onClick={() => navigate('/volunteers')}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-redcross-red transition-all duration-300"
                >
                  Volunteer with Us
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

export default Relief;
