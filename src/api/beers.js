import { getRequest, postRequest, putRequest, deleteRequest } from './index';

export const getAllBeers = async () => getRequest('/beers');
export const getBeerById = async (id) => getRequest(`/beers/search/${id}`);
export const getFilterBeers = async (beerName, brand) =>
  getRequest(`/beers?name=${beerName}&brand=${brand}`);

export const deleteBeerById = async (id) => deleteRequest(`/beers/${id}`);

export const postCreateBeer = async (body) =>
  postRequest('/beers/create', body);

export const putFavouriteBeer = async (id) =>
  putRequest(`/beers/favourite/${id}`);

export const putEditBeer = async (id, body) => 
  putRequest(`/beers/${id}`, body);
