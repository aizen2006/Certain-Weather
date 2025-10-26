/**
 * Header Component
 * 
 * Displays the application header with branding.
 * Features a dark background with the application name.
 */
import React from 'react'

function Header() {
  return (
    <>
    <header className='bg-gray-800 p-4'>
        <div className='container mx-auto flex justify-between items-center'>
            <div className='text-white text-2xl font-bold text-center'>Certain_Weather</div>
        </div>
    </header>
    </>
  )
}
export default Header