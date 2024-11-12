import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">StayFinder</h1>
        <div>
          <Link to={"/login"}>
            <Button className="mr-4 bg-blue-500 hover:bg-blue-600 text-white">
              Login
            </Button>
          </Link>
          <Link to={"register"}>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
