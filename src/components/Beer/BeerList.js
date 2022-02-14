import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

import { Beer } from './Beer';

import { pushBeers, selectBeers } from '../../features/beerSlice';
import { getAllBeers, getFilterBeers } from '../../api/beers';

import '../../styles/BeerList.scss';

export function BeerList() {
  const beers = useSelector(selectBeers);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    beerName: '',
    brand: ''
  });

  useEffect(() => {
    getAllBeers()
      .then(beers => {
        dispatch(pushBeers(beers));
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const { beerName, brand } = form;
  useEffect(() => {
    getFilterBeers(beerName, brand)
      .then(beer => {
        dispatch(pushBeers(beer));
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [form]);

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }
  if (isLoading) {
    return (
      <div className="loader">
        <Loader type="ThreeDots" color="#FFFF33" height="100" width="100" />
      </div>
    );
  }

  return (
    <div className="BeerList content">
      <div className="Search__inputs">
        <div className="Search__TextInput">
          <label htmlFor="beerName">Buscar por nombre</label>
          <input
            type="text"
            name="beerName"
            id="beerName"
            onChange={handleChangeInput}
          />
        </div>
        <div className="Search__TextInput">
          <label htmlFor="brand">Buscar por marca</label>
          <input
            type="text"
            name="brand"
            id="brand"
            onChange={handleChangeInput}
          />
        </div>
      </div>
      <div className="BeerList__list">
        {beers.length ? (
          beers.map(beer => (
            <Beer
              key={beer._id}
              id={beer._id}
              name={beer.name}
              brand={beer.brand}
              beerType={beer.beerType}
              favouriteCount={beer.favouriteCount}
            />
          ))
        ) : (
          <p>¡Todavía no hay cervezas creadas!</p>
        )}
      </div>
    </div>
  );
}
