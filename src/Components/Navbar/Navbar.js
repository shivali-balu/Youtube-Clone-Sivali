import React from "react";
import "./Navbar.css";
import menuIcon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";
import uploadIcon from "../../assets/upload.png";
import notification from "../../assets/notification.png";
import user from "../../assets/icons8-s-67.png";
import more from "../../assets/more.png"; 
import { Link } from "react-router-dom";

const Navbar = ({ setSidebar }) => {
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          src={menuIcon}
          alt="menuIcon"
          className="menuIcon"
          onClick={() => setSidebar((prev) => (prev === false ? true : false))}
        />
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>

      <div className="navMid flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search" />
          <img src={searchIcon} alt="searchIcon" />
        </div>
      </div>

      <div className="navRight flex-div">
        <img src={uploadIcon} alt="" />
        <img src={more} alt="" />
        <img src={notification} alt="" />
        <img src={user} alt="" className="userIcon" />
      </div>
    </nav>
  );
};

export default Navbar;
