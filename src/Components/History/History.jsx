/**
 * History Component
 * 
 * Displays the search history loaded from localStorage.
 * 
 * Features:
 * - Shows all previous weather searches with timestamps
 * - View again button to reload weather for a location
 * - Delete individual history items
 * - Clear all history button
 * - Auto-scrolls to top when viewing a previous search
 * 
 * Data Persistence:
 * - History is loaded from browser localStorage
 * - Changes are automatically saved via Redux middleware
 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeHistoryItem, clearHistory, setWeather } from '../../features/weatherSlice';

function History() {
    const dispatch = useDispatch();
    // Get history from Redux store (loaded from localStorage on app start)
    const history = useSelector((state) => state.weather.history);

    /**
     * Handle viewing a previous search again
     * Dispatches the historical weather data to the Redux store
     * Scrolls to the top to show the weather display
     */
    const handleViewAgain = (historyItem) => {
        dispatch(setWeather({ 
            data: historyItem.data, 
            searchParams: historyItem.searchParams 
        }));
        // Scroll to top to show the weather
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /**
     * Handle deleting a single history item
     * Removes the item from Redux store (saved to localStorage via middleware)
     */
    const handleDelete = (id) => {
        dispatch(removeHistoryItem(id));
    };

    /**
     * Handle clearing all history
     * Shows confirmation dialog before clearing
     */
    const handleClearAll = () => {
        if (confirm('Are you sure you want to clear all history?')) {
            dispatch(clearHistory());
        }
    };

    if (history.length === 0) {
        return (
            <div className="mt-8 p-6 bg-neutral-100 rounded-lg">
                <h2 className="text-2xl font-bold text-neutral-700 mb-4">Search History</h2>
                <p className="text-neutral-500">No search history yet. Start searching for weather!</p>
            </div>
        );
    }

    return (
        <div className="mt-8 p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-neutral-700">Search History</h2>
                <button 
                    onClick={handleClearAll}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                    Clear All
                </button>
            </div>
            <div className="space-y-3">
                {history.map((item) => (
                    <div 
                        key={item.id} 
                        className="bg-white p-4 rounded-md shadow-sm border border-neutral-200 hover:shadow-md transition"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="font-semibold text-neutral-800">
                                    {item.data?.location?.name}, {item.data?.location?.country}
                                </p>
                                <p className="text-sm text-neutral-600 mt-1">
                                    Temperature: {item.data?.current?.temp_c}°C
                                </p>
                                <p className="text-xs text-neutral-500 mt-1">
                                    {new Date(item.timestamp).toLocaleString()}
                                </p>
                                <p className="text-xs text-neutral-500">
                                    Search by: {item.searchParams?.type || 'Unknown'}
                                    {item.searchParams?.type === 'city' && ` - ${item.searchParams.city}`}
                                    {item.searchParams?.type === 'latitude and longitude' && ` - ${item.searchParams.latitude}, ${item.searchParams.longitude}`}
                                </p>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <button 
                                    onClick={() => handleViewAgain(item)}
                                    className="px-3 py-1 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600 transition"
                                >
                                    View
                                </button>
                                <button 
                                    onClick={() => handleDelete(item.id)}
                                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default History;
