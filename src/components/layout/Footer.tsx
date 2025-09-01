import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import {HashLink} from 'react-router-hash-link'
import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon, ChevronDownIcon } from 'lucide-react';

export const Footer = () => {
  return <footer id='contact' className="bg-gradient-to-br from-[#503314] via-[#7C2D12] to-[#B45309] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Logo isFooter={true}/>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Connecting Rwandan youth with diaspora IT professionals for
              mentorship, jobs, projects, and returnee support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#503314] transition-all duration-300 hover:scale-110">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#503314] transition-all duration-300 hover:scale-110">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#503314] transition-all duration-300 hover:scale-110">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#503314] transition-all duration-300 hover:scale-110">
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6 text-lg">
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/opportunities" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block font-medium">
                  Opportunities
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block font-medium">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block font-medium">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/returnee" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block font-medium">
                  Returnee Hub
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block font-medium">
                  Impact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <HashLink to="/#about" className="text-primary-300 hover:text-white transition-transform duration-300 hover:translate-x-1 inline-block">
                  About Us
                </HashLink>
              </li>
              <li>
                <HashLink to="/#careers" className="text-primary-300 hover:text-white transition-transform duration-300 hover:translate-x-1 inline-block">
                  Careers
                </HashLink>
              </li>
              <li>
                <HashLink to="/#partners" className="text-primary-300 hover:text-white transition-transform duration-300 hover:translate-x-1 inline-block">
                  Partners
                </HashLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-primary-300 hover:text-white transition-transform duration-300 hover:translate-x-1 inline-block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-primary-300 hover:text-white transition-transform duration-300 hover:translate-x-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-primary-300 hover:text-white transition-transform duration-300 hover:translate-x-1 inline-block">
                  Cookie Policy
                </Link>
              </li>
            </ul>
            {/* Language Selector */}
            <div className="mt-6">
              <div className="relative">
                <select className="appearance-none bg-[#7C2D12] text-primary-200 rounded-md py-2 pl-3 pr-8 w-full focus:outline-none focus:ring-2 focus:ring-primary-400">
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="rw">Kinyarwanda</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary-300">
                  <ChevronDownIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm">
              &copy; {new Date().getFullYear()} Global Roots. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>;
};