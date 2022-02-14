import { createSlice } from '@reduxjs/toolkit';

const nameSpace = 'local';

export const localSlice = createSlice({
  name: nameSpace,
  initialState: {
    isAuthenticated: false,
    isOwner: false,
    local: {
      name: '',
      localType: '',
      location: { lng: 0, lat: 0 },
      isActive: false,
    },
    localList: [],
  },
  reducers: {
    createLocal: (state, action) => {   
        state.isAuthenticated = true;
        state.isOwner = true;
        state.local.name = action.payload.name;
        state.local.localType = action.payload.localType;
        state.local.location.lat = action.payload.location.coordinates[1];
        state.local.location.lng = action.payload.location.coordinates[0];     
    },
    pushLocals: (state, action) => {
      state.localList = action.payload;
    },
    editLocal : (state, action) => {
      state.local.name = action.payload.name;
      state.local.address = action.payload.address;
      state.local.localType = action.payload.localType;
      // state.local.location.lat = action.payload.location.coordinates[1];
      // state.local.location.lng = action.payload.location.coordinates[0];  
    },
  },
});
// Actions
export const { createLocal, pushLocals, editLocal } = localSlice.actions;

// Selectors
export const selectIsAuhenticated = (state) => state[nameSpace].isAuthenticated;
export const selectIsOwner = (state) => state[nameSpace].isOwner;
export const selectLocals = (state) => state[nameSpace].localList;

export const localSliceReducer = localSlice.reducer;
