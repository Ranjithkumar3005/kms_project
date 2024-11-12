/* eslint-disable react/prop-types */
import { Card } from "@/components/ui/card";
import { useState } from "react";
// import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai"; // For displaying star ratings

const HotelCard = ({ hotel }) => {
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="mx-4 h-full hover:scale-105 transition duration-300 fade-in">
      <Card className="rounded-xl shadow-xl h-[450px]">
        <img
          src={hotel.image}
          className="h-[250px] w-full object-cover rounded-t-xl"
          alt={`Image of ${hotel.name}`}
        />
        <div className="flex flex-col justify-around my-4 mx-3 h-[170px]">
          <p className="font-semibold text-lg line-clamp-2 min-w-[300px]">
            {hotel.name}
          </p>
          <p className="text-sm text-gray-500">{hotel.location}</p>
          <p className="text-sm text-gray-700 line-clamp-2">
            {hotel.description}
          </p>

          <div className="flex items-center mt-2">
            <AiFillStar className="text-yellow-500" />
            <span className="ml-1 text-sm">{hotel.rating} / 5</span>
          </div>

          <div className="flex flex-row justify-between items-center mt-2">
            <p className="text-sm font-semibold text-gray-600">
              Price: {hotel.priceRange}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                hotel.name + " " + hotel.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm underline"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HotelCard;
