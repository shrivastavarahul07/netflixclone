import React from 'react'
import { Link } from 'react-router-dom'
import {ImSearch} from 'react-icons/im'
const Header = () => {
  return (
    <>
    <nav className='header'>
    <img src="https://www.edigitalagency.com.au/wp-content/uploads/netflix-logo-png-large.png" alt="logo" />

    <div>
        <Link to="/">TV Shows</Link>
        <Link to="/">Movies</Link>
        <Link to="/">Recently Added</Link>
        <Link to="/">My List</Link>
    </div>
    <ImSearch/>
    </nav>
    </>
  )
}

export default Header