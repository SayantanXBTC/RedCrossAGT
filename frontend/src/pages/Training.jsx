import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';
import ImageModal from '../components/common/ImageModal';

function Training() {
  const navigate = useNavigate();
  
  const [modalImage, setModalImage] = useState({ isOpen: false, src: '', alt: '' });

  const openModal = (src, alt) => {
    setModalImage({ isOpen: true, src, alt });
  };

  const closeModal = () => {
    setModalImage({ isOpen: false, src: '', alt: '' });
  };
  const courses = [
    {
      title: 'First Aid & CPR',
      duration: '2 Days',
      description: 'Learn life-saving techniques including CPR, wound care, and emergency response.',
      image: 1
    },
    {
      title: 'Disaster Management',
      duration: '3 Days',
      description: 'Comprehensive training on disaster preparedness, response, and recovery operations.',
      image: 27
    },
    {
      title: 'Community Health',
      duration: '5 Days',
      description: 'Training in basic healthcare, hygiene promotion, and disease prevention.',
      image: 60
    },
    {
      title: 'Volunteer Leadership',
      duration: '4 Days',
      description: 'Develop leadership skills to coordinate and manage volunteer teams effectively.',
      image: 46
    },
  ];

  const trainingImages = [30, 31, 32, 33, 34];
  const certifications = [
    { name: 'First Aid Certified', count: '1000+' },
    { name: 'Disaster Response Trained', count: '500+' },
    { name: 'Community Health Workers', count: '200+' },
    { name: 'Volunteer Leaders', count: '280+' },
  ];

  return (
    <PageTransition>
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src="/images/26.jpeg" 
          alt="Training Programs" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-redcross-red/90 via-redcross-red/70 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <h1 className="heading-xl text-white mb-4">Training & Capacity Building</h1>
            <p className="text-xl text-white max-w-2xl">
              Empowering individuals with skills and knowledge to save lives and serve communities effectively.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="heading-md mb-4">Our Training Programs</h2>
              <p className="text-body max-w-3xl mx-auto">
                We offer comprehensive training programs designed to equip volunteers and community members with essential skills for humanitarian service.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, idx) => (
              <SectionReveal key={idx} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div 
                    className="h-64 overflow-hidden image-hover-effect"
                    onClick={() => openModal(`/images/${course.image}.jpeg`, course.title)}
                  >
                    <img 
                      src={`/images/${course.image}.jpeg`} 
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-red-100 text-redcross-red px-3 py-1 rounded-full text-sm font-semibold">
                        {course.duration}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <button 
                      onClick={() => navigate('/blog/volunteer-training-programs')}
                      className="text-redcross-red font-semibold hover:underline"
                    >
                      Learn More →
                    </button>
                  </div>
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
              <h2 className="heading-md mb-4">Training Impact</h2>
              <p className="text-body max-w-2xl mx-auto">
                Our training programs have created a network of skilled volunteers ready to serve.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {certifications.map((cert, idx) => (
              <SectionReveal key={idx} delay={idx * 0.1}>
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl font-bold text-redcross-red mb-2">{cert.count}</div>
                  <div className="text-gray-600 font-medium">{cert.name}</div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.4}>
            <div className="relative overflow-hidden">
              <div className="continuous-scroll-wrapper">
                <div className="continuous-scroll-content">
                  {trainingImages.map((img, idx) => (
                    <div key={idx} className="scroll-item">
                      <div 
                        className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 image-hover-effect"
                        onClick={() => openModal(`/images/${img}.jpeg`, `Training Session ${idx + 1}`)}
                      >
                        <img 
                          src={`/images/${img}.jpeg`} 
                          alt={`Training Session ${idx + 1}`}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="continuous-scroll-content" aria-hidden="true">
                  {trainingImages.map((img, idx) => (
                    <div key={`${idx}-dup`} className="scroll-item">
                      <div 
                        className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 image-hover-effect"
                        onClick={() => openModal(`/images/${img}.jpeg`, `Training Session ${idx + 1}`)}
                      >
                        <img 
                          src={`/images/${img}.jpeg`} 
                          alt={`Training Session ${idx + 1}`}
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
              <div>
                <h2 className="heading-md mb-6">Why Get Trained?</h2>
                <p className="text-body mb-6">
                  Our training programs are internationally recognized and provide you with practical skills that can make a real difference in emergency situations and community service.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-redcross-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Certified Training</h3>
                      <p className="text-gray-600">Receive internationally recognized certifications upon completion.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-redcross-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Hands-on Practice</h3>
                      <p className="text-gray-600">Learn through practical exercises and real-world scenarios.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-redcross-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Expert Instructors</h3>
                      <p className="text-gray-600">Learn from experienced professionals with field expertise.</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl image-hover-effect"
                onClick={() => openModal('/images/31.jpeg', 'Training Session')}
              >
                <img 
                  src="/images/31.jpeg" 
                  alt="Training Session" 
                  className="w-full h-full object-cover"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl image-hover-effect"
                onClick={() => openModal('/images/32.jpeg', 'Certification')}
              >
                <img 
                  src="/images/32.jpeg" 
                  alt="Certification" 
                  className="w-full h-full object-cover"
                />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div>
                <h2 className="heading-md mb-6">Enroll Today</h2>
                <p className="text-body mb-6">
                  Join thousands of trained volunteers who are making a difference in their communities. Our next training sessions are open for registration.
                </p>
                <div className="bg-red-50 border-l-4 border-redcross-red p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-lg mb-3">Upcoming Training Schedule</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>First Aid & CPR</span>
                      <span className="font-semibold">Jan 15-16, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Disaster Management</span>
                      <span className="font-semibold">Jan 22-24, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Community Health</span>
                      <span className="font-semibold">Feb 5-9, 2024</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/volunteers')}
                  className="btn-primary w-full md:w-auto"
                >
                  Register for Training
                </button>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="heading-md mb-4">Training Highlights</h2>
              <p className="text-body max-w-2xl mx-auto">
                Moments from our comprehensive training sessions across Tripura.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="relative overflow-hidden">
              <div className="continuous-scroll-wrapper">
                <div className="continuous-scroll-content">
                  {[61, 62, 63, 64].map((img, idx) => (
                    <div key={idx} className="scroll-item">
                      <div 
                        className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 image-hover-effect"
                        onClick={() => openModal(`/images/${img}.jpeg`, `Training Highlight ${idx + 1}`)}
                      >
                        <img 
                          src={`/images/${img}.jpeg`} 
                          alt={`Training Highlight ${idx + 1}`}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="continuous-scroll-content" aria-hidden="true">
                  {[61, 62, 63, 64].map((img, idx) => (
                    <div key={`${idx}-dup`} className="scroll-item">
                      <div 
                        className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 image-hover-effect"
                        onClick={() => openModal(`/images/${img}.jpeg`, `Training Highlight ${idx + 1}`)}
                      >
                        <img 
                          src={`/images/${img}.jpeg`} 
                          alt={`Training Highlight ${idx + 1}`}
                          className="w-full h-64 object-cover"
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

      <section className="section-padding bg-redcross-red text-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-md mb-6">Invest in Life-Saving Skills</h2>
              <p className="text-xl mb-8 text-red-100">
                Equip yourself with the knowledge and skills to respond effectively in emergencies and serve your community with confidence.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => navigate('/blog/volunteer-training-programs')}
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

      <ImageModal 
        isOpen={modalImage.isOpen}
        onClose={closeModal}
        imageSrc={modalImage.src}
        imageAlt={modalImage.alt}
      />
    </PageTransition>
  );
}

export default Training;
