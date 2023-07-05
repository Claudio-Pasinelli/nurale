import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './applicationState';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): any => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
