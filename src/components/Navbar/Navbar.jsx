import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const navItems = [
  { path: '/', label: 'About Me' },
  { path: '/education', label: 'Education' },
  { path: '/goals', label: 'Goals' },
  { path: '/experience', label: 'IT Experience' },
  { path: '/achievements', label: 'Achievements & Certifications' },
  { path: '/hobbies', label: 'Hobbies' },
  { path: '/music', label: 'Music Playlist' },
  { path: '/gallery', label: 'Photo Gallery' },
  { path: '/mylove', label: 'My Love' },
  { path: '/photobooth', label: 'Photobooth' },
  { path: '/feedback', label: 'Feedback' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button className="mobile-menu-btn" onClick={toggleMenu}>
        <div style={{ width: '24px', height: '2px', background: 'var(--text-color)', marginBottom: '6px' }}></div>
        <div style={{ width: '24px', height: '2px', background: 'var(--text-color)', marginBottom: '6px' }}></div>
        <div style={{ width: '24px', height: '2px', background: 'var(--text-color)' }}></div>
      </button>

      <ul className={`nav-list ${isOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <li key={item.path} className="nav-item" onClick={() => setIsOpen(false)}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
