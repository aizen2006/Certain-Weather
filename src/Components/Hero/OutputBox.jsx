/**
 * OutputBox Component
 * 
 * Displays weather information fetched from the WeatherAPI.
 * 
 * Features:
 * - Fetches weather data based on search parameters
 * - Displays current weather conditions
 * - Shows temperature, humidity, wind speed, visibility, precipitation, and conditions
 * - Manages loading and error states
 * - Auto-saves searches to Redux state (persisted in localStorage)
 */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWeather, setLoading, setError } from '../../features/weatherSlice';

function OutputBox({ selectionType, latitude, longitude, city, triggerFetch }) {
    const dispatch = useDispatch();
    const { currentWeather, loading, error } = useSelector((state) => state.weather);
    const [prevTrigger, setPrevTrigger] = useState(0);

    /**
     * Effect hook that fetches weather data when triggerFetch changes
     * Builds the appropriate API URL based on search type
     * Saves the weather data to Redux store (which persists to localStorage)
     */
    useEffect(() => {
        if (!triggerFetch || triggerFetch === prevTrigger) return;
        setPrevTrigger(triggerFetch);

        const fetchWeather = async () => {
            dispatch(setLoading(true));
            try {
                const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
                
                if (!API_KEY) {
                    throw new Error('API key is missing');
                }

                let url = '';
                let searchParams = {};

                // Build URL and search params based on selection type
                if (selectionType === 'city' && city) {
                    url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
                    searchParams = { type: 'city', city };
                } 
                else if (selectionType === 'latitude and longitude' && latitude && longitude) {
                    url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`;
                    searchParams = { type: 'latitude and longitude', latitude, longitude };
                } 
                else if (selectionType === 'Autolocation' && latitude && longitude) {
                    url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`;
                    searchParams = { type: 'Autolocation', latitude, longitude };
                } 
                else {
                    throw new Error('Invalid parameters for weather search');
                }

                const response = await fetch(url);
                if (!response.ok) throw new Error(`Failed to fetch weather: ${response.statusText}`);
                const data = await response.json();
                
                // Dispatch to Redux - automatically saved to localStorage via middleware
                dispatch(setWeather({ data, searchParams }));
            } catch (err) {
                dispatch(setError(err.message));
            }
        };

        fetchWeather();
    }, [triggerFetch, prevTrigger, selectionType, city, latitude, longitude, dispatch]);

    if (loading) {
        return (
            <div className="mt-4 p-4 bg-neutral-100 rounded-md">
                <p className="text-neutral-500">Loading weather data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">Error: {error}</p>
            </div>
        );
    }

    if (!currentWeather) {
        return (
            <div className="mt-4 p-4 bg-neutral-100 rounded-md">
                <p className="text-neutral-500">Enter search parameters and click "Get Weather"</p>
            </div>
        );
    }

    return (
        <div className="mt-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-neutral-800">
                {currentWeather.location?.name}, {currentWeather.location?.country}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-neutral-600 mb-2">Temperature</p>
                    <p className="text-2xl font-bold text-indigo-600">{currentWeather.current?.temp_c}°C</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-neutral-600 mb-2">Humidity</p>
                    <p className="text-2xl font-bold text-indigo-600">{currentWeather.current?.humidity}%</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-neutral-600 mb-2">Wind Speed</p>
                    <p className="text-2xl font-bold text-indigo-600">{currentWeather.current?.wind_kph} km/h</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-neutral-600 mb-2">Visibility</p>
                    <p className="text-2xl font-bold text-indigo-600">{currentWeather.current?.vis_km} km</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-neutral-600 mb-2">Precipitation</p>
                    <p className="text-2xl font-bold text-indigo-600">{currentWeather.current?.precip_mm} mm</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-neutral-600 mb-2">Condition</p>
                    <p className="text-lg font-semibold text-indigo-600">{currentWeather.current?.condition?.text || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

export default OutputBox;