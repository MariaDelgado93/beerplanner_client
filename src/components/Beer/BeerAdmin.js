import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import { deleteBeer } from '../../features/beerSlice';
import { deleteBeerById } from '../../api/beers';

import { BeerEdit } from './BeerEdit';

import '../../styles/BeerAdmin.scss';

export function BeerAdmin(props) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  // @TODO: Añadir un modal para preguntar por el borrado de cervezas
  function handleDeleteBeer(id) {
    deleteBeerById(id)
      .then((response) => {
        dispatch(deleteBeer(id));
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
  }

  function handleCancelEdit(e) {
    setIsEditing(false);
  }

  function handleEditBeer(e) {
    setIsEditing(true);
  }
  function IsEditingBeer() {
    setIsEditing(false);
  }

  return (
    <div className="BeerAdmin">
      {isEditing ? (
        <>
          <BeerEdit
            key={props.id}
            id={props.id}
            name={props.name}
            brand={props.brand}
            beerType={props.beerType}
            onCancel={handleCancelEdit}
            handleIsEditing={IsEditingBeer}
          />
        </>
      ) : (
        <div className="Admin__beer">
          <div className="BeerAdmin__image">
            <img src="/beer.png" alt="" />
          </div>
          <div className="BeerAdmin__sheet">
            <div className="BeerAdmin__data">
              <h3>Nombre: {props.name}</h3>
              <h4>Marca: {props.brand}</h4>
              <h4>Tipo: {props.beerType}</h4>
            </div>

            <div className="BeerAdmin__buttons">
              <button
                className="Admin__delete-beer Fa__button"
                onClick={() => handleDeleteBeer(props.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button
                onClick={handleEditBeer}
                className="LocalMap__favourite Fa__button"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
