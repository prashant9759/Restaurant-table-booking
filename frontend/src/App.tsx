import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import RestaurantDetailsPage from './pages/RestaurantDetailsPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import UserProfilePage from './pages/UserProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage';
import TableManagementPage from './pages/TableManagementPage';
import ReservationManagementPage from './pages/ReservationManagementPage';
import RestaurantManagementPage from './pages/RestaurantMmanagementPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SystemConfigPage from './pages/SystemConfigPage';
import OwenerDashboard from './pages/OwenerDashboard';
function App() {
  return (
    <Router>
      <Routes>
        {/*home page*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='table-management' element={<TableManagementPage />} />
        <Route path="/analytics" element={<AnalyticsDashboardPage />} />
        <Route path="/reservation-management" element={<ReservationManagementPage />} />
        <Route path="/restaurant-management" element={<RestaurantManagementPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/system-config" element={<SystemConfigPage />} />

        {/*owner dashboard*/}
        <Route path="/owner-dashboard" element={<OwenerDashboard />} />
        
      </Routes> 
    </Router>
  );
}

export default App;