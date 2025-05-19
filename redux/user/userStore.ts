import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { userReducer } from "./userReducer";
import persistStore from "redux-persist/es/persistStore";

const persistedReducer = persistReducer({ key: "root", version: 1, storage: AsyncStorage }, userReducer);

export const userStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REGISTER, PAUSE, PERSIST, PURGE, REHYDRATE]
        }
    })
})

export type AppDispatch = typeof userStore.dispatch;
export type RootState = ReturnType<typeof userStore.getState>;
export const persistor = persistStore(userStore);