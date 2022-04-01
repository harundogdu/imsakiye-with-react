import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API_SERVICE from 'services/apiService'

export const fetchCityByCityName = createAsyncThunk('city/fetchCityByCityName', async (cityName) => {
    const response = await API_SERVICE.get(`/`, {
        params: {
            location: cityName,
        }
    })
    return response
})

const initialState = {
    city: localStorage.getItem('city') || 'İstanbul',
    isLoading: false,
    data: []
}

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        setCity: (state, action) => {
            localStorage.setItem('city', action.payload)
            state.city = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchCityByCityName.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(fetchCityByCityName.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
        })

        builder.addCase(fetchCityByCityName.rejected, (state, action) => {
            state.isLoading = false
        })

    }
})

export const { setCity } = citySlice.actions
export default citySlice.reducer