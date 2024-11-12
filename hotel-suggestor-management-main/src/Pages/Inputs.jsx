import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom icon for the map markers
const hotelIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const HotelRecommendation = () => {
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    city: ''
  });
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Get user's current location on component mount
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prevFormData) => ({
          ...prevFormData,
          latitude,
          longitude
        }));
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.get(`http://127.0.0.1:5000/recommend`, {
        params: {
          latitude: formData.latitude,
          longitude: formData.longitude,
          city: formData.city
        }
      });

      setHotels(response.data);
    } catch (error) {
      setHotels([]);
      if (error.response) {
        setError(error.response.data.message || "No hotels found.");
      } else {
        setError("Unable to connect to server.");
      }
    }
  };

  // Function to render star icons based on the rating
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating); // Number of filled stars
    const emptyStars = 5 - filledStars; // Number of empty stars
    return (
      <>
        {[...Array(filledStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index + filledStars} className="text-yellow-500" />
        ))}
      </>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Hotel Recommendations</h1>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Latitude</label>
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter latitude"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Longitude</label>
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter longitude"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter city"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Get Recommendations
        </button>
      </form>

      {/* Display Error Message */}
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      {/* Hotel Recommendations Display */}
      <div>
        {hotels.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Recommended Hotels</h2>
            <ul className="space-y-2 justify-around">
              {hotels.map((hotel, index) => (
                <li key={index} className="p-4 border justify-around border-gray-300 rounded-md flex items-center">
                  <img
                    src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
                    alt="Hotel"
                    className="w-60 h-40 rounded-md mr-4"
                  />
                  <div className="flex flex-rows gap-40 items-start mt-2">
                    <div className='items-start justify-start'>
                      <h3 className="font-semibold text-lg mb-1">{hotel.property_name}</h3>
                      <p className="text-sm text-gray-600">Latitude: {hotel.latitude}</p>
                      <p className="text-sm text-gray-600">Longitude: {hotel.longitude}</p>
                      <p className="flex items-center text-sm mt-1">
                        Rating:
                        <span className="flex ml-2 text-yellow-500">
                          {renderStars(hotel.hotel_star_rating)}
                        </span>
                      </p>
                    </div>
                    <div >
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          hotel.property_name + " " + hotel.area
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 text-sm underline"
                      >
                        View on Google Map{">>"}
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Map Display */}
      <div className="mt-8">
        {hotels.length > 0 && (
          <MapContainer
            center={[formData.latitude || 0, formData.longitude || 0]}
            zoom={10}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {hotels.map((hotel, index) => (
              <Marker
                key={index}
                position={[hotel.latitude, hotel.longitude]}
                icon={hotelIcon}
              >
                <Popup>
                  <strong>{hotel.property_name}</strong><br />
                  {hotel.area}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default HotelRecommendation;
