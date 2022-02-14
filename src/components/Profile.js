import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

import {
  selectIsAuhenticated,
  selectIsAdmin,
  selectIsVisitor,
  selectIsOwner,
  logoutUser,
  selectUser,
  selectUserBeers,
  selectUserLocals,
  updateUser,
} from '../features/authSlice';

import { pushBeers, selectBeers } from '../features/beerSlice';
import { getAllBeers } from '../api/beers';
import { getVisitor } from '../api/users';
import { getOwnerLocals, getAdminLocals } from '../api/locals';
import { getLogout } from '../api/authentication';

import { Local } from './Local/Local';
import { LocalInput } from './Local/LocalInput';
import { LocalAdmin } from './Local/LocalAdmin';
import { LocalShow } from './Local/LocalShow';
import { Beer } from './Beer/Beer';
import { BeerInput } from './Beer/BeerInput';
import { BeerAdmin } from './Beer/BeerAdmin';

import '../styles/Profile.scss';
import { pushLocals, selectLocals } from '../features/localSlice';

export function Profile(props) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuhenticated);
  const favouriteBeers = useSelector(selectUserBeers);
  const isAdmin = useSelector(selectIsAdmin);
  const isOwner = useSelector(selectIsOwner);
  const isVisitor = useSelector(selectIsVisitor);
  const beersList = useSelector(selectBeers);
  const localsList = useSelector(selectLocals);
  const favouriteLocals = useSelector(selectUserLocals);

  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);
  const [adminLocals, setAdminLocals] = useState([]);

  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingBeers, setIsCreatingBeers] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHandleLocals, setIsHandleLocals] = useState(false);
  const [isHandleBeers, setIsHandleBeers] = useState(false);

  //const urlApi = 'https://beer-planner.herokuapp.com/';

  useEffect(() => {
    if (isOwner) {
      getOwnerLocals()
        .then((local) => {
          if (local) {
            dispatch(pushLocals(local));
          }
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (isVisitor) {
      getVisitor()
        .then((data) => {
          if (data) {
            dispatch(updateUser(data));
          }
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (isAdmin) {
      getAdminLocals()
        .then((data) => {
          if (data) {
            setAdminLocals(data);
          }
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });

      getAllBeers()
        .then((beers) => {
          dispatch(pushBeers(beers));
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isAuthenticated, selectBeers, selectLocals]);

  useEffect(() => {
    if (isOwner) {
      getOwnerLocals()
        .then((local) => {
          if (local) {
            dispatch(pushLocals(local));
          }
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isCreating]);

  useEffect(() => {
    if (isAdmin) {
      getAllBeers()
        .then((beers) => {
          dispatch(pushBeers(beers));
          console.log(favouriteBeers);
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isCreatingBeers]);

  function handleIsCreating(e) {
    setIsCreating(true);
  }
  function handleIsCreatingBeers(e) {
    setIsCreatingBeers(true);
  }

  function handleCloseSession() {
    getLogout()
      .then(() => dispatch(logoutUser()))
      .catch((err) => {
        console.log(err.message);
      });
  }

  function handleCancel(e) {
    setIsCreatingBeers(false);
    setIsCreating(false);
    setIsEditing(false);
  }

  function handleClear(e) {
    setIsCreatingBeers(false);
    setIsCreating(false);
  }

  if (!isAuthenticated) {
    return (
      <div className="content">
        <div className="Profile__no-session">
          <h1>Tienes que estar logueado para ver tu perfil</h1>
          <Link to="/auth">Inicia sesión aquí</Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loader">
        <Loader type="ThreeDots" color="#FFFF33" height="100" width="100" />
      </div>
    );
  }

  return (
    <div className="Profile content">
      <h2>Mis datos</h2>

      <div className="Profile__image"></div>
      <div className="Profile__data">
        <h3>{user.username}</h3>
        <h4>{user.email}</h4>
      </div>
      <button
        type="button"
        onClick={handleCloseSession}
        className="Dark__button centerDiv"
      >
        Cerrar sesión
      </button>
      {isOwner ? (
        <div className="Profile__owner">
          <h2>Mis locales</h2>
          {localsList.length ? (
            localsList.map((local) => (
              <LocalShow
                key={local._id}
                id={local._id}
                name={local.name}
                address={local.address}
                localType={local.localType}
                isEnabled={local.isEnabled}
                longitude={local.location.coordinates[0]}
                latitude={local.location.coordinates[1]}
              />
            ))
          ) : (
            <p>¡Todavía no tienes locales creados!</p>
          )}
          {isCreating ? (
            <LocalInput onCancel={handleCancel} onClear={handleClear} />
          ) : (
            <button
              className="Dark__button centerDiv"
              onClick={handleIsCreating}
            >
              Crear un local
            </button>
          )}
        </div>
      ) : null}
      {isVisitor ? (
        <>
          <h2>Cervezas favoritas</h2>
          <div className="Profile__favouriteBeers">
            {(favouriteBeers || []).length ? (
              favouriteBeers.map((beer) => (
                <Beer
                  key={beer._id}
                  id={beer._id}
                  name={beer.name}
                  brand={beer.brand}
                  beerType={beer.beerType}
                />
              ))
            ) : (
              <p>¡No hay cervezas favoritas!</p>
            )}
          </div>

          <h2>Locales favoritos</h2>
          <div className="Profile__favouriteLocals">
            {(favouriteLocals || []).length ? (
              favouriteLocals.map((local) => (
                <Local
                  key={local._id}
                  id={local._id}
                  name={local.name}
                  localType={local.localType}
                  address={local.address}
                  latitude={local.location.coordinates[0]}
                  longitude={local.location.coordinates[1]}
                />
              ))
            ) : (
              <p>¡No hay locales favoritos!</p>
            )}
          </div>
        </>
      ) : null}
      {isAdmin ? (
        <>
          <div className="Profile__admin">
            <button
              className="Dark__button centerDiv"
              onClick={() => setIsHandleLocals(!isHandleLocals)}
            >
              {isHandleLocals
                ? 'Dejar de tramitar locales'
                : 'Tramitar locales'}
            </button>
            {isHandleLocals ? (
              <div className="Admin__locals">
                {adminLocals.length ? (
                  adminLocals.map((local) => (
                    <LocalAdmin
                      key={local._id}
                      id={local._id}
                      name={local.name}
                      address={local.address}
                      isEnabled={local.isEnabled}
                    />
                  ))
                ) : (
                  <p>¡Todavía no hay locales!</p>
                )}
              </div>
            ) : null}
          </div>

          <div className="Profile__admin">
            <button
              className="Dark__button centerDiv"
              onClick={() => setIsHandleBeers(!isHandleBeers)}
            >
              {isHandleBeers
                ? 'Dejar de tramitar cervezas'
                : 'Tramitar cervezas'}
            </button>
            {isHandleBeers ? (
              <>
               <div className="Admin__beers">
                  {beersList ? (
                    beersList.map((beer) => (
                      <BeerAdmin
                        key={beer._id}
                        id={beer._id}
                        name={beer.name}
                        brand={beer.brand}
                        beerType={beer.beerType}
                      />
                    ))
                  ) : (
                    <h4>No tienes cervezas creadas</h4>
                  )}
                  {isCreatingBeers ? (
                    <BeerInput onCancel={handleCancel} />
                  ) : (
                    <button
                      className="Dark__button centerDiv"
                      onClick={handleIsCreatingBeers}
                    >
                      Crear una cerveza
                    </button>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
