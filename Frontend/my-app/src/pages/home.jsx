import { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css"; // Importing the CSS file

const Home = () => {
  const [search, setSearch] = useState("");

  // Dummy Restaurant Data
  const restaurants = [
    {
      name: "Sakura - The Metropolitan Hotel",
      city: "Delhi",
      cuisine: "Japanese",
      rating: 4.5,
      price: "₹₹₹",
      image: "https://b.zmtcdn.com/data/pictures/6/2776/22cd36ce162519af08f42de81d0b5ea2.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
    },
    {
      name: "Barbeque Nation",
      city: "Mumbai",
      cuisine: "BBQ",
      rating: 4.7,
      price: "₹₹",
      image: "https://www.barbequenation.com/_next/image?url=https%3A%2F%2Fapi.barbequenation.com%2Fsites%2Fdefault%2Ffiles%2F2019-12%2F114.%2520gallery%2520857x491_21.jpg&w=640&q=75",
    },
    {
      name: "Punjabi Tadka",
      city: "Chandigarh",
      cuisine: "North Indian",
      rating: 4.3,
      price: "₹₹",
      image: "https://content.jdmagicbox.com/v2/comp/delhi/d5/011pxx11.xx11.240105020513.u6d5/catalogue/punjabi-tadka-bisrakh-greater-noida-restaurants-um3tddg1h9.jpg",
    },
    {
      name: "The Royal Dine",
      city: "Bangalore",
      cuisine: "Continental",
      rating: 4.8,
      price: "₹₹₹",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/7e/76/f7/ambiance.jpg?w=700&h=400&s=1",
    },
  ];

  // Filter restaurants based on search input
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Discover the Best Restaurants Near You</h1>
        <p>Get exclusive deals and reserve your table instantly!</p>

        <input
          type="text"
          placeholder="Search for restaurants, cuisines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Restaurant Listings */}
      <div className="restaurant-list">
        {filteredRestaurants.map((restaurant, index) => (
          <div key={index} className="restaurant-card">
            <img src={restaurant.image} alt={restaurant.name} />
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.city} - {restaurant.cuisine}</p>
              <p className="rating">⭐ {restaurant.rating} | {restaurant.price}</p>
              <Link to="/new-registration" className="book-now-btn">Book Now</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
