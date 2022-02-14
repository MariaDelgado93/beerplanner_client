import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faMap } from '@fortawesome/free-regular-svg-icons';

import '../styles/Navbar.scss';
import { selectIsAuhenticated } from '../features/authSlice';

export function Navbar() {
  const isAuthenticated = useSelector(selectIsAuhenticated);
  return (
    <div className="Navbar">
      <div className="Navbar__logo">
        <Link to="/">
          <img src="/logo_horiz.png" alt="" />
        </Link>
      </div>
      <nav className="Navbar__menu">
        {isAuthenticated ? (
          <>
          <Link to="/profile" className="Navbar__link">
            <FontAwesomeIcon icon={faUser} className="Navbar__icon" />
            </Link>
             <Link  to="/profile" className="Navbar__link">
             <FontAwesomeIcon icon={faHeart} className="Navbar__icon" />
           </Link>
           </>
           
        ) : null}
        <Link to="/map" className="Navbar__link">
          <FontAwesomeIcon icon={faMap} className="Navbar__icon" />
        </Link>
      </nav>
    </div>
  );
}
