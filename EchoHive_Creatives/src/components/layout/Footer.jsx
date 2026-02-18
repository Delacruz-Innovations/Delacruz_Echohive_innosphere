import React from 'react';
import Logo from '../../assets/Images/fullLogo.png'
import { Link } from 'react-router-dom';
import pdf from '../../assets/Complaint.pdf';
export default function Footer() {
  return (
    <footer className="bg-black z-[2400]] text-white">
      {/* Main Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <ul className="flex flex-wrap justify-between items-center gap-6">
            <li>
              <Link to="work" className="text-sm font-bold tracking-wider hover:text-gray-300 transition-colors">
                WORK
              </Link>
            </li>
            <li>
              <Link to="services" className="text-sm font-bold tracking-wider hover:text-gray-300 transition-colors">
                SERVICES
              </Link>
            </li>
            <li>
              <Link to="about" className="text-sm font-bold tracking-wider hover:text-gray-300 transition-colors">
                ABOUT
              </Link>
            </li>
            <li>
              <Link to="locations" className="text-sm font-bold tracking-wider hover:text-gray-300 transition-colors">
                LOCATIONS
              </Link>
            </li>
            <li>
              <Link to="news" className="text-sm font-bold tracking-wider hover:text-gray-300 transition-colors">
                NEWS
              </Link>
            </li>
            <li>
              <Link to="careers" className="text-sm font-bold tracking-wider hover:text-gray-300 transition-colors">
                CAREERS
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Social Media Links */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <a target='_blank' href="https://www.instagram.com/echohive.creative/" className="text-sm font-bold tracking-wider hover:text-gray-300 transition-colors">
              INSTAGRAM
            </a>
            <a target='_blank' href="https://web.facebook.com/profile.php?id=61582716495129" className="text-sm font-bold tracking-wider hover:text-gray-300 transition-colors">
              FACEBOOK
            </a>
            <a target='_blank' href="https://www.tiktok.com/@echohive.creative" className="text-sm font-bold tracking-wider hover:text-gray-300 transition-colors">
              TIKTOK
            </a>
            <a target='_blank' href="https://x.com/echohiveCreativ" className="text-sm font-bold tracking-wider hover:text-gray-300 transition-colors">
              TWITTER
            </a>
          </div>
        </div>
      </div>

      {/* Logo and Company Info */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center flex-wrap gap-8">
          {/* DC Logo */}
          <div className="w-48 font-black tracking-tighter">
            <Link to='/'>  <img src={Logo} alt="" /> </Link>
          </div>

          {/* Dentsu Company */}
          <div className="text-right">

            <span className="text-sm font-bold">Echohive</span>

          </div>
        </div>
      </div>

      {/* Bottom Links and Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap justify-between items-center gap-4 text-xs text-gray-400">
            <div className="flex flex-wrap gap-6">
              <Link href="#privacy" className="hover:text-white transition-colors">
                Privacy Statement
              </Link>

              <Link href="#terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <a
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Complaints Channel
              </a>
            </div>
            <div>
              © Echohive creatives 2025
            </div>
          </div>
        </div>
      </div>


    </footer>
  );
}