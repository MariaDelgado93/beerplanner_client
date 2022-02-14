import { createSlice } from '@reduxjs/toolkit';

const nameSpace = 'beer';

export const beerSlice = createSlice({
  name: nameSpace,
  initialState: {
    isAuthenticated: false,
    isAdmin: false,
    beer: {
      name: '',
      brand: '',
      localType: '',
    },
    beers: [],
  },
  reducers: {
    createBeer: (state, action) => {
      state.isAuthenticated = true;
      state.isAdmin = true;
      state.beer.name = action.payload.name;
      state.beer.brand = action.payload.brand;
      state.beer.beerType = action.payload.beerType;
    },
    pushBeers: (state, action) => {
      state.beers = action.payload;
    },
    editBeer : (state, action) => {
      state.beer.name = action.payload.name;
      state.beer.brand = action.payload.brand;
      state.beer.beerType = action.payload.beerType;
    },
    deleteBeer: (state, action) => {
      state.beers = state.beers.filter((beer) => {
        return beer._id !== action.payload
      });
    },
  },
});

// Actions
export const { createBeer, pushBeers, editBeer, deleteBeer } = beerSlice.actions;

// Selectors
export const selectIsAuhenticated = (state) => state[nameSpace].isAuthenticated;
export const selectIsAdmin = (state) => state[nameSpace].isAdmin;
export const selectBeers = (state) => state[nameSpace].beers;

export const beerSliceReducer = beerSlice.reducer;
