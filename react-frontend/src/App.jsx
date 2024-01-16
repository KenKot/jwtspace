import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import UserDetail from "./components/users/UserDetail";
import UserList from "./components/users/UserList";
import Register from "./components/auth/Register";

import { UserProvider } from "./contexts/UserContext";

export default function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}
