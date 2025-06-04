import React from 'react'
import NavBar from '../navBar/navBar'
import './Header.css'

export default function Header() {
  return (
    <header className='header-block'>
          <div className="logo">
            <p className="logo-text">ECOM Cart</p>
          </div>
          <NavBar/>
    </header>
  )
}
