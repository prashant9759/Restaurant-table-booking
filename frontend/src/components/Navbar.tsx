import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, LogIn } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">TableReserve</Link>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
          <Link to="/search" className="text-gray-700 hover:text-indigo-600">Restaurants</Link>
          <Link to="/profile" className="text-gray-700 hover:text-indigo-600">My Bookings</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/login" className="flex items-center text-gray-700 hover:text-indigo-600">
            <LogIn size={20} className="mr-1" />
            <span className="hidden md:inline">Login</span>
          </Link>
          <Link to="/profile" className="flex items-center text-gray-700 hover:text-indigo-600">
            <User size={20} className="mr-1" />
            <span className="hidden md:inline">Profile</span>
          </Link>
          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;