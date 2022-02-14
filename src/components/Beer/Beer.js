import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import { selectUserBeers, updateUserBeers, selectIsAuhenticated } from '../../features/authSlice';
import { putFavouriteBeer } from '../../api/beers';

import '../../styles/BeerList.scss';

export function Beer(props) {
  const dispatch = useDispatch();
  const userBeers = useSelector(selectUserBeers);
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

  // Añadir cerveza como favorita
  function handleAddFavouriteBeer(id) {
    putFavouriteBeer(id)
      .then(() => {
        dispatch(updateUserBeers(id));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // Si la id está incluida en las cervezas del usuario, es favorita
  const isFavourite = (userBeers || []).some((beer) => {
    return beer === props.id || beer._id === props.id;
  });

  return (
    <div className="Beer BeerList__beer">
      <img src="/beer.png" alt="" className="Beer__image" />
      <div className="Beer__sheet">
        <h3 className="Beer__title">{props.name}</h3>
        <h4>{props.brand}</h4>
        <h4>{props.beerType}</h4>
    {isAuthenticated ? (
      <button
      onClick={() => handleAddFavouriteBeer(props.id)}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      className="Beer__favourite Fa__button"
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
    </div>
  );
}
