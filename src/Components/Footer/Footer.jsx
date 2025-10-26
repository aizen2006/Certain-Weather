/**
 * Footer Component
 * 
 * Displays the application footer with copyright information.
 * Shows branding and all rights reserved message.
 */
import React from 'react'

function Footer() {
  return (
    <>
    <footer>
        <div className='container mx-auto flex justify-between items-center'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className='text-white text-2xl font-bold'>Copyright © 2025 Certain_Weather. All rights reserved.</div>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer