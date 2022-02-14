import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createBeer } from '../../features/beerSlice';
import { postCreateBeer } from '../../api/beers';

import '../../styles/BeerInput.scss';

export function BeerInput(props) {
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

  function handleCreateBeer(e) {
    e.preventDefault();
    // Fetch para crear una cerveza
    postCreateBeer(form)
      .then((response) => {
        dispatch(createBeer(response));
      })
      .then(() => {
        alert('Cerveza creada correctamente');
        props.onCancel();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <div className="BeerInput">
      <form onSubmit={handleCreateBeer}>
        <div className="BeerInput__field">
          <label htmlFor="name">Nombre de la cerveza</label>
          <input
            type="text"
            name="name"
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="BeerInput__field">
          <label htmlFor="brand">Marca de la cerveza</label>
          <input
            type="text"
            name="brand"
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="BeerInput__field">
          <label htmlFor="beerType" required>
            Tipo de la cerveza
          </label>
          <input
            type="text"
            name="beerType"
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="BeerInput__button">
          <input type="submit" value="Crear cerveza" />
          <button type="button" value="Cancelar" onClick={props.onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
