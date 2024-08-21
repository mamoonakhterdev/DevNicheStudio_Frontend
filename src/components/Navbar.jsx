import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";
import { AdminLayout } from "./layouts/Admin-Layout";

// eslint-disable-next-line react/prop-types
export const Navbar = ({ company_name }) => {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();

  // Check if the current path is under /admin
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <header>
      <div className="container grid grid-two-cols">
        <div className="logo-brand">
          <NavLink to="/">{company_name}</NavLink>
        </div>
        
        {/* Conditionally render AdminLayout if on admin path */}
        {isAdminPath ? (
          <AdminLayout />
        ) : (
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/service">Services</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              { user.isAdmin &&
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              }
              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
              
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
