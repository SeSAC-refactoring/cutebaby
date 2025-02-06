import { configureStore } from '@reduxjs/toolkit';
import babyReducer from './babySlice';
// import vaccinationReducer from './vaccinationSlice';

export const store = configureStore({
    reducer: {
        baby: babyReducer,
        // vaccination: vaccinationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
