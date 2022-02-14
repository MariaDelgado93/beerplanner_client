import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editLocal, pushLocals } from '../../features/localSlice';
import { putEditLocal, getOwnerLocals } from '../../api/locals';

import '../../styles/LocalOwner.scss';

export function LocalOwner(props) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    address: '',
    localType: '',  
  });

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }
  function handleOK(id, form) {
    putEditLocal(id, form)
      .then((data) => {
        dispatch(editLocal(data));
      })
      .then(() => {
        getOwnerLocals()
          .then((locals) => {
            dispatch(pushLocals(locals));
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
    <div className="Local LocalOwner__local">
      <img src="/local.png" alt="" className="Local_image" />
      <div className="Local__sheet">
        <div className="LocalOwner__field">
          <label htmlFor="name" required>
            Nombre del local
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChangeInput}
            defaultValue={props.name}
            required
          />
        </div>
        <div className="LocalOwner__field">
          <label htmlFor="address">
            Dirección del local
          </label>
          <input
            type="text"
            name="address"
            onChange={handleChangeInput}
            defaultValue={props.address}
            required
          />
        </div>
        <div className="Search__field">
          <label htmlFor="localType">Tipo de local</label>
          <select
            name="localType"
            value={props.localType}
            onChange={handleChangeInput}
          >
            <option value="bar">Bar</option>
            <option value="tienda">Tienda</option>
          </select>
        </div>       

        <button
          type="button"
          value="Aceptar"
          onClick={() => handleOK(props.id, form)}
        >
          Aceptar
        </button>
        <button type="button" value="Cancelar" onClick={props.onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
