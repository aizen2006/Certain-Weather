/**
 * Weather Redux Slice
 * 
 * This slice manages the application's weather state including:
 * - Current weather data
 * - Search history (persisted in localStorage via middleware)
 * - Loading state
 * - Error handling
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * Load initial history from localStorage
 * This ensures the history persists across page refreshes
 */
const loadHistoryFromStorage = () => {
    try {
        const serializedHistory = localStorage.getItem('weatherHistory');
        if (serializedHistory === null) {
            return [];
        }
        return JSON.parse(serializedHistory);
    } catch (err) {
        console.error('Error loading history from localStorage:', err);
        return [];
    }
};

/**
 * Initial state for the weather slice
 * - currentWeather: The current weather data being displayed
 * - history: Array of previous weather searches (loaded from localStorage)
 * - loading: Boolean flag for loading state
 * - error: Error message string if any
 */
const initialState = {
    currentWeather: null,
    history: loadHistoryFromStorage(),
    loading: false,
    error: null,
};

/**
 * Weather slice with reducers for managing weather state
 */
export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        /**
         * Set the current weather data and add it to history
         * @param {object} action.payload - Contains data and searchParams
         */
        setWeather: (state, action) => {
            const { data, searchParams } = action.payload;
            state.currentWeather = data;
            
            // Create a new history item with unique ID and timestamp
            const historyItem = {
                id: Date.now(),
                data: data,
                searchParams: searchParams,
                timestamp: new Date().toISOString()
            };
            
            // Add to beginning of array (most recent first)
            state.history.unshift(historyItem);
            state.loading = false;
            state.error = null;
        },
        
        /**
         * Set the loading state
         * @param {boolean} action.payload - Loading flag
         */
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        
        /**
         * Set error message and stop loading
         * @param {string} action.payload - Error message
         */
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        
        /**
         * Clear all search history
         */
        clearHistory: (state) => {
            state.history = [];
        },
        
        /**
         * Remove a specific item from history
         * @param {number} action.payload - ID of the history item to remove
         */
        removeHistoryItem: (state, action) => {
            state.history = state.history.filter((item) => item.id !== action.payload);
        },
    },
});

// Export actions for use in components
export const { setWeather, setLoading, setError, clearHistory, removeHistoryItem } = weatherSlice.actions;
export default weatherSlice.reducer;