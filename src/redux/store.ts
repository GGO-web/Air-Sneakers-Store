import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import sneakersReducer from './sneakers/sneakersSlice';
import cartReducer from './cart/cartSlice';

const rootReducer = combineReducers({
   user: userReducer,
   sneakers: sneakersReducer,
   cart: cartReducer,
});

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});
