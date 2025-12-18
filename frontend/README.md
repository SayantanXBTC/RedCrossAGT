# Frontend - Indian Red Cross Society Tripura

A modern, responsive website for the Indian Red Cross Society - Tripura State Branch, built with React, Tailwind CSS, Framer Motion, and Swiper.

## Features

- **Responsive Design**: Mobile-first approach with full responsiveness
- **Smooth Animations**: Page transitions and scroll animations using Framer Motion
- **Image Carousels**: Interactive image galleries using Swiper
- **Professional UI**: Clean, modern design inspired by NGO best practices
- **Chatbot Integration**: AI-powered chatbot for visitor assistance (UI ready)

## Pages

- **Home**: Hero section, impact stats, service overview
- **Disaster Relief**: Emergency response and relief operations
- **Blood Donation**: Blood donation programs and camps
- **Community Outreach**: Health awareness and community programs
- **Training**: Capacity building and certification programs
- **Unity & Awareness**: Social cohesion and awareness initiatives
- **Volunteers**: Volunteer opportunities and testimonials
- **Join Us**: Membership application and benefits
- **Contact**: Contact information and inquiry form

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Swiper**: Touch slider library
- **React Router**: Client-side routing

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Relief.jsx
│   ├── Medical.jsx
│   ├── Outreach.jsx
│   ├── Training.jsx
│   ├── Unity.jsx
│   ├── Volunteers.jsx
│   ├── Join.jsx
│   └── Contact.jsx
├── components/
│   ├── layout/         # Layout components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── common/         # Reusable components
│   │   ├── Chatbot.jsx
│   │   ├── PageTransition.jsx
│   │   └── SectionReveal.jsx
│   └── ui/             # UI components
├── assets/
│   └── styles/         # Global styles
├── services/           # API services
├── hooks/              # Custom React hooks
└── utils/              # Utility functions
```

## Images

All images are stored in `public/images/` directory (1.jpeg to 64.jpeg) and are used throughout the site for:
- Hero sections
- Service showcases
- Image carousels
- Testimonials
- Activity documentation

## Styling

The project uses Tailwind CSS with custom configuration:
- Custom color palette (Red Cross red theme)
- Custom typography scale
- Reusable component classes
- Responsive breakpoints
- Smooth transitions and animations

## Notes

- Frontend only implementation (Stage 2)
- No backend integration yet
- Chatbot UI is ready but not connected to backend
- All forms are UI-only (no submission logic)
- Images use .jpeg extension
