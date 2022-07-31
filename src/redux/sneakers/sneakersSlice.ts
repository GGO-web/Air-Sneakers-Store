import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISneaker, ISneakers } from './sneakers.model';

const initialState: ISneakers = { items: [], loading: false, error: '' };

export const fetchSneakers = createAsyncThunk(
   'sneakers/fetchSneakers',
   async () => {
      return fetch(process.env.REACT_APP_BACKEND_URL as string)
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            return data;
         });
   }
);

const sneakersSlice = createSlice({
   name: 'sneakers',
   initialState,
   reducers: {
      setSneakers(state, action: PayloadAction<ISneaker[]>) {
         state.items = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchSneakers.pending, (state, action) => {
         state.loading = true;
      });

      builder.addCase(fetchSneakers.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message as string;
      });

      builder.addCase(fetchSneakers.fulfilled, (state, action: any) => {
         state.loading = false;
         state.items = action.payload.items;
      });
   },
});

export const getSneakersItemsSelector = (store: { sneakers: ISneakers }) =>
   store.sneakers.items;
export const getSneakersLoadingStatus = (store: { sneakers: ISneakers }) =>
   store.sneakers.loading;
export const getSneakersErrors = (store: { sneakers: ISneakers }) =>
   store.sneakers.error;

export const { setSneakers } = sneakersSlice.actions;
export default sneakersSlice.reducer;
