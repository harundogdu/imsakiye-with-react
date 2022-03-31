import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import cityReducer from 'features/city/citySlice'

export const store = configureStore({
    reducer: {
        city: cityReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})