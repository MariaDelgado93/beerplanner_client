import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

import { Local } from './Local';

import { pushLocals, selectLocals } from '../../features/localSlice';
import { getAllLocals, getFilterLocals } from '../../api/locals';

import '../../styles/Search.scss';


export function Search() {
  const locals = useSelector(selectLocals);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    localName: '',
    localType: ''
  });
  useEffect(() => {
    getAllLocals()
      .then(local => {
        dispatch(pushLocals(local));
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const { localName, localType } = form;
  useEffect(() => {
    getFilterLocals(localName, localType)
      .then(local => {
        console.log(local);
        dispatch(pushLocals(local));
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [form]);
  if (isLoading) {
    return (
      <div className="loader">
        <Loader type="ThreeDots" color="#FFFF33" height="100" width="100" />
      </div>
    );
  }
  function handleChangeInput(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }
  return (
    <div className="Search content">
      <div className="Search__TextInput">
        <label htmlFor="localName">Buscar por nombre</label>
        <input
          type="text"
          name="localName"
          id="localName"
          onChange={handleChangeInput}
        />
      </div>
      <div className="Search__field">
        <label htmlFor="localType">Tipo de local</label>
        <select name="localType" value={localType} onChange={handleChangeInput}>
          <option value="">Seleccione opción</option>
          <option value="bar">Bar</option>
          <option value="tienda">Tienda</option>
        </select>
      </div>
      <div className="Search__LocalList">
        {locals.length ? (
          locals.map(local => (
            <Local
              key={local._id}
              id={local._id}
              name={local.name}
              addresss={local.addresss}
              localType={local.localType}
              favouriteCount={local.favouriteCount}
            />
          ))
        ) : (
          <p>¡Todavía no hay locales creados!</p>
        )}
      </div>
    </div>
  );
}
