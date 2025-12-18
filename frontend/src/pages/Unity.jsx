import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';
import ImageModal from '../components/common/ImageModal';

function Unity() {
  const navigate = useNavigate();
  
  const [modalImage, setModalImage] = useState({ isOpen: false, src: '', alt: '' });

  const openModal = (src, alt) => {
    setModalImage({ isOpen: true, src, alt });
  };

  const closeModal = () => {
    setModalImage({ isOpen: false, src: '', alt: '' });
  };
  const initiatives = [
    {
      title: 'Cultural Exchange Programs',
      description: 'Bringing together diverse communities through cultural celebrations and shared experiences.',
      image: 43
    },
    {
      title: 'Youth Leadership',
      description: 'Empowering young leaders to promote peace, tolerance, and social cohesion.',
      image: 44
    },
    {
      title: 'Community Dialogues',
      description: 'Facilitating conversations that bridge divides and build understanding.',
      image: 45
    },
    {
      title: 'Peace Education',
      description: 'Teaching conflict resolution and promoting non-violent communication.',
      image: 46
    },
  ];

  const unityImages = [47, 48, 49, 50, 51];
  const impactAreas = [
    { title: 'Communities United', count: '85+' },
    { title: 'Youth Engaged', count: '1,500+' },
    { title: 'Peace Workshops', count: '120+' },
    { title: 'Cultural Events', count: '55+' },
  ];

  return (
    <PageTransition>
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src="/images/43.jpeg" 
          alt="Unity and Awareness" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-redcross-red/90 via-redcross-red/70 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <h1 className="heading-xl text-white mb-4">Unity & Social Awareness</h1>
            <p className="text-xl text-white max-w-2xl">
              Building bridges, fostering understanding, and creating a more inclusive and harmonious society.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="heading-md mb-4">Our Vision for Unity</h2>
              <p className="text-body max-w-3xl mx-auto">
                We believe that a strong, united community is built on mutual respect, understanding, and shared values. Our unity initiatives work to break down barriers and create spaces where everyone feels valued and included.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactAreas.map((area, idx) => (
              <SectionReveal key={idx} delay={idx * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-red-50 hover:bg-red-100 transition-all duration-300 border-t-4 border-redcross-red">
                  <div className="text-3xl font-bold text-redcross-red mb-2">{area.count}</div>
                  <div className="text-gray-600 font-medium">{area.title}</div>
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
              <h2 className="heading-md mb-4">Our Unity Initiatives</h2>
              <p className="text-body max-w-2xl mx-auto">
                Programs designed to promote social cohesion and celebrate diversity.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((initiative, idx) => (
              <SectionReveal key={idx} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div 
                    className="h-64 overflow-hidden image-hover-effect"
                    onClick={() => openModal(`/images/${initiative.image}.jpeg`, initiative.title)}
                  >
                    <img 
                      src={`/images/${initiative.image}.jpeg`} 
                      alt={initiative.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{initiative.title}</h3>
                    <p className="text-gray-600 mb-4">{initiative.description}</p>
                    <button
                      onClick={() => navigate('/blog/unity-and-social-cohesion')}
                      className="text-redcross-red font-semibold hover:underline flex items-center space-x-2 group"
                    >
                      <span>Read More</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
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
                <h2 className="heading-md mb-6">Promoting Social Awareness</h2>
                <p className="text-body mb-6">
                  Our awareness campaigns address critical social issues including discrimination, inequality, and social exclusion. We work to create a society where everyone has equal opportunities and rights.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-redcross-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Gender Equality</h3>
                      <p className="text-gray-600">Promoting equal rights and opportunities for all genders.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-redcross-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Social Inclusion</h3>
                      <p className="text-gray-600">Ensuring marginalized communities have a voice and representation.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-redcross-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Human Rights Education</h3>
                      <p className="text-gray-600">Raising awareness about fundamental rights and freedoms.</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl image-hover-effect"
                onClick={() => openModal('/images/47.jpeg', 'Social Awareness')}
              >
                <img 
                  src="/images/47.jpeg" 
                  alt="Social Awareness" 
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
              <h2 className="heading-md mb-4">Unity in Action</h2>
              <p className="text-body max-w-2xl mx-auto">
                Celebrating diversity and building stronger communities together.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="relative overflow-hidden">
              <div className="continuous-scroll-wrapper">
                <div className="continuous-scroll-content">
                  {unityImages.map((img, idx) => (
                    <div key={idx} className="scroll-item">
                      <div 
                        className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 image-hover-effect"
                        onClick={() => openModal(`/images/${img}.jpeg`, `Unity Initiative ${idx + 1}`)}
                      >
                        <img 
                          src={`/images/${img}.jpeg`} 
                          alt={`Unity Initiative ${idx + 1}`}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="continuous-scroll-content" aria-hidden="true">
                  {unityImages.map((img, idx) => (
                    <div key={`${idx}-dup`} className="scroll-item">
                      <div 
                        className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 image-hover-effect"
                        onClick={() => openModal(`/images/${img}.jpeg`, `Unity Initiative ${idx + 1}`)}
                      >
                        <img 
                          src={`/images/${img}.jpeg`} 
                          alt={`Unity Initiative ${idx + 1}`}
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
                onClick={() => openModal('/images/48.jpeg', 'Community Unity')}
              >
                <img 
                  src="/images/48.jpeg" 
                  alt="Community Unity" 
                  className="w-full h-full object-cover"
                />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div>
                <h2 className="heading-md mb-6">Youth as Change Makers</h2>
                <p className="text-body mb-6">
                  We believe young people are powerful agents of change. Our youth programs equip them with the skills, knowledge, and platforms to lead unity initiatives in their communities.
                </p>
                <div className="bg-red-50 border-l-4 border-redcross-red p-6 rounded-lg mb-6">
                  <p className="text-gray-700 italic">
                    "The youth leadership program taught me that unity starts with understanding. Now I'm organizing peace workshops in my college."
                  </p>
                  <p className="text-sm text-gray-600 mt-3">— Youth Leader, Agartala</p>
                </div>
                <button 
                  onClick={() => navigate('/volunteers')}
                  className="btn-primary"
                >
                  Join Youth Programs
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
              <h2 className="heading-md mb-6">Together We Are Stronger</h2>
              <p className="text-xl mb-8 text-red-100">
                Join us in building a more inclusive, understanding, and united Tripura. Every voice matters, every action counts.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => navigate('/volunteers')}
                  className="bg-white text-redcross-red px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Get Involved
                </button>
                <button 
                  onClick={() => navigate('/blog/unity-and-social-cohesion')}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-redcross-red transition-all duration-300"
                >
                  Learn More
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

export default Unity;
