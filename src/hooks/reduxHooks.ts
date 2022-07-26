import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from '../redux/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;

export const useAppDispatch: () => AppDispath = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
