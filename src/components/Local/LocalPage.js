/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import {
  updateUserLocals,
  selectIsAuhenticated
} from '../../features/authSlice';
import { putFavouriteLocal, getLocalById } from '../../api/locals';

import '../../styles/LocalPage.scss';

export function LocalPage(props) {
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/'));

  const [isFavSolid, setIsFavSolid] = useState(false);
  const [isFavHovering, setIsFavHovering] = useState(false);
  const [localContent, setLocalContent] = useState({
    name: '',
    address: '',
    localType: ''
  });
  const isAuthenticated = useSelector(selectIsAuhenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    getLocalById(id).then(data => {
      console.log('Local data', data);
      setLocalContent(data);
    });
  }, []);

  // Control de hovers y clicks del icono heart
  function handleOnMouseEnter() {
    setIsFavHovering(true);
  }
  function handleOnMouseLeave() {
    setIsFavHovering(false);
  }
  function handleOnMouseDown() {
    setIsFavSolid(true);
  }
  function handleOnMouseUp() {
    setIsFavSolid(false);
  }

  // Añadir local como favorito
  function handleAddFavouriteLocal(id) {
    putFavouriteLocal(id)
      .then(() => {
        dispatch(updateUserLocals(id));
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  return (
    <div className="localPage">
      <div className="LocalPage__image">
        <img src="/locales/local_01.jpg" alt="" />
        {isAuthenticated ? (
          <button
            onClick={() => handleAddFavouriteLocal(props.id)}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
            className="Local__favourite Fa__button"
          >
            <FontAwesomeIcon
              icon={!isFavHovering && !isFavSolid ? faHeart : faHeartSolid}
            />
          </button>
        ) : null}
      </div>

      <div className="LocalPage__header">
        <div className="LocalPage__data">
          <h1 className="LocalPage__name">{localContent.name}</h1>
          <p className="LocalPage__direction">{localContent.address}</p>
          {localContent.latitude || localContent.longitude ? (
            <p className="Local__location">
              {localContent.latitude}, {localContent.longitude}
            </p>
          ) : null}
        </div>
        <div className="LocalPage__type">
          <img src={`/local_icon_${localContent.localType}.png`} alt="" />{' '}
        </div>
      </div>
      <div className="LocalPage__content">
        <h2>Productos</h2>
      </div>
    </div>
  );
}
