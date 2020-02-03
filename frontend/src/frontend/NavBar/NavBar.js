import React from 'react';
import {Link} from 'react-router-dom';
import './NavBarStyles.css';

function NavBar() {
  return (
    <nav className="navbar navigation-bar bg-primary fixed-top">
      <Link className="navigation-bar--text" to="/">
       MVP Tracker
      </Link>
    </nav>
  );
}

export default NavBar;