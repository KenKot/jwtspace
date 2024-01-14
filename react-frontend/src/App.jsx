import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import UserDetail from "./components/users/UserDetail";
import UserList from "./components/users/UserList";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
