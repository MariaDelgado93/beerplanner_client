import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import { putFavouriteLocal } from '../../api/locals';
import { updateUserLocals } from '../../features/authSlice';

import '../../styles/LocalMap.scss';

export function LocalMap(props) {
  const [isFavSolid, setIsFavSolid] = useState(false);
  const [isFavHovering, setIsFavHovering] = useState(false);

  const dispatch = useDispatch();

    // Añadir local como favorito
    function handleAddFavouriteLocal(id) {
      putFavouriteLocal(id)
        .then(() => {
          dispatch(updateUserLocals(id));
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

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

  return (
    <div className="LocalMap">
      <div className="LocalMap__image">
        <img src="/locales/local_01.jpg" alt="" />
        <button
          onClick={() => handleAddFavouriteLocal(props.id)}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onMouseDown={handleOnMouseDown}
          onMouseUp={handleOnMouseUp}
          className="LocalMap__favourite Fa__button"
        >
          <FontAwesomeIcon
            icon={!isFavHovering && !isFavSolid ? faHeart : faHeartSolid}
          />
        </button>
      </div>
      <div className="LocalMap__sheet">
        <div className="LocalMap__header">
          <div className="LocalMap__data">
            <h2 className="LocalMap__name">{props.name}</h2>
            <h3 className="LocalMap__direction">{props.address}</h3>
          </div>
          <div className="LocalMap__type">
            <img src={`/local_icon_${props.localType}.png`} alt="" />
          </div>
        </div>
        <div className="LocalMap__button">
          <Link
            to={`/local/${props.id}`}
            id={props.id}
            className="Dark__button"
          >
            Visitar el sitio
          </Link>
        </div>
      </div>
    </div>
  );
}
