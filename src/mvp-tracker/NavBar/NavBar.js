import React from 'react';
import {Link} from 'react-router-dom';
import './NavBarStyles.css';

function NavBar() {
  return (
    <nav className="navbar navigation-bar fixed-top">
      <Link className="navigation-bar--text" to="/">
       2019-20 NBA MVP Tracker
      </Link>
    </nav>
  );
}

export default NavBar;