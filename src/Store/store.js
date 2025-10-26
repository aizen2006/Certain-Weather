/**
 * Redux Store Configuration
 * 
 * This file configures the Redux store for the Weather Forecast application.
 * It integrates the weather reducer and localStorage middleware for persistence.
 */

import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from '../features/weatherSlice';
import { localStorageMiddleware } from './localStorageMiddleware';


/**
 * Configure the Redux store with:
 * - weatherReducer: Manages weather data and history
 * - localStorageMiddleware: Automatically persists history to browser localStorage
 */
export const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;