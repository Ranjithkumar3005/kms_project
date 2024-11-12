import { useState } from "react";

import "./App.css";

import Navbar from "./components/custom/Navbar";
import Hero from "./components/custom/Hero";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Detail from "./Pages/detail";
import Inputs from "./Pages/Inputs";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Pages/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/inputs" element={<Inputs />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </div>
  );
}

export default App;
