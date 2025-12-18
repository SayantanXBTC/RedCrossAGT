import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';
import ImageModal from '../components/common/ImageModal';

function Outreach() {
  const navigate = useNavigate();
  
  const [modalImage, setModalImage] = useState({ isOpen: false, src: '', alt: '' });

  const openModal = (src, alt) => {
    setModalImage({ isOpen: true, src, alt });
  };

  const closeModal = () => {
    setModalImage({ isOpen: false, src: '', alt: '' });
  };

  const programs = [
    {
      title: 'Health & Hygiene Awareness',
      description: 'Community education programs on sanitation, hygiene practices, and preventive healthcare.',
      image: 34
    },
    {
      title: 'First Aid Training',
      description: 'Teaching essential first aid skills to community members for emergency response.',
      image: 56
    },
    {
      title: 'Nutrition Programs',
      description: 'Addressing malnutrition through awareness and supplementary nutrition initiatives.',
      image: 19
    },
    {
      title: 'Women Empowerment',
      description: 'Skill development and livelihood programs for women in rural communities.',
      image: 18
    },
  ];

  const outreachImages = [20, 21, 22, 23, 24, 25];

  return (
    <PageTransition>
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src="/images/16.jpeg" 
          alt="Community Outreach" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <h1 className="heading-xl text-white mb-4">Community Outreach Programs</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Empowering communities through education, health awareness, and sustainable development initiatives.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="heading-md mb-4">Building Stronger Communities</h2>
              <p className="text-body max-w-3xl mx-auto">
                Our outreach programs are designed to create lasting positive change by addressing the root causes of vulnerability and empowering communities with knowledge and resources.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, idx) => (
              <SectionReveal key={idx} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div 
                    className="h-64 overflow-hidden image-hover-effect"
                    onClick={() => openModal(`/images/${program.image}.jpeg`, program.title)}
                  >
                    <img 
                      src={`/images/${program.image}.jpeg`} 
                      alt={program.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-4xl mb-3">{program.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{program.title}</h3>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    <button 
                      onClick={() => navigate('/blog/community-health-programs')}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div>
                <h2 className="heading-md mb-6">Reaching Every Corner</h2>
                <p className="text-body mb-6">
                  Our mobile outreach teams travel to remote villages and underserved areas, bringing essential services and education directly to communities that need them most.
                </p>
                <p className="text-body mb-6">
                  From health camps to awareness sessions, we ensure that no community is left behind in our mission to create a healthier, more informed society.
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-redcross-red">
                    <h4 className="font-semibold text-redcross-red mb-1">Mobile Health Units</h4>
                    <p className="text-sm text-gray-600">Bringing healthcare to remote areas</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-redcross-red">
                    <h4 className="font-semibold text-redcross-red mb-1">Educational Workshops</h4>
                    <p className="text-sm text-gray-600">Knowledge sharing and skill building</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-redcross-red">
                    <h4 className="font-semibold text-redcross-red mb-1">Community Partnerships</h4>
                    <p className="text-sm text-gray-600">Collaborating with local organizations</p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl image-hover-effect"
                onClick={() => openModal('/images/20.jpeg', 'Outreach Activities')}
              >
                <img 
                  src="/images/20.jpeg" 
                  alt="Outreach Activities" 
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
              <h2 className="heading-md mb-4">Our Outreach in Action</h2>
              <p className="text-body max-w-2xl mx-auto">
                Witness the impact of our community programs across Tripura.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="relative overflow-hidden">
              <div className="continuous-scroll-wrapper">
                <div className="continuous-scroll-content">
                  {outreachImages.map((img, idx) => (
                    <div key={idx} className="scroll-item">
                      <div 
                        className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 image-hover-effect"
                        onClick={() => openModal(`/images/${img}.jpeg`, `Outreach Program ${idx + 1}`)}
                      >
                        <img 
                          src={`/images/${img}.jpeg`} 
                          alt={`Outreach Program ${idx + 1}`}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="continuous-scroll-content" aria-hidden="true">
                  {outreachImages.map((img, idx) => (
                    <div key={`${idx}-dup`} className="scroll-item">
                      <div 
                        className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 image-hover-effect"
                        onClick={() => openModal(`/images/${img}.jpeg`, `Outreach Program ${idx + 1}`)}
                      >
                        <img 
                          src={`/images/${img}.jpeg`} 
                          alt={`Outreach Program ${idx + 1}`}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl image-hover-effect"
                onClick={() => openModal('/images/21.jpeg', 'Community Impact')}
              >
                <img 
                  src="/images/21.jpeg" 
                  alt="Community Impact" 
                  className="w-full h-full object-cover"
                />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div>
                <h2 className="heading-md mb-6">Creating Lasting Change</h2>
                <p className="text-body mb-6">
                  Our approach goes beyond immediate assistance. We work with communities to build capacity, develop local leadership, and create sustainable solutions to long-term challenges.
                </p>
                <div className="bg-red-50 border-l-4 border-redcross-red p-6 rounded-lg mb-6">
                  <p className="text-gray-700 italic">
                    "The health awareness program changed how our village thinks about hygiene and disease prevention. We are now healthier and more informed."
                  </p>
                  <p className="text-sm text-gray-600 mt-3">— Village Leader, Rural Tripura</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-3xl font-bold text-redcross-red mb-1">140+</div>
                    <div className="text-sm text-gray-600">Villages Reached</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-3xl font-bold text-redcross-red mb-1">8,500+</div>
                    <div className="text-sm text-gray-600">People Benefited</div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-redcross-red text-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-md mb-6">Join Our Outreach Efforts</h2>
              <p className="text-xl mb-8 text-red-100">
                Help us expand our reach and impact more communities. Your support enables us to bring essential services to those who need them most.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => navigate('/blog/community-health-programs')}
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

export default Outreach;
