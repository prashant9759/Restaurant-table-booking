import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, MapPin, Phone, Check, Share2, AlertCircle, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock reservation data
const reservationData = {
  id: 'RES-12345678',
  restaurant: {
    name: 'La Bella Italia',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    address: '123 Main Street, Downtown',
    phone: '(555) 123-4567',
  },
  date: 'Friday, June 10, 2025',
  time: '19:30',
  partySize: 4,
  tableType: 'Window Table',
  specialRequests: 'Anniversary celebration, if possible a quiet table',
};

const BookingConfirmationPage: React.FC = () => {
  // Function to add to calendar (mock)
  const addToCalendar = (type: string) => {
    alert(`Added to ${type} calendar`);
  };
  
  // Function to share reservation (mock)
  const shareReservation = (method: string) => {
    alert(`Shared via ${method}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-4">
                <Check className="text-green-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-green-800 mb-1">Reservation Confirmed!</h2>
                <p className="text-green-700">
                  Your table at {reservationData.restaurant.name} has been successfully booked. 
                  A confirmation email has been sent to your registered email address.
                </p>
              </div>
            </div>
            
            {/* Reservation Details Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">Reservation Details</h1>
                  <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                    Confirmed
                  </span>
                </div>
                
                <div className="flex flex-col md:flex-row mb-6">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="rounded-lg overflow-hidden h-40">
                      <img 
                        src={reservationData.restaurant.image} 
                        alt={reservationData.restaurant.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-6">
                    <h2 className="text-xl font-semibold mb-2">{reservationData.restaurant.name}</h2>
                    
                    <div className="space-y-2 text-gray-700 mb-4">
                      <div className="flex items-start">
                        <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
                        <span>{reservationData.restaurant.address}</span>
                      </div>
                      <div className="flex items-start">
                        <Phone size={18} className="mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
                        <span>{reservationData.restaurant.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-y-3">
                      <div className="w-full sm:w-1/2 flex items-center">
                        <Calendar size={18} className="mr-2 text-indigo-600" />
                        <span>{reservationData.date}</span>
                      </div>
                      <div className="w-full sm:w-1/2 flex items-center">
                        <Clock size={18} className="mr-2 text-indigo-600" />
                        <span>{reservationData.time}</span>
                      </div>
                      <div className="w-full sm:w-1/2 flex items-center">
                        <Users size={18} className="mr-2 text-indigo-600" />
                        <span>{reservationData.partySize} people</span>
                      </div>
                      <div className="w-full sm:w-1/2 flex items-center">
                        <div className="w-4 h-4 rounded-full bg-indigo-600 mr-2 flex-shrink-0"></div>
                        <span>{reservationData.tableType}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Reservation ID and Special Requests */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Confirmation Number</p>
                    <p className="font-mono font-medium">{reservationData.id}</p>
                  </div>
                  
                  {reservationData.specialRequests && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Special Requests</p>
                      <p className="text-gray-800">{reservationData.specialRequests}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-2">
                <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <Download size={18} className="mr-2" />
                  Download
                </button>
                <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <Share2 size={18} className="mr-2" />
                  Share
                </button>
                <Link to={`/restaurant/${1}`} className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ml-auto">
                  View Restaurant
                </Link>
              </div>
            </div>
            
            {/* Add to Calendar */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Add to Calendar</h2>
              <div className="flex flex-wrap gap-2">
                <button 
                  className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100"
                  onClick={() => addToCalendar('Google')}
                >
                  Google Calendar
                </button>
                <button 
                  className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-md hover:bg-gray-100"
                  onClick={() => addToCalendar('Apple')}
                >
                  Apple Calendar
                </button>
                <button 
                  className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100"
                  onClick={() => addToCalendar('Outlook')}
                >
                  Outlook
                </button>
              </div>
            </div>
            
            {/* Share Reservation */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Share Reservation</h2>
              <div className="flex flex-wrap gap-2">
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => shareReservation('Email')}
                >
                  Email
                </button>
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  onClick={() => shareReservation('WhatsApp')}
                >
                  WhatsApp
                </button>
                <button 
                  className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
                  onClick={() => shareReservation('SMS')}
                >
                  SMS
                </button>
              </div>
            </div>
            
            {/* Cancellation Policy */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-start">
                <AlertCircle size={20} className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">Cancellation Policy</h2>
                  <p className="text-gray-700 mb-2">
                    You can cancel your reservation up to 2 hours before your scheduled time without any charges.
                  </p>
                  <p className="text-gray-700">
                    Late cancellations or no-shows may result in a fee of $10 per person.
                  </p>
                  <button className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium">
                    Modify or Cancel Reservation
                  </button>
                </div>
              </div>
            </div>
            
            {/* Next Steps */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-indigo-800 mb-3">What's Next?</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-0.5">
                    <Check size={16} className="text-indigo-600" />
                  </div>
                  <span className="text-indigo-700">
                    You'll receive a confirmation email with all the details.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-0.5">
                    <Check size={16} className="text-indigo-600" />
                  </div>
                  <span className="text-indigo-700">
                    We'll send you a reminder 24 hours before your reservation.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-0.5">
                    <Check size={16} className="text-indigo-600" />
                  </div>
                  <span className="text-indigo-700">
                    Arrive on time and mention your reservation number to the host.
                  </span>
                </li>
              </ul>
              <div className="mt-4 text-center">
                <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmationPage;