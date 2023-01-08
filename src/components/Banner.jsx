import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://streamgaga.com/uploads/images/16584876043527673-img.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">Movie Name</h1>
        <div className="banner__buttons">
          <button>Play</button>
          <button>My List</button>
        </div>
        <h1 className="banner__description">This is a test description</h1>
      </div>
      <div className="__banner--fadeBottom" />
    </header>
  );
};

export default Banner;
