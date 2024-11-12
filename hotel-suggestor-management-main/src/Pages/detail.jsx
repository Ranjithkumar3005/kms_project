import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Detail = () => {
  const [tripDetails, setTripDetails] = useState({
    name: "",
    destination: "",
    duration: "",
    budget: "",
    companions: "",
  });

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    setTripDetails({
      name: queryParams.get("name"),
      destination: queryParams.get("destination"),
      duration: queryParams.get("duration"),
      budget: queryParams.get("budget"),
      companions: queryParams.get("companions"),
    });
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl text-center mb-8">Your Trip Details</h2>

        <div className="mb-6">
          <p>
            <strong>Name:</strong> {tripDetails.name}
          </p>
          <p>
            <strong>Destination:</strong> {tripDetails.destination}
          </p>
          <p>
            <strong>Duration:</strong> {tripDetails.duration} days
          </p>
          <p>
            <strong>Budget:</strong> {tripDetails.budget}
          </p>
          <p>
            <strong>Companions:</strong> {tripDetails.companions}
          </p>
        </div>

        {/* Hotel Information (Static Example) */}
        <h3 className="text-2xl mb-4">Hotels in {tripDetails.destination}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sample Hotel Cards */}
          <div className="bg-white border p-4 rounded-lg shadow-md">
            <img
              src="https://example.com/hotel1.jpg"
              alt="Hotel 1"
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h4 className="text-xl font-semibold">Hotel Fortune</h4>
            <p className="text-sm">Rating: 4.5/5</p>
            <p className="text-sm">Price: ₹3000/night</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              className="text-green-500 hover:underline mt-2 block"
            >
              View on Google Maps
            </a>
          </div>
          {/* Repeat similar cards for other hotels */}
        </div>
      </div>
    </div>
  );
};

export default Detail;
