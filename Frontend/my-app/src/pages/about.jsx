import "./about.css";
 // Add a relevant restaurant image in the project folder

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Welcome to Our Restaurant Reservation System</h1>
        <p>Find your favorite restaurants and reserve a table hassle-free!</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Why Choose Us?</h2>
          <p>
            Our platform allows you to explore and book the best restaurants in your city. Whether you love **North Indian**, **South Indian**, **Chinese**, or **Italian** cuisine, we have options for everyone!
          </p>
          <p>
            Easily search restaurants based on **location**, **cuisine**, and **availability**. Say goodbye to long waits and experience seamless dining reservations.
          </p>
        </div>
        <div className="about-image">
          <img src={"/image.png"} alt="Restaurant" />
        </div>
      </div>

      <div className="about-steps">
        <h2>How It Works?</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Choose Your City</h3>
            <p>Select a city and explore top-rated restaurants near you.</p>
          </div>
          <div className="step">
            <h3>2. Pick Your Favorite Cuisine</h3>
            <p>Filter by North Indian, South Indian, Chinese, and more.</p>
          </div>
          <div className="step">
            <h3>3. Reserve a Table</h3>
            <p>Pick a date and time, and confirm your reservation instantly.</p>
          </div>
        </div>
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>📍 Address: 123, Food Street, Delhi, India</p>
        <p>📞 Phone: +91 98765 43210</p>
        <p>📧 Email: support@restaurantreservations.com</p>
      </div>
    </div>
  );
};

export default About;
