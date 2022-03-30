import { configureStore } from '@reduxjs/toolkit'
import cityReducer from 'features/city/citySlice'


export const store = configureStore({
    reducer: {
        city: cityReducer
    },
})