import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import { selectUserLocals, updateUserLocals, selectIsAuhenticated } from '../../features/authSlice';
import { putFavouriteLocal } from '../../api/locals';

import '../../styles/Local.scss';

export function Local(props) {
  const dispatch = useDispatch();
  const userLocals = useSelector(selectUserLocals);
  const isAuthenticated = useSelector(selectIsAuhenticated);

  const [isFavSolid, setIsFavSolid] = useState(false);
  const [isFavHovering, setIsFavHovering] = useState(false);

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
  // Si la id está incluida en los locales del usuario, es favorito
  const isFavourite = userLocals.some(local => {
    return local === props.id || local._id === props.id;
  });
  return (
    <div className="Local">
      <div className="Local__image">
        <Link to={`/local/${props.id}`} id={props.id}>
          <img src="/locales/local_01.jpg" alt="" />
        </Link>
        {isAuthenticated ? (
          <button
            onClick={() => handleAddFavouriteLocal(props.id)}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
            className="Local__favourite Fa__button"
          >
            {isFavourite ? (
              <FontAwesomeIcon icon={faHeartSolid} />
            ) : (
              <FontAwesomeIcon
                icon={!isFavHovering && !isFavSolid ? faHeart : faHeartSolid}
              />
            )}
          </button>
        ) : null}
      </div>

      <div className="Local__sheet">
        <div className="Local__header">
          <div className="Local__data">
            <h2 className="Local__name">
              <Link to={`/local/${props.id}`} id={props.id}>
                {props.name}
              </Link>
            </h2>

            <p className="Local__direction">{props.address}</p>
            {props.latitude || props.longitude ? (
              <p className="Local__location">
                {props.latitude}, {props.longitude}
              </p>
            ) : null}
          </div>
          <div className="Local__type">
            <img src={`/local_icon_${props.localType}.png`} alt="" />{' '}
          </div>
        </div>
      </div>
    </div>
  );
}
