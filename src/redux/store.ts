import { configureStore } from "@reduxjs/toolkit";
import { formSlice } from "./reducers/formSlice";

export const store = configureStore({
    reducer: {
        form: formSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch