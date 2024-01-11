import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register"; // Import your Register component
import Login from "./components/auth/Login"; // Import your PostDetail component

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <h2>hi</h2>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/posts/:id" element={<PostDetail />} /> */}
        </Routes>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}
