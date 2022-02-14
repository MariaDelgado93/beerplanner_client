/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import {
  selectUserPosition,
  setUserPosition,
  pushLocals,
} from './features/mapSlice';
import { loginUser } from './features/authSlice';

// Peticiones
import { getCheckSession } from './api/authentication';
import { getLocalsByPosition } from './api/locals';

import { Auth } from './components/Auth';
import { Map } from './components/Map';
// import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Menu } from './components/Menu';
import { Profile } from './components/Profile';
import { Search } from './components/Local/SearchLocal';
import { BeerList } from './components/Beer/BeerList';
import { LocalPage } from './components/Local/LocalPage';

import './App.scss';

function App() {
  const dispatch = useDispatch();
  const userPosition = useSelector(selectUserPosition);

  const [isLoading, setIsLoading] = useState(true);

  // Use geolocation.getCurrentPosition twice because of a bug in some browsers
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            dispatch(
              setUserPosition({ lng: coords.longitude, lat: coords.latitude })
            );
          },
          (err) => {
            console.log(err);
          },
          { enableHighAccuracy: false, maximumAge: 15000, timeout: 30000 }
        );
      },
      (err) => {
        console.log(err);
      },
      { enableHighAccuracy: false, maximumAge: 15000, timeout: 30000 }
    );
  });

  useEffect(() => {
    const { lat, lng } = userPosition;

    if (lat && lng) {
      getLocalsByPosition({ lat, lng })
        .then((locals) => {
          dispatch(pushLocals(locals));
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [userPosition]);

  // Efecto para comprobar si hay sesión al recargar
  useEffect(() => {
    getCheckSession()
      .then((data) => {
        if (data) {
          dispatch(
            loginUser({
              username: data.username,
              email: data.email,
              user: data,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loader">
        <Loader type="ThreeDots" color="#FFFF33" height="100" width="100" />
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="App__container">
          <Switch>
            <Route path="/map" exact component={Map} />
            <Route path="/search" exact component={Search} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/list" exact component={BeerList} />
            <Route path="/local/:id" exact component={LocalPage} />
            <Route path="/" exact component={Map} />
          </Switch>
        </div>
        <Menu />
      </div>
    </Router>
  );
}

export default App;
