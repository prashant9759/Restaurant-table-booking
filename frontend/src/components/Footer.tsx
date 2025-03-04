import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TableReserve</h3>
            <p className="text-gray-300">Find and book the perfect table at your favorite restaurants.</p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Discover</h3>
            <ul className="space-y-2">
              <li><Link to="/search" className="text-gray-300 hover:text-white">Restaurants</Link></li>
              <li><Link to="/search" className="text-gray-300 hover:text-white">Cuisines</Link></li>
              <li><Link to="/search" className="text-gray-300 hover:text-white">Cities</Link></li>
              <li><Link to="/search" className="text-gray-300 hover:text-white">Special Offers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Restaurants</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Partner with us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Restaurant Login</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Business Resources</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Marketing Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">FAQs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TableReserve. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;