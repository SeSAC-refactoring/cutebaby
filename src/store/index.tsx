import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import babyReducer from './babySlice';
import babygrowReducer from './GrowthDiarySlice';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import vaccinationReducer from './vaccinationSlice';

// 1️⃣ 여러 개의 Reducer를 하나로 합치기
const rootReducer = combineReducers({
    baby: babyReducer,
    babygrow: babygrowReducer,
    vaccination: vaccinationReducer,
});

// 2️⃣ redux-persist 설정 추가
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['babygrow', 'baby', 'vaccination'],
};

// 3️⃣ persistReducer로 감싸기
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Redux Store 설정
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

// 5️⃣ Redux Persistor 생성 (App.tsx에서 사용)
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
