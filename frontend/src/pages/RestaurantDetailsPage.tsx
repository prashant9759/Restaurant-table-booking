import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Phone, Clock, Calendar, Users, ChevronLeft, ChevronRight, Share2, Heart, Info, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock restaurant data
const restaurantData = {
  id: 1,
  name: 'La Bella Italia',
  images: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  ],
  description: 'La Bella Italia brings the authentic flavors of Italy to your table. Our chefs use traditional recipes and the freshest ingredients to create dishes that transport you straight to the heart of Italy. From hand-made pasta to wood-fired pizzas, every dish is crafted with passion and care.',
  longDescription: 'Founded in 2005 by the Rossi family, La Bella Italia has become a beloved fixture in the local dining scene. Our restaurant combines old-world charm with modern elegance, creating the perfect atmosphere for a romantic dinner, family gathering, or business lunch. \n\nOur menu features regional specialties from across Italy, with a focus on traditional techniques and seasonal ingredients. Our wine list has been carefully curated to complement our food offerings, featuring selections from Italy\'s finest vineyards. \n\nWe pride ourselves on warm, attentive service and an authentic dining experience that keeps our guests coming back time after time.',
  cuisine: ['Italian', 'Mediterranean'],
  rating: 4.8,
  reviewCount: 243,
  price: '$$',
  address: '123 Main Street, Downtown',
  phone: '(555) 123-4567',
  website: 'www.labellaitaliarestaurant.com',
  hours: {
    Monday: '11:30 AM - 10:00 PM',
    Tuesday: '11:30 AM - 10:00 PM',
    Wednesday: '11:30 AM - 10:00 PM',
    Thursday: '11:30 AM - 10:00 PM',
    Friday: '11:30 AM - 11:00 PM',
    Saturday: '11:30 AM - 11:00 PM',
    Sunday: '12:00 PM - 9:00 PM',
  },
  features: ['Outdoor Seating', 'Private Dining', 'Full Bar', 'Wine List', 'Takeout', 'Wheelchair Accessible'],
  specialties: ['Homemade Pasta', 'Wood-Fired Pizza', 'Tiramisu', 'Risotto'],
};

// Mock table types
const tableTypes = [
  {
    id: 1,
    name: 'Standard Table',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    capacity: '2-4 people',
    description: 'Comfortable standard tables in our main dining area',
    features: ['Central location', 'Standard service'],
    price: 'No additional fee',
  },
  {
    id: 2,
    name: 'Window Table',
    image: 'https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    capacity: '2-4 people',
    description: 'Enjoy your meal with a view of the street',
    features: ['Natural lighting', 'Street view', 'Romantic setting'],
    price: '+$5 reservation fee',
  },
  {
    id: 3,
    name: 'Booth',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    capacity: '4-6 people',
    description: 'Semi-private booths for a more intimate experience',
    features: ['Privacy', 'Comfortable seating', 'Quieter area'],
    price: '+$10 reservation fee',
  },
  {
    id: 4,
    name: 'Private Dining Room',
    image: 'https://images.unsplash.com/photo-1602872030490-4a484a7b3ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    capacity: '8-12 people',
    description: 'Exclusive private room for special occasions',
    features: ['Complete privacy', 'Dedicated server', 'Customizable setup'],
    price: '+$50 reservation fee',
  },
];

// Mock reviews
const reviews = [
  {
    id: 1,
    user: 'Sarah J.',
    date: '2 weeks ago',
    rating: 5,
    comment: 'Absolutely fantastic experience! The pasta was freshly made and the service was impeccable. Will definitely be coming back soon.',
  },
  {
    id: 2,
    user: 'Michael T.',
    date: '1 month ago',
    rating: 4,
    comment: 'Great food and atmosphere. The wine selection is excellent. Only reason for 4 stars is that we had to wait a bit for our table despite having a reservation.',
  },
  {
    id: 3,
    user: 'Jessica L.',
    date: '2 months ago',
    rating: 5,
    comment: 'Best Italian food in the city! The tiramisu is to die for. Highly recommend for a date night or special occasion.',
  },
];

// Mock similar restaurants
const similarRestaurants = [
  {
    id: 2,
    name: 'Trattoria Milano',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    cuisine: 'Italian',
    rating: 4.6,
    price: '$$',
  },
  {
    id: 3,
    name: 'Olive Garden',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    cuisine: 'Italian',
    rating: 4.3,
    price: '$$',
  },
  {
    id: 4,
    name: 'Mediterranean Delight',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    cuisine: 'Mediterranean',
    rating: 4.5,
    price: '$$',
  },
];

// Available time slots
const timeSlots = [
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
  '20:00', '20:30', '21:00', '21:30'
];

const RestaurantDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [partySize, setPartySize] = useState<number>(2);
  const [selectedTableType, setSelectedTableType] = useState<number | null>(null);
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  
  // Format date for display
  const formattedDate = format(selectedDate, 'EEEE, MMMM d, yyyy');
  
  // Navigate through gallery images
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === restaurantData.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? restaurantData.images.length - 1 : prevIndex - 1
    );
  };
  
  // Handle reservation submission
  const handleReservation = () => {
    if (!selectedTime || selectedTableType === null) {
      alert('Please select a time and table type');
      return;
    }
    
    // In a real app, this would send the reservation data to a server
    // For now, we'll just navigate to the confirmation page
    window.location.href = '/booking-confirmation';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Restaurant Gallery */}
      <div className="relative h-[400px] md:h-[500px]">
        <img 
          src={restaurantData.images[currentImageIndex]} 
          alt={restaurantData.name} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-between">
          <button 
            className="ml-4 p-2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-70 transition"
            onClick={prevImage}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="mr-4 p-2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-70 transition"
            onClick={nextImage}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {restaurantData.images.map((_, index) => (
            <button 
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Restaurant Details */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{restaurantData.name}</h1>
              <div className="flex space-x-2">
                <button 
                  className="p-2 border border-gray-300 rounded-full hover:bg-gray-100"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
                </button>
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <Star className="text-yellow-400" size={20} />
                <span className="ml-1 text-gray-700 font-medium">{restaurantData.rating}</span>
              </div>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-700">{restaurantData.reviewCount} reviews</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-700">{restaurantData.price}</span>
              <span className="mx-2 text-gray-400">•</span>
              <div className="flex flex-wrap">
                {restaurantData.cuisine.map((type, index) => (
                  <span key={index} className="text-gray-700">
                    {type}{index < restaurantData.cuisine.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col space-y-3 mb-6">
              <div className="flex items-start">
                <MapPin className="text-gray-600 mr-2 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-700">{restaurantData.address}</span>
              </div>
              <div className="flex items-start">
                <Phone className="text-gray-600 mr-2 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-700">{restaurantData.phone}</span>
              </div>
              <div className="flex items-start">
                <Clock className="text-gray-600 mr-2 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-700 font-medium">Hours</p>
                  {Object.entries(restaurantData.hours).map(([day, hours]) => (
                    <p key={day} className="text-gray-700">
                      <span className="font-medium">{day}:</span> {hours}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">About {restaurantData.name}</h2>
              <p className="text-gray-700 mb-4">{restaurantData.description}</p>
              <p className="text-gray-700 whitespace-pre-line">{restaurantData.longDescription}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Features & Specialties</h2>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <h3 className="font-medium mb-2">Features</h3>
                  <ul className="space-y-1">
                    {restaurantData.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Specialties</h3>
                  <ul className="space-y-1">
                    {restaurantData.specialties.map((specialty, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></div>
                        {specialty}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Reviews Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Reviews</h2>
                <button className="text-indigo-600 hover:text-indigo-800">See all reviews</button>
              </div>
              
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="text-yellow-400" size={16} />
                        <span className="ml-1">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
              
              <button className="mt-4 w-full py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
                Write a Review
              </button>
            </div>
            
            {/* Similar Restaurants */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Similar Restaurants</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarRestaurants.map((restaurant) => (
                  <a 
                    href={`/restaurant/${restaurant.id}`} 
                    key={restaurant.id} 
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    <div className="h-36 overflow-hidden">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{restaurant.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>{restaurant.cuisine}</span>
                        <span className="mx-1">•</span>
                        <span>{restaurant.price}</span>
                        <span className="mx-1">•</span>
                        <div className="flex items-center">
                          <Star className="text-yellow-400" size={14} />
                          <span className="ml-0.5">{restaurant.rating}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Reservation Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Make a Reservation</h2>
              
              {/* Date Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  />
                </div>
                <p className="text-gray-600 text-sm mt-1">{formattedDate}</p>
              </div>
              
              {/* Party Size */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Party Size</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Users size={18} className="text-gray-500" />
                  </div>
                  <select
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                    value={partySize}
                    onChange={(e) => setPartySize(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((size) => (
                      <option key={size} value={size}>
                        {size} {size === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown size={18} className="text-gray-500" />
                  </div>
                </div>
              </div>
              
              {/* Time Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      className={`py-2 border rounded-md text-sm ${
                        selectedTime === time 
                          ? 'bg-indigo-600 text-white border-indigo-600' 
                          : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500'
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Table Type Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Table Type</label>
                <div className="space-y-3">
                  {tableTypes.map((table) => (
                    <div 
                      key={table.id}
                      className={`border rounded-lg p-3 cursor-pointer ${
                        selectedTableType === table.id 
                          ? 'border-indigo-600 bg-indigo-50' 
                          : 'border-gray-300 hover:border-indigo-300'
                      }`}
                      onClick={() => setSelectedTableType(table.id)}
                    >
                      <div className="flex">
                        <div className="w-20 h-20 rounded-md overflow-hidden mr-3">
                          <img 
                            src={table.image} 
                            alt={table.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{table.name}</h3>
                          <p className="text-sm text-gray-600">{table.capacity}</p>
                          <p className="text-sm text-gray-600">{table.price}</p>
                        </div>
                      </div>
                      {selectedTableType === table.id && (
                        <div className="mt-2 text-sm text-gray-700">
                          <p>{table.description}</p>
                          <div className="mt-1">
                            <span className="font-medium">Features: </span>
                            {table.features.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Special Requests */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Special Requests</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder="Any special requests or occasions?"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>
              
              {/* Reservation Button */}
              <button
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                onClick={handleReservation}
              >
                Complete Reservation
              </button>
              
              <div className="mt-4 flex items-start text-sm text-gray-600">
                <Info size={16} className="mr-2 flex-shrink-0 mt-0.5" />
                <p>You won't be charged yet. Your credit card may be required to hold the reservation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RestaurantDetailsPage;