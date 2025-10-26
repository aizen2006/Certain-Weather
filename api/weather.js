/**
 * Vercel Serverless Function - Weather API Proxy
 * 
 * This serverless function acts as a proxy between the frontend and WeatherAPI.
 * It eliminates CORS issues and keeps the API key secure on the server-side.
 * 
 * Endpoint: /api/weather
 * Method: GET
 * Query Parameters:
 *   - q: Query string (city name or lat,lon coordinates)
 *   - type: Type of query (city, latitude and longitude, or Autolocation)
 */

export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get API key from environment variable
        const API_KEY = process.env.VITE_WEATHER_API_KEY;
        
        if (!API_KEY) {
            return res.status(500).json({ error: 'API key is missing' });
        }

        // Get query parameters
        const { q, type } = req.query;

        if (!q) {
            return res.status(400).json({ error: 'Missing required parameter: q' });
        }

        // Build the WeatherAPI URL (using HTTPS for security)
        const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(q)}`;

        // Make the API request to WeatherAPI
        const response = await fetch(weatherApiUrl);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            return res.status(response.status).json({ 
                error: errorData.error?.message || 'Failed to fetch weather data',
                code: errorData.error?.code
            });
        }

        const data = await response.json();

        // Return the weather data to the client
        res.status(200).json(data);
    } catch (error) {
        console.error('Error in weather proxy:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

