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
        <div className='nav1'><p >Courses</p><div><svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <path d="M7.91 8.58008L12.5 13.1701L17.09 8.58008L18.5 10.0001L12.5 16.0001L6.5 10.0001L7.91 8.58008Z" fill="black"/>
</svg></div></div>
        <div className='nav1'><p >Programs</p><svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <path d="M7.91 8.58008L12.5 13.1701L17.09 8.58008L18.5 10.0001L12.5 16.0001L6.5 10.0001L7.91 8.58008Z" fill="black"/>
</svg></div>
      </div>
      
      <div className="nav__list">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" className="search">
  <path d="M20.1 21L13.8 14.7C13.3 15.1 12.725 15.4167 12.075 15.65C11.425 15.8833 10.7333 16 10 16C8.18333 16 6.646 15.3707 5.388 14.112C4.13 12.8533 3.50067 11.316 3.5 9.5C3.5 7.68333 4.12933 6.146 5.388 4.888C6.64667 3.63 8.184 3.00067 10 3C11.8167 3 13.354 3.62933 14.612 4.888C15.87 6.14667 16.4993 7.684 16.5 9.5C16.5 10.2333 16.3833 10.925 16.15 11.575C15.9167 12.225 15.6 12.8 15.2 13.3L21.5 19.6L20.1 21ZM10 14C11.25 14 12.3127 13.5623 13.188 12.687C14.0633 11.8117 14.5007 10.7493 14.5 9.5C14.5 8.25 14.0623 7.18733 13.187 6.312C12.3117 5.43667 11.2493 4.99933 10 5C8.75 5 7.68733 5.43767 6.812 6.313C5.93667 7.18833 5.49933 8.25067 5.5 9.5C5.5 10.75 5.93767 11.8127 6.813 12.688C7.68833 13.5633 8.75067 14.0007 10 14Z" fill="black"/>
</svg>
        <p className="nav__link">Log in</p>
        
          <button className="nav__link2 nav__link--button">JOIN NOW</button>
        
      </div>
    </nav>
    
  );
}

export default Navbar;