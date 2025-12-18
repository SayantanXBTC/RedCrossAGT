import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';
import ImageModal from '../components/common/ImageModal';

function Home() {
  const [modalImage, setModalImage] = useState({ isOpen: false, src: '', alt: '' });

  const openModal = (src, alt) => {
    setModalImage({ isOpen: true, src, alt });
  };

  const closeModal = () => {
    setModalImage({ isOpen: false, src: '', alt: '' });
  };
  const impactStats = [
    { number: '12,000+', label: 'Lives Touched' },
    { number: '850+', label: 'Volunteers' },
    { number: '4,200+', label: 'Blood Units Donated' },
    { number: '65+', label: 'Relief Operations' },
  ];

  const gridImages = [30, 33, 36, 39, 42, 45];
  
  const allImages = Array.from({ length: 64 }, (_, i) => i + 1);
  const shuffledImages = [...allImages].sort(() => Math.random() - 0.5);

  return (
    <PageTransition>
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/63.jpeg" 
            alt="Red Cross Hero" 
            className="w-full h-full object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/30"></div>
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl text-white"
            >
              <motion.h1 
                className="heading-xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Serving Humanity with Compassion
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Indian Red Cross Society - Tripura State Branch has been at the forefront of humanitarian service, disaster relief, and community welfare across Tripura.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link to="/join" className="btn-primary">
                  Join Our Mission
                </Link>
                <Link to="/medical" className="btn-secondary bg-white/10 border-white text-white hover:bg-white hover:text-redcross-red backdrop-blur-sm">
                  Donate Blood
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4">Our Impact Across Tripura</h2>
              <p className="text-body max-w-2xl mx-auto">
                Through dedication and community support, we continue to make a meaningful difference in countless lives.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, idx) => (
              <SectionReveal key={idx} delay={idx * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-red-50 transition-all duration-300 hover:shadow-lg">
                  <div className="text-4xl md:text-5xl font-bold text-redcross-red mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Our Core Services</h2>
              <p className="text-body max-w-2xl mx-auto">
                Comprehensive humanitarian services designed to support and uplift communities.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridImages.map((img, idx) => (
              <SectionReveal key={idx} delay={idx * 0.1}>
                <div className="group">
                  <div 
                    className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 image-hover-effect"
                    onClick={() => openModal(`/images/${img}.jpeg`, ['Disaster Relief', 'Blood Donation', 'Community Outreach', 'Training Programs', 'Unity Initiatives', 'Volunteer Network'][idx])}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={`/images/${img}.jpeg`} 
                        alt={`Service ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none">
                        <h3 className="text-xl font-semibold mb-2">
                          {['Disaster Relief', 'Blood Donation', 'Community Outreach', 'Training Programs', 'Unity Initiatives', 'Volunteer Network'][idx]}
                        </h3>
                        <p className="text-sm text-gray-200">Click to view →</p>
                      </div>
                    </div>
                  </div>
                  <Link 
                    to={['relief', 'medical', 'outreach', 'training', 'unity', 'volunteers'][idx]}
                    className="block mt-4 text-center text-redcross-red font-semibold hover:underline"
                  >
                    Learn More About This Service →
                  </Link>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white overflow-hidden">
        <div className="container-custom mb-12">
          <SectionReveal>
            <div className="text-center">
              <h2 className="heading-lg mb-4">Our Work in Action</h2>
              <p className="text-body max-w-2xl mx-auto">
                Witness the dedication and impact of our volunteers and programs across communities.
              </p>
            </div>
          </SectionReveal>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="continuous-scroll-wrapper">
            <div className="continuous-scroll-content">
              {shuffledImages.map((img, idx) => (
                <div key={`${img}-${idx}`} className="scroll-item">
                  <div 
                    className="rounded-xl overflow-hidden shadow-lg image-hover-effect"
                    onClick={() => openModal(`/images/${img}.jpeg`, `Red Cross Activity ${img}`)}
                  >
                    <img 
                      src={`/images/${img}.jpeg`} 
                      alt={`Red Cross Activity ${img}`}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="continuous-scroll-content" aria-hidden="true">
              {shuffledImages.map((img, idx) => (
                <div key={`${img}-${idx}-duplicate`} className="scroll-item">
                  <div 
                    className="rounded-xl overflow-hidden shadow-lg image-hover-effect"
                    onClick={() => openModal(`/images/${img}.jpeg`, `Red Cross Activity ${img}`)}
                  >
                    <img 
                      src={`/images/${img}.jpeg`} 
                      alt={`Red Cross Activity ${img}`}
                      className="w-full h-64 object-cover"
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
      </section>

      <section className="section-padding bg-redcross-red text-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-lg mb-6">Be Part of Something Greater</h2>
              <p className="text-xl mb-8 text-red-100 leading-relaxed">
                Your support and participation can transform lives. Join us in our mission to serve humanity with compassion and dedication.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/volunteers" className="bg-white text-redcross-red px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Become a Volunteer
                </Link>
                <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-redcross-red transition-all duration-300">
                  Get in Touch
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}

export default Home;
