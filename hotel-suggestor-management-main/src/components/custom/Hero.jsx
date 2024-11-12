import React from "react";
import { Button } from "../ui/button";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <div className="">
      <Navbar />
      <header
        className="relative flex items-center justify-center h-screen bg-cover bg-center text-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Centered Content */}
        <div className="relative z-10 text-white p-8 max-w-2xl">
          <h2 className="text-5xl font-bold mb-4">
            Discover Your Perfect Stay
          </h2>
          <p className="text-xl mb-6">
            Welcome to StayFinder, your go-to platform for personalized hotel
            recommendations. Explore hotels that suit your preferences, budget,
            and needs—all in one place.
          </p>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Get Started
          </Button>
        </div>
      </header>
    </div>
  );
};

export default Hero;
