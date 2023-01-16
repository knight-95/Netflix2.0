import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
// import db from "../firebase";
// import { selectUser } from "../features/userSlice";
// import { useSelector } from "react-redux";


const Navbar = () => {

  // On clicking Netflix icon, it will only allow subscribed users to go to main page
  
  // add code for that 
  
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();
  
  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    
    return () => {
      window.removeEventListener("scroll", transitionNavbar);
    };
  }, []);
  
 
  return (
    <div className={`nav ${show && "nav__black"}`}>
      {/* only add nav__black class when show variable is true */}
      <div className="nav__contents">
        <img
          // onClick={() => navigate("/")}

          className="nav__logo"
          // src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          src={require('../images/netflix_logo.png')}
          alt="netflix-logo"
        />

        <img
          onClick={() => navigate("/profile")}
          className="nav__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Navbar;
