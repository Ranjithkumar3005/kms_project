import { useState } from "react";
import HotelCard from "@/components/custom/HotelCard";
import hotels from "@/components/constants/data";
import Navbar from "@/components/custom/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-4">
      {/* Search Field */}
      <div className="mb-4 flex justify-between gap-24">
        <h1 className="text-2xl font-bold text-blue-600">StayFinder</h1>
        <input
          type="text"
          placeholder="Search for hotels..."
          className="w-[400px] p-2 border border-gray-300 rounded-lg"
          onChange={handleSearch}
          value={searchTerm}
        />
        <Link to={"/inputs"}>
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
            Find
          </Button>
        </Link>
      </div>

      {/* Display Hotels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHotels.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
