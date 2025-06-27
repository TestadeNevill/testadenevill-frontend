import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkStyles = ({ isActive }) =>
    isActive ? "text-green-700 font-semibold" : "text-gray-700";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-green-700">TestaDeNevill</NavLink>

        {/* Hamburger icon (hidden on md+) */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-6 text-lg">
          <NavLink to="/" className={navLinkStyles}>Home</NavLink>
          <NavLink to="/about" className={navLinkStyles}>About</NavLink>
          <NavLink to="/projects" className={navLinkStyles}>Projects</NavLink>
          <NavLink to="/blog" className={navLinkStyles}>Blog</NavLink>
          <NavLink to="/contact" className={navLinkStyles}>Contact</NavLink>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={navLinkStyles}>Home</NavLink><br />
          <NavLink to="/about" onClick={() => setIsOpen(false)} className={navLinkStyles}>About</NavLink><br />
          <NavLink to="/projects" onClick={() => setIsOpen(false)} className={navLinkStyles}>Projects</NavLink><br />
          <NavLink to="/blog" onClick={() => setIsOpen(false)} className={navLinkStyles}>Blog</NavLink><br />
          <NavLink to="/contact" onClick={() => setIsOpen(false)} className={navLinkStyles}>Contact</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
