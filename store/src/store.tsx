import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './features/basket/basketslice'

export default configureStore({
    reducer: {
        basket: basketReducer
    }
})