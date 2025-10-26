/**
 * Hero Component
 * 
 * Main container for the weather search interface.
 * Manages the search parameters and orchestrates the InputBox and OutputBox components.
 * 
 * State Management:
 * - selectionType: Method of search (city, coordinates, or autolocation)
 * - city: City name for search
 * - latitude/longitude: Coordinates for search
 * - triggerFetch: Counter that triggers weather API fetch
 */
import React, { useState } from 'react';
import InputBox from './InputBox.jsx';
import OutputBox from './OutputBox.jsx';

function Hero() {
  // State for search type selection
  const [selectionType, setSelectionType] = useState('city');
  
  // State for search parameters
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  
  // Counter to trigger weather fetch
  const [triggerFetch, setTriggerFetch] = useState(0);

  /**
   * Handles the fetch trigger from the submit button
   * Increments the trigger counter to initiate weather fetch
   */
  const handleFetchTrigger = () => {
    setTriggerFetch(prev => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-neutral-800 mb-8 text-center">
          Weather Forecast
        </h1>
        <InputBox 
          selectionType={selectionType} 
          setSelectionType={setSelectionType} 
          latitude={latitude} 
          setLatitude={setLatitude} 
          longitude={longitude} 
          setLongitude={setLongitude} 
          city={city} 
          setCity={setCity}
          onFetchTrigger={handleFetchTrigger}
        />
        <OutputBox 
          selectionType={selectionType} 
          latitude={latitude} 
          longitude={longitude} 
          city={city}
          triggerFetch={triggerFetch}
        />
      </div>
    </div>
  );
}

export default Hero;