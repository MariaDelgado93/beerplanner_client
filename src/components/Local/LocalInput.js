import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createLocal } from '../../features/localSlice';
import { postCreateLocal } from '../../api/locals';

import '../../styles/LocalInput.scss';

export function LocalInput(props) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    address: '',
    localType: '',
    longitude: '',
    latitude: '',
  });

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleCreateLocal(e) {
    e.preventDefault();

    // Fetch para crear un local
    postCreateLocal(form)
      .then((response) => {       
          dispatch(createLocal(response));
          props.onCancel()
          alert('Local creado correctamente');      
      })
     
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });
  }


  return (
    <div className="LocalInput">
      <form onSubmit={handleCreateLocal}>
        <div className="LocalInput__field">
          <label htmlFor="name" required>
            Nombre del local
          </label>
          <input type="text" name="name" id="" onChange={handleChangeInput} />
        </div>

        <div className="LocalInput__field">
          <label htmlFor="localType">Tipo de local</label>
          <select name="localType" id="" onChange={handleChangeInput} required>
            <option value="">Elija una opción</option>
            <option value="bar">Bar</option>
            <option value="tienda">Tienda</option>
          </select>
        </div>

        <div className="LocalInput__field">
          <label htmlFor="latitude" required>
            Latitud
          </label>
          <input
            type="text"
            name="latitude"
            id=""
            onChange={handleChangeInput}
          />
        </div>
        <div className="LocalInput__field">
          <label htmlFor="longitude">Longitud</label>
          <input
            type="text"
            name="longitude"
            id=""
            onChange={handleChangeInput}
          />
        </div>

        <div className="LocalInput__field">
          <label htmlFor="address" required>
            Dirección del local
          </label>
          <input
            type="text"
            name="address"
            id=""
            onChange={handleChangeInput}
          />
        </div>

        <input type="submit" value="Crear local" />
      </form>
      <button type="button" value="Cancelar" onClick={props.onCancel}>
        Cancelar
      </button>
    </div>
  );
}
