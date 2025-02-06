import { configureStore } from '@reduxjs/toolkit';
import babyReducer from './babySlice';
import babygrowReducer from './GrowthDiarySlice'

export const store = configureStore({
    reducer: {
        baby: babyReducer,
        babygrow : babygrowReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
