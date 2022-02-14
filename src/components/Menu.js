import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSearch,
  faBeer,
  faUser
} from '@fortawesome/free-solid-svg-icons';

import { selectIsAuhenticated } from '../features/authSlice';

import '../styles/Menu.scss';

export function Menu() {
  const isAuthenticated = useSelector(selectIsAuhenticated);

  return (
    <div className="Menu">
      <div className="Menu__item">
        <Link to="/" className="Menu__link">
          <FontAwesomeIcon icon={faHome} className="Menu__icon" />
          <span>Inicio</span>
        </Link>
      </div>
      <div className="Menu__item">
        <Link to="/search" className="Menu__link">
          <FontAwesomeIcon icon={faSearch} className="Menu__icon" />
          <span>Locales</span>
        </Link>
      </div>
      <div className="Menu__item">
        <Link to="/list" className="Menu__link">
          <FontAwesomeIcon icon={faBeer} className="Menu__icon" />
          <span>Cervezas</span>
        </Link>
      </div>
      <div className="Menu__item">
        {isAuthenticated ? (
          <Link to="/profile" className="Menu__link">
            <FontAwesomeIcon icon={faUser} className="Menu__icon" />
            <span>Perfil</span>
          </Link>
        ) : (
          <Link to="/auth" className="Menu__link">
            <FontAwesomeIcon icon={faUser} className="Menu__icon" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}
