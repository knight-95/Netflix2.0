import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [show, handleShow] = useState(true);

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      handleShow(false);
    } else {
      handleShow(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);

    return () => {
      window.removeEventListener("scroll", transitionNavbar);
    };
  }, []);

  return (
    <div className={`nav ${show && 'nav__black'}`}>
    {/* only add nav__black class when show variable is true */}
      <div className="nav__contents">
        <img
          className="nav__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="netflix-logo"
        />

        <img
          className="nav__avatar"
          src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
          alt="avatar"
        />
      </div>
      Navbar
    </div>
  );
};

export default Navbar;
