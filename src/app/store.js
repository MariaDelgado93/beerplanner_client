import { configureStore } from '@reduxjs/toolkit';
import { mapSliceReducer } from '../features/mapSlice';
import { authSliceReducer } from '../features/authSlice';
import { localSliceReducer } from '../features/localSlice';
import { beerSliceReducer } from '../features/beerSlice';
import { favouriteSliceReducer } from '../features/favouriteSlice';

export default configureStore({
  reducer: {
    map: mapSliceReducer,
    auth: authSliceReducer,
    local: localSliceReducer,
    beer: beerSliceReducer,
    favourite: favouriteSliceReducer
  }
});
