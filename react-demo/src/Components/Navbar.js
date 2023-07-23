import React from 'react';
import './Navbar.css';
import LOGO from '../Images/LOGO.png';

function Navbar() {
  return (
    <nav className="nav_section">
      <div className="logo">
        <img src={LOGO} alt="logo" />
      </div>
      <div className="nav-items">
        <li><button className="navitem">Courses</button></li><i className="fa-solid fa-angle-down cour"></i>
        <li><button className="navitem" >Programs</button></li><i className="fa-solid fa-angle-down cour"></i>
      </div>
      <ul className="nav__list">
        <i className="fa-solid fa-magnifying-glass"></i>
        <li className="nav__item"><button  className="nav__link">Log in</button></li>
        <li className="nav__item">
          <button  className="nav__link2 nav__link--button">JOIN NOW</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;