/**
 * InputBox Component
 * 
 * Provides the search interface for weather data with three search methods:
 * 1. City search - Enter a city name
 * 2. Latitude/Longitude - Enter coordinates manually
 * 3. Autolocation - Use browser geolocation API
 * 
 * Features:
 * - Dynamic form based on search type
 * - Automatic geolocation when Autolocation is selected
 * - Form validation
 */
import { useState, useEffect, useCallback } from 'react';

export default function InputBox({ selectionType, setSelectionType, latitude, setLatitude, longitude, setLongitude, city, setCity, onFetchTrigger }) {
    // Store autolocation data when fetched
    const [autoLocData, setAutoLocData] = useState(null);

    /**
     * Handle form submission
     * Prevents default form behavior and triggers weather fetch
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Trigger weather fetch in OutputBox
        if (onFetchTrigger) {
            onFetchTrigger();
        }
    };

    /**
     * Get user's current location using browser Geolocation API
     * Updates both local and parent state with coordinates
     */
    const getGeolocation = useCallback(() => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setAutoLocData({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                // Update parent state with lat/lon
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
                alert(`Error getting location: ${error.message}`);
            }
        );
    }, [setLatitude, setLongitude]);

    // Auto-get location when Autolocation is selected
    useEffect(() => {
        if (selectionType === 'Autolocation') {
            getGeolocation();
        }
    }, [selectionType, getGeolocation]);

    return (
        <div className="flex flex-col gap-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label className="text-neutral-500 text-sm" htmlFor="selection-type">
                    Select the Way to get the weather
                </label>
                <select 
                    className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md" 
                    name="selection-type" 
                    id="selection-type" 
                    value={selectionType} 
                    onChange={(e) => setSelectionType(e.target.value)}
                >
                    <option value="city">City</option>
                    <option value="latitude and longitude">Latitude and Longitude</option>
                    <option value="Autolocation">Autolocation - By Browser</option>
                </select>
                
                {selectionType === 'city' && (
                    <input 
                        className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md" 
                        type="text" 
                        placeholder="Enter City" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)} 
                        required
                    />
                )}
                
                {selectionType === 'latitude and longitude' && (
                    <>
                        <input 
                            className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md" 
                            type="number" 
                            step="any"
                            placeholder="Enter Latitude" 
                            value={latitude} 
                            onChange={(e) => setLatitude(e.target.value)} 
                            required
                        />
                        <input 
                            className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md" 
                            type="number" 
                            step="any"
                            placeholder="Enter Longitude" 
                            value={longitude} 
                            onChange={(e) => setLongitude(e.target.value)} 
                            required
                        />
                    </>
                )}
                
                {selectionType === 'Autolocation' && autoLocData && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-blue-700 text-sm">
                            Location found:
                            <br />
                            Latitude: {autoLocData.latitude.toFixed(4)}
                            <br />
                            Longitude: {autoLocData.longitude.toFixed(4)}
                        </p>
                    </div>
                )}
                
                <button 
                    type="submit"
                    className="px-4 py-2 rounded-md border border-neutral-300 bg-indigo-600 text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md font-semibold"
                >
                    Get Weather
                </button>
            </form>
        </div>
    );
}
