import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm">
                <img 
                  src="/images/65.png" 
                  alt="Indian Red Cross Society Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="font-bold text-lg">Indian Red Cross</div>
                <div className="text-sm text-gray-400">Tripura State Branch</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Serving humanity with compassion and dedication across Tripura.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/relief" className="text-gray-400 hover:text-white transition-colors text-sm">Disaster Relief</Link></li>
              <li><Link to="/medical" className="text-gray-400 hover:text-white transition-colors text-sm">Blood Donation</Link></li>
              <li><Link to="/outreach" className="text-gray-400 hover:text-white transition-colors text-sm">Outreach Programs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li><Link to="/volunteers" className="text-gray-400 hover:text-white transition-colors text-sm">Become a Volunteer</Link></li>
              <li><Link to="/training" className="text-gray-400 hover:text-white transition-colors text-sm">Training Programs</Link></li>
              <li><Link to="/join" className="text-gray-400 hover:text-white transition-colors text-sm">Join Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Agartala, Tripura, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:ircstrp@gmail.com" className="hover:text-white transition-colors">
                  ircstrp@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919774137698" className="hover:text-white transition-colors">
                  +91 9774137698
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Indian Red Cross Society - Tripura State Branch. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/admin/login" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
