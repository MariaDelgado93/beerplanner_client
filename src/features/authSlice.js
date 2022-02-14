import { createSlice } from '@reduxjs/toolkit';

const nameSpace = 'auth';

export const authSlice = createSlice({
  name: nameSpace,
  initialState: {
    isAuthenticated: false,
    isAdmin: false,
    isOwner: false,
    isVisitor: false,
    user: {
      username: '',
      email: '',
      role: '',
      beers: [],
      locals: [],
    },
  },
  reducers: {
    updateUser: (state, action) => {
      state.user.beers = action.payload.beers;
      state.user.locals = action.payload.locals;
    },
    loginUser: (state, action) => {
      const { username, email, user } = action.payload;
      const { role, beers, locals } = user || {};

      state.isAuthenticated = true;
      state.user.username = username || state.user.username;
      state.user.email = email || state.user.email;
      state.user.role = role || state.user.role;
      state.user.beers = beers || state.user.beers;
      state.user.locals = locals || state.user.locals;

      if (state.user.role === 'admin') {
        state.isAdmin = true;
      }
      if (state.user.role === 'owner') {
        state.isOwner = true;
      }
      if (state.user.role === 'visitor') {
        state.isVisitor = true;
      }
    },
    logoutUser: (state, action) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.isOwner = false;
      state.isVisitor = false;
      state.user.username = '';
      state.user.email = '';
    },
    updateUserBeers: (state, action) => {
      const beerId = action.payload;
      const isFavourite = state.user.beers.some((beer) => {
        return beer === beerId || beer._id === beerId;
      });
      // Si la id está en favoritos, la quitamos. En caso contrario, la añadimos al array.
      // Esto debería ocurrir en el lado del servidor y traerlo, pero lo ahcemos en cliente por velocidad.
      if (isFavourite) {
        const filteredBeers = state.user.beers.filter((beer) => {
          if (typeof beer === 'string') {
            return beer !== beerId;
          } else {
            return beer._id !== beerId;
          }
        });
        state.user.beers = filteredBeers;
      } else {
        state.user.beers.push(beerId);
      }
    },

    updateUserLocals: (state, action) => {
      const localId = action.payload;
      const isFavourite = state.user.locals.some((local) => {
        return local === localId || local._id === localId;
      });
      // Si la id está en favoritos, la quitamos. En caso contrario, la añadimos al array.
      if (isFavourite) {
        const filteredLocals = state.user.locals.filter((local) => {
          if (typeof local === 'string') {
            return local !== localId;
          } else {
            return local._id !== localId;
          }
        });
        state.user.locals = filteredLocals;
      } else {
        state.user.locals.push(localId);
      }
    },
  },
});

// Actions
export const {
  updateUser,
  loginUser,
  logoutUser,
  updateUserBeers,
  updateUserLocals,
} = authSlice.actions;

// Selectors
export const selectIsAuhenticated = (state) => state[nameSpace].isAuthenticated;
export const selectUser = (state) => state[nameSpace].user;
export const selectIsAdmin = (state) => state[nameSpace].isAdmin;
export const selectIsOwner = (state) => state[nameSpace].isOwner;
export const selectIsVisitor = (state) => state[nameSpace].isVisitor;
export const selectUserBeers = (state) => state[nameSpace].user.beers;
export const selectUserLocals = (state) => state[nameSpace].user.locals;

export const authSliceReducer = authSlice.reducer;
