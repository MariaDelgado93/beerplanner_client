import { createSlice } from '@reduxjs/toolkit';

const nameSpace = 'favourite';

export const favouriteSlice = createSlice({
  name: nameSpace,
  initialState: {
    favouriteBeers: [],
  },
  reducers: {
    getfavouriteBeers: (state, action) => {
      state.favouriteBeers = action.payload;
    },
    addFavouriteBeer: (state, action) => {
      
    }
  }
});

// Actions
export const {getfavouriteBeers} = favouriteSlice.actions;

// Selectors
export const selectFavouriteBeers = state => state[nameSpace].favouriteBeers;

export const favouriteSliceReducer = favouriteSlice.reducer;
