import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ChevronRight, Star, Clock, Utensils } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const cuisineTypes = [
  { name: 'Italian', image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { name: 'Japanese', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { name: 'Mexican', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { name: 'Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { name: 'Chinese', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { name: 'French', image: 'https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
];

const featuredRestaurants = [
  {
    id: 1,
    name: 'La Bella Italia',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    cuisine: 'Italian',
    rating: 4.8,
    price: '$$',
    location: 'Downtown',
  },
  {
    id: 2,
    name: 'Sakura Sushi',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    cuisine: 'Japanese',
    rating: 4.7,
    price: '$$$',
    location: 'Westside',
  },
  {
    id: 3,
    name: 'El Mariachi',
    image: 'https://images.unsplash.com/photo-1653245620594-02e1d9a188f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    cuisine: 'Mexican',
    rating: 4.5,
    price: '$$',
    location: 'Midtown',
  },
  {
    id: 4,
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    cuisine: 'Indian',
    rating: 4.6,
    price: '$$',
    location: 'Eastside',
  },
];

const cities = [
  { name: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
  { name: 'Los Angeles', image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
  { name: 'Chicago', image: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
  { name: 'Miami', image: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
];

const HomePage: React.FC = () => {
  const [location, setLocation] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Find Your Perfect Table</h1>
          <p className="text-xl text-white mb-8">Discover and book the best restaurants in your city</p>
          
          <div className="w-full max-w-2xl bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200">
                <MapPin className="text-gray-400 mr-2" size={20} />
                <input 
                  type="text" 
                  placeholder="Enter location or restaurant name" 
                  className="w-full outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Link 
                to="/search" 
                className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-center hover:bg-indigo-700 transition duration-300"
              >
                <Search size={20} className="mr-2" />
                <span>Search</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Restaurants Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Restaurants</h2>
            <Link to="/search" className="text-indigo-600 flex items-center hover:text-indigo-800">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="text-yellow-400" size={16} />
                    <span className="ml-1 text-gray-700">{restaurant.rating}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-700">{restaurant.cuisine}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-700">{restaurant.price}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <span>{restaurant.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Browse by Cuisine */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Browse by Cuisine</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cuisineTypes.map((cuisine, index) => (
              <Link to="/search" key={index} className="relative group overflow-hidden rounded-lg shadow-md">
                <div className="h-36 overflow-hidden">
                  <img 
                    src={cuisine.image} 
                    alt={cuisine.name} 
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center">
                    <Utensils className="text-white mx-auto mb-2" size={24} />
                    <h3 className="text-white font-semibold text-lg">{cuisine.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Browse by City */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Popular Cities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city, index) => (
              <Link to="/search" key={index} className="relative group overflow-hidden rounded-lg shadow-md">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={city.image} 
                    alt={city.name} 
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white font-bold text-2xl">{city.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search</h3>
              <p className="text-gray-600">Find restaurants by location, cuisine, or name</p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book</h3>
              <p className="text-gray-600">Choose your preferred date, time, and table</p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy</h3>
              <p className="text-gray-600">Dine at your selected restaurant hassle-free</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;