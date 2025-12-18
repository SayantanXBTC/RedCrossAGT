import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import SectionReveal from '../components/common/SectionReveal';

function Blog() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const articles = {
    'disaster-relief-operations': {
      title: 'Disaster Relief Operations in Tripura',
      date: 'November 2024',
      image: '/images/2.jpeg',
      content: [
        'The Indian Red Cross Society - Tripura State Branch has been at the forefront of disaster relief operations across the state. Our rapid response teams are trained to mobilize within hours of any calamity, ensuring that affected communities receive immediate assistance.',
        'During the recent monsoon season, our volunteers worked tirelessly to provide relief to flood-affected areas. We distributed essential supplies including food packets, clean drinking water, blankets, and medical aid to over 3,000 families across 45 villages.',
        'Our disaster management approach focuses on three key phases: preparedness, response, and recovery. We conduct regular training sessions for community volunteers, maintain emergency supply stockpiles, and coordinate closely with local authorities to ensure efficient relief operations.',
        'The dedication of our volunteers has been instrumental in saving lives and providing hope to communities during their darkest hours. We continue to strengthen our disaster response capabilities through ongoing training and resource mobilization.'
      ]
    },
    'emergency-response-training': {
      title: 'Emergency Response and First Aid Training',
      date: 'December 2024',
      image: '/images/26.jpeg',
      content: [
        'Emergency response training is critical for saving lives during disasters and medical emergencies. Our comprehensive first aid and CPR training programs have certified over 1,800 individuals across Tripura.',
        'Participants learn essential life-saving techniques including cardiopulmonary resuscitation (CPR), wound care, fracture management, and emergency response protocols. Our hands-on training approach ensures that volunteers gain practical skills they can apply in real-world situations.',
        'We conduct regular training sessions in communities, schools, and workplaces, making emergency preparedness accessible to everyone. Our certified instructors bring years of field experience and follow international Red Cross training standards.',
        'The impact of our training programs is evident in numerous instances where trained volunteers have successfully provided first aid during emergencies, saving lives before professional medical help arrived. We continue to expand our training reach across the state.'
      ]
    },
    'blood-donation-impact': {
      title: 'The Life-Saving Impact of Blood Donation',
      date: 'December 2024',
      image: '/images/35.jpeg',
      content: [
        'Blood donation is one of the most impactful ways to contribute to society. At Red Cross Tripura, we have organized over 85 blood donation camps across the state, collecting more than 4,200 units of blood that have saved countless lives.',
        'Our regular blood donors form the backbone of our blood donation program. These dedicated individuals understand that their single donation can save up to three lives, making it one of the most powerful acts of kindness.',
        'We work closely with hospitals and medical facilities across Tripura to ensure blood availability during emergencies. Our 24/7 blood bank coordination system helps match donors with patients in need, reducing critical waiting times.',
        'Every blood donation camp is conducted with the highest safety standards. Donors receive complimentary health screenings, and all equipment used is sterile and disposable. We encourage healthy individuals aged 18-65 to become regular donors and join our life-saving mission.'
      ]
    },
    'community-health-programs': {
      title: 'Community Health and Wellness Programs',
      date: 'October 2024',
      image: '/images/16.jpeg',
      content: [
        'Our community health programs reach remote villages and underserved areas across Tripura, bringing essential healthcare services and health education to those who need it most.',
        'Through mobile health units and regular health camps, we provide free health screenings, basic medical consultations, and health awareness sessions. Our focus areas include maternal and child health, hygiene promotion, and disease prevention.',
        'We have trained over 420 community health workers who serve as health ambassadors in their villages. These trained volunteers conduct regular awareness sessions on topics like nutrition, sanitation, and preventive healthcare.',
        'The impact of our health programs is evident in the improved health indicators in the communities we serve. We continue to expand our reach and strengthen our partnerships with local health authorities to create healthier communities across Tripura.'
      ]
    },
    'volunteer-training-programs': {
      title: 'Building Capacity Through Training',
      date: 'September 2024',
      image: '/images/26.jpeg',
      content: [
        'Training and capacity building are at the heart of our mission. We believe that well-trained volunteers are the key to effective humanitarian service.',
        'Our comprehensive training programs cover first aid, disaster management, community health, and volunteer leadership. Over 1,800 individuals have been certified in first aid, and 950 volunteers have completed our disaster response training.',
        'All our training programs follow international Red Cross standards and are conducted by experienced instructors with field expertise. Participants receive hands-on practice through simulations and real-world scenarios.',
        'We offer both basic and advanced training modules, ensuring that volunteers can continuously upgrade their skills. Our training calendar includes regular refresher courses and specialized workshops to keep our volunteer network prepared and confident.'
      ]
    },
    'unity-and-social-cohesion': {
      title: 'Promoting Unity and Social Awareness',
      date: 'August 2024',
      image: '/images/43.jpeg',
      content: [
        'Building a united and inclusive society is fundamental to our mission. Our unity and social awareness programs work to break down barriers and create spaces where everyone feels valued.',
        'We have engaged over 1,500 youth in our leadership and peace education programs. These young change-makers are now leading unity initiatives in their communities, organizing cultural exchanges, and facilitating dialogues that bridge divides.',
        'Our 120 peace workshops have reached communities across Tripura, addressing issues of discrimination, inequality, and social exclusion. We promote values of tolerance, respect, and mutual understanding through interactive sessions and community activities.',
        'The cultural events and community dialogues we organize celebrate diversity and strengthen social bonds. We believe that a strong, united community is built on mutual respect and shared values, and we continue to work towards this vision every day.'
      ]
    },
    'volunteer-stories': {
      title: 'Stories from Our Volunteer Community',
      date: 'July 2024',
      image: '/images/35.jpeg',
      content: [
        'Our volunteers are the heart and soul of Red Cross Tripura. Their dedication, compassion, and selfless service inspire us every day.',
        'Meet Priya, who has been volunteering with us since 2020. As an emergency response volunteer, she has participated in numerous relief operations, helping families rebuild their lives after disasters. "Being a Red Cross volunteer has given my life purpose," she says.',
        'Rahul, a member of our blood donation coordination team, has helped organize over 30 blood camps. His efforts have directly contributed to saving hundreds of lives. "Every time I see a patient receive blood, I know our work matters," he shares.',
        'Our volunteer network of 850+ dedicated individuals represents the true spirit of humanitarian service. They come from all walks of life, united by a common goal: to serve humanity with compassion and dignity. We are proud of each and every one of them.'
      ]
    },
    'becoming-a-volunteer': {
      title: 'Your Journey to Becoming a Red Cross Volunteer',
      date: 'June 2024',
      image: '/images/40.jpeg',
      content: [
        'Becoming a Red Cross volunteer is a rewarding journey that transforms not just the communities you serve, but your own life as well. Our volunteer program welcomes individuals from all backgrounds who share a passion for humanitarian service.',
        'The process begins with a simple application where you share your interests and availability. We offer flexible volunteering opportunities ranging from emergency response to blood donation coordination, community health work, and training facilitation.',
        'Once you join, you will attend an orientation session to learn about Red Cross principles and operations. Depending on your chosen role, you will receive specialized training to equip you with the skills needed to make a meaningful impact.',
        'Our volunteers enjoy numerous benefits including certified training, networking opportunities, personal growth, and the satisfaction of making a real difference in people\'s lives. Join our community of 850+ volunteers and be part of something greater than yourself.'
      ]
    }
  };

  const article = articles[slug] || articles['disaster-relief-operations'];

  return (
    <PageTransition>
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <button 
              onClick={() => navigate(-1)}
              className="text-white mb-4 flex items-center space-x-2 hover:text-red-200 transition-colors text-sm md:text-base"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back</span>
            </button>
            <h1 className="heading-xl text-white mb-4">{article.title}</h1>
            <p className="text-lg md:text-xl text-gray-200">{article.date}</p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <SectionReveal>
            <article className="prose prose-lg max-w-none">
              {article.content.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {paragraph}
                </p>
              ))}
            </article>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(articles)
                  .filter(([key]) => key !== slug)
                  .slice(0, 3)
                  .map(([key, art]) => (
                    <button
                      key={key}
                      onClick={() => navigate(`/blog/${key}`)}
                      className="text-left bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <img src={art.image} alt={art.title} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{art.title}</h4>
                        <p className="text-sm text-gray-600">{art.date}</p>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="section-padding bg-redcross-red text-white">
        <div className="container-custom">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-md mb-6">Get Involved</h2>
              <p className="text-lg md:text-xl mb-8 text-red-100">
                Join us in our mission to serve humanity with compassion and dedication.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <button 
                  onClick={() => navigate('/volunteers')}
                  className="bg-white text-redcross-red px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Become a Volunteer
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-white hover:text-redcross-red transition-all duration-300"
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

export default Blog;
