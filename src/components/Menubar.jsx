import { NavLink, useNavigate } from "react-router-dom";
import { AppContext, initialInvoiceData } from "../context/AppContext.jsx";
import { useContext, useEffect, useRef } from "react";
import Logo from "./Logo.jsx";
import {
  SignedIn,
  SignedOut,
  useClerk,
  UserButton,
} from "@clerk/clerk-react";
import { Collapse } from "bootstrap";

const Menubar = () => {
  const { setInvoiceData, setSelectedTemplate, setInvoiceTitle } =
    useContext(AppContext);

  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const navRef = useRef(null);

  // close navbar
  const closeNavbar = () => {
    const nav = document.getElementById("navbarNav");
    if (nav && nav.classList.contains("show")) {
      new Collapse(nav, { toggle: false }).hide();
    }
  };

  // outside click close
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        closeNavbar();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleGenerateClick = () => {
    setInvoiceData(initialInvoiceData);
    setSelectedTemplate("template1");
    setInvoiceTitle("Create Invoice");
    closeNavbar();
    navigate("/generate");
  };

  const openLogin = () => {
    closeNavbar();
    openSignIn({});
  };

  const navClass = ({ isActive }) =>
    `nav-link fw-medium nav-item-link ${isActive ? "active-nav" : ""}`;

  return (
    <>
      <style>
        {`
          .nav-item-link {
            position: relative !important; 
            padding-bottom: 7px !important;
          }
        
          .nav-item-link.active-nav {
            color: #0D6EFD !important; 
            
            border-bottom: 3px solid #0D6EFD !important;
          }
        `}
      </style>

      <nav
        ref={navRef}
        className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top"
      >
        <div className="container py-2">
          {/* Brand */}
          <NavLink
            to="/"
            className="navbar-brand d-flex align-items-center"
            onClick={closeNavbar}
          >
            <Logo />
            <span
              className="fw-bolder fs-4 mx-3"
              style={{ letterSpacing: "-0.5px", color: "#0D6EFDB2" }}
            >
              BillCloud
            </span>
          </NavLink>

          {/* Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-lg-3">
              {/* Home */}
              <li className="nav-item">
                <NavLink to="/" end className={navClass} onClick={closeNavbar}>
                  Home
                </NavLink>
              </li>

              <SignedIn>
                {/* Dashboard */}
                <li className="nav-item">
                  <NavLink
                    to="/dashboard"
                    className={navClass}
                    onClick={closeNavbar}
                  >
                    Dashboard
                  </NavLink>
                </li>

                {/* Generate */}
                <li className="nav-item">
                  <NavLink
                    to="/generate"
                    className={navClass}
                    onClick={handleGenerateClick}
                  >
                    Generate
                  </NavLink>
                </li>

                {/* User */}
                <li className="nav-item ms-lg-2">
                  <UserButton />
                </li>
              </SignedIn>

              <SignedOut>
                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                  <button
                    className="btn btn-primary rounded-pill px-4"
                    onClick={openLogin}
                  >
                    Login / Signup
                  </button>
                </li>
              </SignedOut>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menubar;