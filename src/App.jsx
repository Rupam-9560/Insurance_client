import React from "react";
import { Route, Routes } from "react-router-dom";

import Mainpg from "./pages/Mainpg";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import UserDashboard from "./pages/UserDashboard";
import MyProfile from "./pages/MyProfile";
import ChangePassword from "./pages/ChangePassword";
import ApplyInsurance from "./pages/ApplyInsurance";
import UserHistory from "./pages/UserHistory";
import UserGenerateTicket from "./pages/UserGenerateTicket";
import UserTicketHistory from "./pages/UserTicketHistory";

// ✅ Admin Pages (all inside admin folder)
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminChangePassword from "./pages/AdminChangePassword";
import AddCategory from "./pages/AddCategory";
import ManageCategory from "./pages/ManageCategory";
import AddSubCategory from "./pages/AddSubCategory";
import ManageSubCategory from "./pages/ManageSubCategory";
import AddPolicy from "./pages/AddPolicy";
import ManagePolicy from "./pages/ManagePolicy";
import EditPolicy from "./pages/EditPolicy";
import ManageUsers from "./pages/ManageUsers";
import PendingPolicy from "./pages/PendingPolicy";
import ApprovedPolicy from "./pages/ApprovedPolicy";
import DisapprovedPolicy from "./pages/DisapprovedPolicy";
import AllPolicy from "./pages/AllPolicy";
import AdminUnresolvedTickets from "./pages/AdminUnresolvedTickets";
import AdminResolvedTickets from "./pages/AdminResolvedTickets";
const App = () => {
  return (
    <div>
      <Routes>

        {/* ========== Public Routes ========== */}
        <Route path="/" element={<Mainpg />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ========== User Routes ========== */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/user/insurance/apply" element={<ApplyInsurance />} />
        <Route path="/user/history" element={<UserHistory />} />
        <Route path="/user/ticket/generate" element={<UserGenerateTicket />} />
        <Route path="/user/ticket/history" element={<UserTicketHistory />} />

        {/* ========== Admin Routes ========== */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/change-password" element={<AdminChangePassword />} />

        <Route path="/admin/categories" element={<AddCategory />} />
        <Route path="/admin/category/manage" element={<ManageCategory />} />

        <Route path="/admin/sub-category/add" element={<AddSubCategory />} />
        <Route path="/admin/sub-category/manage" element={<ManageSubCategory />} />

        <Route path="/admin/policy/add" element={<AddPolicy />} />
        <Route path="/admin/policy/manage" element={<ManagePolicy />} />
        <Route path="/admin/policy/edit/:id" element={<EditPolicy />} />

        <Route path="/admin/users" element={<ManageUsers />} />

        <Route path="/admin/policy-holders/pending" element={<PendingPolicy />} />
        <Route path="/admin/policy-holders/approved" element={<ApprovedPolicy />} />
        <Route path="/admin/policy-holders/disapproved" element={<DisapprovedPolicy />} />
        <Route path="/admin/policy-holders/all" element={<AllPolicy />} />

        <Route path="/admin/tickets/unresolved" element={<AdminUnresolvedTickets />} />
        <Route path="/admin/tickets/resolved" element={<AdminResolvedTickets />} />

      </Routes>
    </div>
  );
};

export default App;
