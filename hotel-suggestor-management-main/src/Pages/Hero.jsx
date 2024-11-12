import { Button } from "@/components/ui/button";
import React from "react";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">StayFinder</h1>
          <div>
            <Button className="mr-4 bg-blue-500 hover:bg-blue-600 text-white">
              Login
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Register
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto mt-10 px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Discover Your Perfect Stay
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to StayFinder, your go-to platform for personalized hotel
          recommendations. Explore hotels that suit your preferences, budget,
          and needs—all in one place.
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Get Started
        </Button>
      </header>
    </div>
  );
};

export default App;
