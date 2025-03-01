import { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css"; // Importing the CSS file

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");

  // Dummy Restaurant Data
  const restaurants = [
    {
      name: "Sakura - The Metropolitan Hotel",
      city: "Delhi",
      state: "Delhi",
      cuisine: "Japanese",
      rating: 4.5,
      price: "₹₹₹",
      image: "https://b.zmtcdn.com/data/pictures/6/2776/22cd36ce162519af08f42de81d0b5ea2.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
    },
    {
      name: "Barbeque Nation",
      city: "Mumbai",
      state: "Maharashtra",
      cuisine: "BBQ",
      rating: 4.7,
      price: "₹₹",
      image: "https://www.barbequenation.com/_next/image?url=https%3A%2F%2Fapi.barbequenation.com%2Fsites%2Fdefault%2Ffiles%2F2019-12%2F114.%2520gallery%2520857x491_21.jpg&w=640&q=75",
    },
    {
      name: "Punjabi Tadka",
      city: "Chandigarh",
      state: "Punjab",
      cuisine: "North Indian",
      rating: 4.3,
      price: "₹₹",
      image: "https://content.jdmagicbox.com/v2/comp/delhi/d5/011pxx11.xx11.240105020513.u6d5/catalogue/punjabi-tadka-bisrakh-greater-noida-restaurants-um3tddg1h9.jpg",
    },
    {
      name: "The Royal Dine",
      city: "Bangalore",
      state: "Karnataka",
      cuisine: "Continental",
      rating: 4.8,
      price: "₹₹₹",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/7e/76/f7/ambiance.jpg?w=700&h=400&s=1",
    },
    {
      name: "Spice Nation",
      city: "Hyderabad",
      state: "Telangana",
      cuisine: "South Indian",
      rating: 4.6,
      price: "₹₹",
      image: "https://content.jdmagicbox.com/comp/hyderabad/l1/040pxx40.xx40.161101123356.f2l1/catalogue/spice-nation-kondapur-hyderabad-multicuisine-restaurants-4xoi3e6h9o.jpg",
    },
    {
      name: "Flavors of Bengal",
      city: "Kolkata",
      state: "West Bengal",
      cuisine: "Bengali",
      rating: 4.4,
      price: "₹₹",
      image: "https://www.bengalicuisine.net/wp-content/uploads/2010/11/restaurant.jpg",
    },
    {
      name: "Rajwadi Bhojan",
      city: "Jaipur",
      state: "Rajasthan",
      cuisine: "Rajasthani",
      rating: 4.7,
      price: "₹₹₹",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/c7/2c/a6/photo3jpg.jpg?w=700&h=500&s=1",
    },
  ];

  // Extract unique states for filtering
  const states = [...new Set(restaurants.map((res) => res.state))];

  // Filtering restaurants
  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedState === "" || restaurant.state === selectedState) &&
      (selectedCuisine === "" || restaurant.cuisine === selectedCuisine)
  );

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Discover the Best Restaurants Near You</h1>
        <p>Find & book your favorite restaurants in one place.</p>
        <input
          type="text"
          placeholder="Search for restaurants across India..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* State Selection */}
      <div className="state-list">
        <h2>Select State</h2>
        <div className="state-buttons">
          <button onClick={() => setSelectedState("")} className={selectedState === "" ? "active" : ""}>
            All
          </button>
          {states.map((state, index) => (
            <button key={index} onClick={() => setSelectedState(state)} className={selectedState === state ? "active" : ""}>
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine Filter */}
      <div className="filter-section">
        <h2>Filter by Cuisine</h2>
        <select onChange={(e) => setSelectedCuisine(e.target.value)}>
          <option value="">All</option>
          <option value="North Indian">North Indian</option>
          <option value="South Indian">South Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Japanese">Japanese</option>
          <option value="BBQ">BBQ</option>
          <option value="Continental">Continental</option>
          <option value="Bengali">Bengali</option>
          <option value="Rajasthani">Rajasthani</option>
        </select>
      </div>

      {/* Restaurant Listings */}
      <div className="restaurant-list">
        {filteredRestaurants.map((restaurant, index) => (
          <div key={index} className="restaurant-card">
            <img src={restaurant.image} alt={restaurant.name} />
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p>
                {restaurant.city}, {restaurant.state} - {restaurant.cuisine}
              </p>
              <p className="rating">
                ⭐ {restaurant.rating} | {restaurant.price}
              </p>
              <button
                className="book-now-btn"
                onClick={() => alert("Please log in to book this restaurant.")}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
