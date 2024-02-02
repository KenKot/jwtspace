import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Unauthorized from "./components/auth/Unauthorized";
import UserDetail from "./components/users/UserDetail";
import UserList from "./components/users/UserList";
import UserEdit from "./components/users/UserEdit";
import FriendList from "./components/friends/FriendList";
import Register from "./components/auth/Register";
import Layout from "./components/Layout";

import Missing from "./components/Missing";
import AdminLounge from "./components/testing/AdminLounge";
import ModLounge from "./components/testing/ModLounge";
import UserLounge from "./components/testing/UserLounge";

import RequireAuth from "./components/auth/RequireAuth";

import PersistLogin from "./components/auth/PersistLogin";
import HomePage from "./components/HomePage";
import FriendRequests from "./components/friends/FriendRequests";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            {/* PUBLIC ROUTES */}
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="" element={<HomePage />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="users/:id/friends" element={<FriendList />} />
            <Route path="friendrequests" element={<FriendRequests />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* //PRIVATE ROUTES */}
            <Route element={<RequireAuth allowedRoles={["user"]} />}>
              <Route path="/userlounge" element={<UserLounge />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["user"]} />}>
              <Route path="/edit" element={<UserEdit />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["moderator"]} />}>
              <Route path="modlounge" element={<ModLounge />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["admin"]} />}>
              <Route path="adminlounge" element={<AdminLounge />} />
            </Route>
          </Route>

          {/* CATCH ALL */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}
