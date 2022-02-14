import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import {
  selectIsAuhenticated,
  loginUser,
  logoutUser,
  selectUser,
} from '../features/authSlice';
import {
  getLogout,
  postLoginUser,
  postRegisterUser,
  postRegisterOwner,
} from '../api/authentication';

import '../styles/Auth.scss';

export function Auth() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuhenticated);
  const user = useSelector(selectUser);

  const [isOwner, setIsOwner] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  function handleAuthUser(e) {
    e.preventDefault();
    // Cambiamos entre register o login según el estado
    const authFunction = isLogin ? postLoginUser : postRegisterUser;

    authFunction(form)
      .then((data) => {
        dispatch(
          loginUser({ username: data.username, email: data.email, user: data })
        );
      })
      .catch((err) => {
        setIsError(true);
        setError(err.message);
        console.log(err.message);
      });
  }

  function handleCloseSession() {
    getLogout()
      .then(() => {
        setIsError(false);
        dispatch(logoutUser());
      })
      .catch((err) => {
        setIsError(false);
        setError(err.message);
        console.log(err.message);
      });
  }

  function handleRegisterOwner(e) {
    e.preventDefault();
    postRegisterOwner(form)
      .then((data) => {
        dispatch(loginUser({ username: data.username, email: data.email }));
      })
      .catch((err) => {
        setIsError(true);
        setError(err.message);
        console.log(err.message);
      });
  }

  function handleIsLogin() {
    setIsError(false);
    setIsLogin(!isLogin);
    setForm({
      username: '',
      email: '',
      password: '',
    });

    setIsOwner(false);
  }

  function handleIsOwner() {
    setIsOwner(!isOwner);
    setIsLogin(false);
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  // Si el usuario está autenticado, mostramos su botón de logout
  if (isAuthenticated) {
    return (
      <div className="Auth__container">
        <h2>Bienvenido a Beerplanner {user.username}</h2>

        <Link className="Auth__text-button Auth__link" to="/profile">
          Ver tu perfil
        </Link>

        <button
          type="button"
          onClick={handleCloseSession}
          className="Dark__button centerDiv"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  const { username, email, password } = form;

  return (
    <div className={isOwner ? 'Auth Auth__owner' : 'Auth'}>
      <h1>{isLogin ? 'Iniciar sesión' : 'Registro'}</h1>
      <form onSubmit={isOwner ? handleRegisterOwner : handleAuthUser}>
        {isLogin ? null : (
          <div className="Auth__field">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={handleChangeInput}
              required
            />
          </div>
        )}
        <div className="Auth__field">
          <label htmlFor="email">Correo electrónico</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="Auth__field">
          <label htmlFor="password">Contraseña</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleChangeInput}
            required
          />
          {isError ? (
          <p className="Auth__field-error">         
            {error}
          </p>
        ) : null}
        </div>
        

        <button className="Auth__submit" type="submit">
          {isLogin ? 'Iniciar sesión' : 'Registrarse'}
        </button>
      </form>

      <p className="Auth__changeForm">
        {isLogin ? (
          <>
            ¿Todavía no tienes una cuenta?
            <button
              className="Auth__text-button"
              type="button"
              onClick={handleIsLogin}
            >
              Regístrate aquí
            </button>
          </>
        ) : (
          <>
            ¿Ya estás registrado?
            <button
              className="Auth__text-button"
              type="button"
              onClick={handleIsLogin}
            >
              Inicia sesión aquí
            </button>
          </>
        )}
      </p>

      {isOwner ? (
        <div className="Auth__owner-link">
          <p>¿Eres un usuario?</p>
          <button
            className="Auth__text-button"
            type="button"
            onClick={handleIsOwner}
          >
            Regístrate aquí
          </button>
        </div>
      ) : (
        <div className="Auth__owner-link">
          <p>¿Eres propietario de un local?</p>
          <button
            className="Auth__text-button"
            type="button"
            onClick={handleIsOwner}
          >
            Regístrate aquí
          </button>
        </div>
      )}
    </div>
  );
}
