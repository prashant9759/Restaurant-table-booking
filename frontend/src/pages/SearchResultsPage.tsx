import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Filter, ChevronDown, Map, List, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock data for restaurants
const restaurants = [
  {
    id: 1,
    name: 'La Bella Italia',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Authentic Italian cuisine in a cozy atmosphere',
    cuisine: ['Italian', 'Mediterranean'],
    rating: 4.8,
    reviewCount: 243,
    price: '$$',
    location: 'Downtown',
    features: ['Outdoor Seating', 'Private Dining'],
    availableTimes: ['17:30', '18:00', '19:30', '20:00', '21:30']
  },
  {
    id: 2,
    name: 'Sakura Sushi',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Premium Japanese sushi and sashimi',
    cuisine: ['Japanese', 'Sushi'],
    rating: 4.7,
    reviewCount: 187,
    price: '$$$',
    location: 'Westside',
    features: ['Bar', 'Takeout'],
    availableTimes: ['18:00', '19:00', '20:30', '21:00']
  },
  {
    id: 3,
    name: 'El Mariachi',
    image: 'https://images.unsplash.com/photo-1653245620594-02e1d9a188f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Vibrant Mexican flavors and margaritas',
    cuisine: ['Mexican', 'Latin American'],
    rating: 4.5,
    reviewCount: 156,
    price: '$$',
    location: 'Midtown',
    features: ['Live Music', 'Full Bar'],
    availableTimes: ['17:00', '18:30', '19:00', '20:00', '21:00']
  },
  {
    id: 4,
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Authentic Indian curries and tandoori specialties',
    cuisine: ['Indian', 'Vegetarian'],
    rating: 4.6,
    reviewCount: 198,
    price: '$$',
    location: 'Eastside',
    features: ['Vegetarian Friendly', 'Delivery'],
    availableTimes: ['17:30', '18:00', '19:00', '20:30']
  },
  {
    id: 5,
    name: 'Golden Dragon',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Traditional Chinese dishes and dim sum',
    cuisine: ['Chinese', 'Dim Sum'],
    rating: 4.4,
    reviewCount: 167,
    price: '$$',
    location: 'Chinatown',
    features: ['Family Style', 'Group Friendly'],
    availableTimes: ['17:00', '18:00', '19:30', '20:00']
  },
  {
    id: 6,
    name: 'Le Petit Bistro',
    image: 'https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Classic French cuisine with a modern twist',
    cuisine: ['French', 'European'],
    rating: 4.9,
    reviewCount: 213,
    price: '$$$$',
    location: 'Downtown',
    features: ['Romantic', 'Wine Bar'],
    availableTimes: ['18:30', '19:00', '20:00', '21:30']
  },
];

// Available cuisines for filter
const cuisines = [
  'Italian', 'Japanese', 'Mexican', 'Indian', 'Chinese', 'French', 
  'Mediterranean', 'Sushi', 'Latin American', 'Vegetarian', 'Dim Sum', 'European'
];

// Available features for filter
const features = [
  'Outdoor Seating', 'Private Dining', 'Bar', 'Takeout', 'Live Music', 
  'Full Bar', 'Vegetarian Friendly', 'Delivery', 'Family Style', 
  'Group Friendly', 'Romantic', 'Wine Bar'
];

const SearchResultsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Toggle cuisine selection
  const toggleCuisine = (cuisine: string) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter(c => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };
  
  // Toggle feature selection
  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };
  
  // Toggle price range selection
  const togglePriceRange = (price: string) => {
    if (priceRange.includes(price)) {
      setPriceRange(priceRange.filter(p => p !== price));
    } else {
      setPriceRange([...priceRange, price]);
    }
  };
  
  // Filter restaurants based on selected filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    // Filter by search query
    if (searchQuery && !restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !restaurant.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by cuisine
    if (selectedCuisines.length > 0 && !restaurant.cuisine.some(c => selectedCuisines.includes(c))) {
      return false;
    }
    
    // Filter by features
    if (selectedFeatures.length > 0 && !restaurant.features.some(f => selectedFeatures.includes(f))) {
      return false;
    }
    
    // Filter by price range
    if (priceRange.length > 0 && !priceRange.includes(restaurant.price)) {
      return false;
    }
    
    // Filter by minimum rating
    if (restaurant.rating < minRating) {
      return false;
    }
    
    return true;
  });
  
  // Sort restaurants based on selected sort option
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'price-low') {
      return a.price.length - b.price.length;
    } else if (sortBy === 'price-high') {
      return b.price.length - a.price.length;
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-50 py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search restaurants, cuisines, or locations"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-between md:justify-end space-x-4">
              <div className="relative">
                <input
                  type="date"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <Clock className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              
              <button 
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} className="mr-2" />
                Filters
              </button>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button 
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
                <button 
                  className={`px-3 py-2 ${viewMode === 'map' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setViewMode('map')}
                >
                  <Map size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Cuisine Filter */}
                <div>
                  <h3 className="font-semibold mb-2">Cuisine</h3>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {cuisines.map((cuisine, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`cuisine-${index}`}
                          checked={selectedCuisines.includes(cuisine)}
                          onChange={() => toggleCuisine(cuisine)}
                          className="mr-2"
                        />
                        <label htmlFor={`cuisine-${index}`}>{cuisine}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div>
                  <h3 className="font-semibold mb-2">Price Range</h3>
                  <div className="flex space-x-2">
                    {['$', '$$', '$$$', '$$$$'].map((price, index) => (
                      <button
                        key={index}
                        className={`px-3 py-1 border ${priceRange.includes(price) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'} rounded-md`}
                        onClick={() => togglePriceRange(price)}
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Rating Filter */}
                <div>
                  <h3 className="font-semibold mb-2">Minimum Rating</h3>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={minRating}
                      onChange={(e) => setMinRating(parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <span className="ml-2 min-w-[40px]">{minRating} ★</span>
                  </div>
                </div>
                
                {/* Features Filter */}
                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`feature-${index}`}
                          checked={selectedFeatures.includes(feature)}
                          onChange={() => toggleFeature(feature)}
                          className="mr-2"
                        />
                        <label htmlFor={`feature-${index}`}>{feature}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Sort Options */}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-600">{sortedRestaurants.length} restaurants found</p>
            
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Sort by:</span>
              <select
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Restaurant Results */}
      <div className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {viewMode === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRestaurants.map((restaurant) => (
                <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name} 
                      className="w-full h-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-1">{restaurant.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{restaurant.description}</p>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="text-yellow-400" size={16} />
                        <span className="ml-1 text-gray-700">{restaurant.rating}</span>
                      </div>
                      <span className="mx-1 text-gray-400">•</span>
                      <span className="text-gray-700">{restaurant.reviewCount} reviews</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {restaurant.cuisine.map((type, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {type}
                        </span>
                      ))}
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {restaurant.price}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin size={16} className="mr-1" />
                      <span>{restaurant.location}</span>
                    </div>
                    
                    <div className="border-t pt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Available times for today:</p>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.availableTimes.map((time, index) => (
                          <button key={index} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded border border-indigo-100 hover:bg-indigo-100">
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-gray-200 rounded-lg h-[600px] flex items-center justify-center">
              <p className="text-gray-600 text-lg">Map view would be displayed here</p>
            </div>
          )}
          
          {/* Pagination */}
          {sortedRestaurants.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-indigo-600 rounded-md bg-indigo-600 text-white">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50">
                  3
                </button>
                <span className="px-3 py-1 text-gray-600">...</span>
                <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50">
                  10
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          )}
          
          {sortedRestaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No restaurants found matching your criteria</p>
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                onClick={() => {
                  setSelectedCuisines([]);
                  setSelectedFeatures([]);
                  setPriceRange([]);
                  setMinRating(0);
                  setSearchQuery('');
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchResultsPage;