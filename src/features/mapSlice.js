import { createSlice } from '@reduxjs/toolkit';

const nameSpace = 'map';

export const mapSlice = createSlice({
  name: nameSpace,
  initialState: {
    userPosition: {
      lng: null,
      lat: null,
    },
    locals: [],
  },
  reducers: {
    setUserPosition: (state, action) => {
      state.userPosition.lng = action.payload.lng;
      state.userPosition.lat = action.payload.lat;
    },
    pushLocals: (state, action) => {
      state.locals = action.payload;
    },
  },
});

// Actions
export const { setUserPosition, pushLocals } = mapSlice.actions;

// Selectors
export const selectUserPosition = (state) => state[nameSpace].userPosition;
export const selectLocals = (state) => state[nameSpace].locals;

export const mapSliceReducer = mapSlice.reducer;
