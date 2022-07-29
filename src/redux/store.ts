import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import sneakersReducer from './sneakers/sneakersSlice';

const rootReducer = combineReducers({
   user: userReducer,
   sneakers: sneakersReducer,
});

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});
