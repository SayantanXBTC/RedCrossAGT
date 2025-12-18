import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';

function Blogs() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const articles = [
    {
      slug: 'disaster-relief-operations',
      title: 'Disaster Relief Operations in Tripura',
      category: 'Relief',
      excerpt: 'Our rapid response teams mobilize within hours of any calamity, ensuring affected communities receive immediate assistance.',
      date: 'November 2024',
      image: '/images/2.jpeg'
    },
    {
      slug: 'blood-donation-impact',
      title: 'The Life-Saving Impact of Blood Donation',
      category: 'Medical',
      excerpt: 'Over 85 blood donation camps organized, collecting 4,200+ units of blood that have saved countless lives.',
      date: 'December 2024',
      image: '/images/35.jpeg'
    },
    {
      slug: 'community-health-programs',
      title: 'Community Health and Wellness Programs',
      category: 'Outreach',
      excerpt: 'Mobile health units and regular health camps bringing essential healthcare services to remote villages.',
      date: 'October 2024',
      image: '/images/16.jpeg'
    },
    {
      slug: 'volunteer-training-programs',
      title: 'Building Capacity Through Training',
      category: 'Training',
      excerpt: 'Comprehensive training programs covering first aid, disaster management, and volunteer leadership.',
      date: 'September 2024',
      image: '/images/26.jpeg'
    },
    {
      slug: 'unity-and-social-cohesion',
      title: 'Promoting Unity and Social Awareness',
      category: 'Unity',
      excerpt: 'Building a united and inclusive society through peace education and community dialogues.',
      date: 'August 2024',
      image: '/images/43.jpeg'
    },
    {
      slug: 'volunteer-stories',
      title: 'Stories from Our Volunteer Community',
      category: 'Volunteers',
      excerpt: 'Meet the dedicated individuals who form the heart and soul of Red Cross Tripura.',
      date: 'July 2024',
      image: '/images/35.jpeg'
    },
    {
      slug: 'becoming-a-volunteer',
      title: 'Your Journey to Becoming a Red Cross Volunteer',
      category: 'Volunteers',
      excerpt: 'A rewarding journey that transforms communities and your own life through humanitarian service.',
      date: 'June 2024',
      image: '/images/40.jpeg'
    },
    {
      slug: 'emergency-response-training',
      title: 'Emergency Response and First Aid Training',
      category: 'Training',
      excerpt: 'Essential life-saving techniques and emergency response protocols for community preparedness.',
      date: 'December 2024',
      image: '/images/26.jpeg'
    }
  ];

  const categories = ['all', 'Relief', 'Medical', 'Outreach', 'Training', 'Unity', 'Volunteers'];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <PageTransition>
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <img 
          src="/images/30.jpeg" 
          alt="Our Stories and Articles" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-redcross-red/90 via-redcross-red/70 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <h1 className="heading-xl text-white mb-4">Stories & Articles</h1>
            <p className="text-lg md:text-xl text-white max-w-2xl">
              Explore our work, impact stories, and insights from the field across Tripura.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionReveal>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-redcross-red text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  {category === 'all' ? 'All Articles' : category}
                </button>
              ))}
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, idx) => (
              <SectionReveal key={article.slug} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-red-100 text-redcross-red px-3 py-1 rounded-full text-sm font-semibold">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <button
                      onClick={() => navigate(`/blog/${article.slug}`)}
                      className="text-redcross-red font-semibold hover:underline flex items-center space-x-2 group"
                    >
                      <span>Read Article</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-md mb-6">Stay Connected</h2>
              <p className="text-body mb-8">
                Want to stay updated with our latest stories, programs, and impact? Get in touch with us or join our volunteer community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => navigate('/volunteers')}
                  className="btn-primary"
                >
                  Become a Volunteer
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="btn-secondary"
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

export default Blogs;
