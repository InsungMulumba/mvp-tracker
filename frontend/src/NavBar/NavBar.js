import React from 'react';
import {Link} from 'react-router-dom';
import './NavBarStyles.css';

function NavBar() {
  return (
    <nav className="navbar navigationBar bg-primary fixed-top">
      <Link className="navigationBar-text" to="/">
       MVP Tracker
      </Link>
    </nav>
  );
}

export default NavBar;