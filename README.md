# 🌤️ Certain Weather - Weather Forecast Application

A modern, responsive weather forecast application built with React and Redux. Search for weather information by city name, coordinates, or use your browser's geolocation. All search history is automatically persisted to browser localStorage.

![Weather Forecast Application](https://img.shields.io/badge/React-19.1.1-blue) ![Redux](https://img.shields.io/badge/Redux-9.2.0-764ABC) ![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.16-38B2AC)

## ✨ Features

- **🔍 Multiple Search Methods**
  - Search by city name
  - Search by latitude and longitude coordinates
  - Automatic location detection using browser geolocation API

- **📊 Comprehensive Weather Data**
  - Current temperature
  - Humidity percentage
  - Wind speed
  - Visibility
  - Precipitation
  - Weather conditions

- **💾 Persistent Search History**
  - All searches are automatically saved to browser localStorage
  - History persists across page refreshes and browser sessions
  - View, delete, or clear all history items
  - Click "View" to reload any previous search

- **🎨 Modern UI/UX**
  - Beautiful, responsive design with Tailwind CSS
  - Smooth animations and hover effects
  - Mobile-friendly interface
  - Loading states and error handling

- **🚀 Built with Modern Tools**
  - React 19 with Hooks
  - Redux Toolkit for state management
  - Vite for blazing-fast development
  - TailwindCSS for styling
  - Vercel Serverless Functions for secure API proxying

- **🔒 Security & CORS Solution**
  - Serverless function proxy eliminates CORS issues
  - API key secured on server-side only
  - Works seamlessly on Vercel deployment

## 📁 Project Structure

```
WeatherForcast/
├── api/
│   └── weather.js                  # Vercel serverless function proxy
├── src/
│   ├── Components/
│   │   ├── Header/
│   │   │   └── Header.jsx          # Application header
│   │   ├── Hero/
│   │   │   ├── Hero.jsx            # Main container for search interface
│   │   │   ├── InputBox.jsx        # Search input form
│   │   │   └── OutputBox.jsx       # Weather data display
│   │   ├── History/
│   │   │   └── History.jsx         # Search history display
│   │   ├── Footer/
│   │   │   └── Footer.jsx          # Application footer
│   │   └── ui/
│   │       └── text-generate-effect.jsx
│   ├── features/
│   │   └── weatherSlice.js         # Redux slice for weather state
│   ├── Store/
│   │   ├── store.js                # Redux store configuration
│   │   └── localStorageMiddleware.js  # Persistence middleware
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles
│   
├── package.json
├── vite.config.js
├── vercel.json                     # Vercel deployment configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A free API key from [WeatherAPI.com](https://www.weatherapi.com/)

### Installation

1. **Clone or download the repository**
   ```bash
   cd WeatherForcast
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the API Key**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
   
   Get your free API key from [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

```bash
npm run preview
```

To preview the production build locally.

## 🚀 Deploying to Vercel

This application is optimized for deployment on Vercel with serverless functions.

### Deployment Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Vercel serverless proxy"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the Vite configuration

3. **Add Environment Variable**
   - In Vercel project settings, go to "Environment Variables"
   - Add: `VITE_WEATHER_API_KEY` with your WeatherAPI key
   - This keeps your API key secure on the server-side

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app with the serverless function

### Local Development with Serverless Functions

To test the serverless function locally:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Run with Vercel dev server (enables serverless functions)
vercel dev
```

**Note**: Running `npm run dev` will NOT work with the proxy setup locally. You must use `vercel dev` to test the `/api/weather` endpoint during development.

## 💾 How localStorage Works

The application uses a Redux middleware to automatically persist search history to browser localStorage:

1. **On App Start**: History is loaded from `localStorage.getItem('weatherHistory')`
2. **On Weather Search**: New searches are added to the Redux store
3. **On State Changes**: Middleware automatically saves to localStorage
4. **Persistence**: History survives page refreshes and browser restarts

### localStorage Key
- **Key Name**: `weatherHistory`
- **Storage**: Browser localStorage (persisted data)
- **Format**: JSON array of search history items

### History Item Structure
```javascript
{
  id: Date.now(),
  data: { /* weather data */ },
  searchParams: { type, city/latitude/longitude },
  timestamp: "ISO date string"
}
```

## 🎯 Usage

1. **Search by City**
   - Select "City" from the dropdown
   - Enter a city name
   - Click "Get Weather"

2. **Search by Coordinates**
   - Select "Latitude and Longitude"
   - Enter latitude and longitude values
   - Click "Get Weather"

3. **Auto-location**
   - Select "Autolocation - By Browser"
   - Grant location permission when prompted
   - Weather automatically loads for your location

4. **View History**
   - Scroll down to see your search history
   - Click "View" to reload a previous search
   - Click "Delete" to remove a single history item
   - Click "Clear All" to remove all history

## 🛠️ Technologies Used

- **React** (v19.1.1) - UI library
- **Redux Toolkit** (v2.9.2) - State management
- **React Redux** (v9.2.0) - React bindings for Redux
- **Vite** (v7.1.7) - Build tool and dev server
- **TailwindCSS** (v4.1.16) - Utility-first CSS framework
- **WeatherAPI.com** - Weather data provider

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 API Configuration

This application uses [WeatherAPI.com](https://www.weatherapi.com/) for weather data.

### Free Tier
- 1 million calls/month
- Current weather data
- No credit card required

### API Endpoints Used
- `GET /v1/current.json` - Current weather data

### Proxy Server Architecture

This application uses a **Vercel Serverless Function** as a proxy to solve CORS issues and secure the API key:

**Flow:**
1. Frontend makes request to `/api/weather?q=Mumbai`
2. Vercel serverless function (`api/weather.js`) receives the request
3. Function fetches data from WeatherAPI using secure server-side API key
4. Function returns weather data to frontend

**Benefits:**
- ✅ No CORS issues (same-origin request)
- ✅ API key never exposed to client
- ✅ Works seamlessly on Vercel deployment
- ✅ Serverless = no server management needed

## 🎨 Features in Detail

### Search Methods
1. **City Search**: Search by any city name worldwide
2. **Coordinate Search**: Enter precise lat/long coordinates
3. **Auto-location**: Uses HTML5 Geolocation API for automatic location detection

### Weather Data Display
- Temperature in Celsius
- Humidity percentage
- Wind speed in km/h
- Visibility in km
- Precipitation in mm
- Weather condition description

### History Management
- All searches are timestamped
- View previous searches with metadata
- Delete individual items
- Clear all history with confirmation
- Data persists in localStorage

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available for learning purposes.

## 🙏 Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) for weather data
- React and Redux communities
- TailwindCSS team
- Vite team for the amazing build tool

---

**Built with ❤️ using React and Redux**
