/**
 * Redux Middleware for localStorage persistence
 * 
 * This middleware automatically saves the weather history to localStorage
 * whenever the Redux state changes. It also loads the history from localStorage
 * when the store is initialized.
 */

// Load initial history from localStorage
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

// Save history to localStorage
const saveHistoryToStorage = (history) => {
    try {
        const serializedHistory = JSON.stringify(history);
        localStorage.setItem('weatherHistory', serializedHistory);
    } catch (err) {
        console.error('Error saving history to localStorage:', err);
    }
};

// Middleware to sync Redux state with localStorage
export const localStorageMiddleware = (store) => (next) => (action) => {
    // Get the result of the action
    const result = next(action);
    
    // Get the current state after the action
    const state = store.getState();
    
    // Save history to localStorage after any action
    saveHistoryToStorage(state.weather.history);
    
    return result;
};

// Function to initialize the store with history from localStorage
export const getInitialState = () => {
    const history = loadHistoryFromStorage();
    return {
        currentWeather: null,
        history: history,
        loading: false,
        error: null,
    };
};

