import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editBeer, pushBeers } from '../../features/beerSlice';
import { putEditBeer, getAllBeers } from '../../api/beers';

import '../../styles/BeerEdit.scss';

export function BeerEdit(props) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    brand: '',
    beerType: '',
  });

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleOkEdit(id, form) {
    putEditBeer(id, form)
      .then((data) => {
        dispatch(editBeer(data));
      })
      .then(() => {
        getAllBeers()
          .then((beers) => {
            dispatch(pushBeers(beers));
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .then(() => {
        props.handleIsEditing();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="Beer BeerEdit">
      <div className="BeerEdit__image">
        <img src="/beer.png" alt="" />
      </div>

      <div className="BeerEdit__sheet">
        <div className="BeerEdit__field">
          <label htmlFor="name" required>
            Nombre de la cerveza
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChangeInput}
            defaultValue={props.name}
          />
        </div>
        <div className="BeerEdit__field">
          <label htmlFor="brand" required>
            Marca de la cerveza
          </label>
          <input
            type="text"
            name="brand"
            onChange={handleChangeInput}
            defaultValue={props.brand}
          />
        </div>
        <div className="BeerEdit__field">
          <label htmlFor="beerType" required>
            Tipo de cerveza
          </label>
          <input
            type="text"
            name="beerType"
            onChange={handleChangeInput}
            defaultValue={props.beerType}
          />
        </div>
        <div className="BeerEdit__buttons">
          <button
            type="button"
            value="Aceptar"
            onClick={() => handleOkEdit(props.id, form)}
            className="Yellow__button"
          >
            Aceptar
          </button>
          <button
            type="button"
            value="Cancelar"
            onClick={props.onCancel}
            className="Dark__button"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
