/**
 * Main App Component
 * 
 * This is the root component that structures the entire application.
 * It renders:
 * - Header: Application header with branding
 * - Hero: Weather search input and current weather display
 * - History: Previous weather searches (persisted in localStorage)
 * - Footer: Application footer
 */

import './App.css'
import Header from './Components/Header/Header.jsx'
import Hero from './Components/Hero/Hero.jsx';
import History from './Components/History/History.jsx';
import Footer from './Components/Footer/Footer.jsx';

function App() {  
  return (
    <>
      <Header />
      <Hero />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <History />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
