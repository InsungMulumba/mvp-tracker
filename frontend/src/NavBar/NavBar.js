import React from 'react';
import {Link} from 'react-router-dom';
import './NavBarStyles.css';

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
       MVP Tracker
      </Link>
    </nav>
  );
}

export default NavBar;