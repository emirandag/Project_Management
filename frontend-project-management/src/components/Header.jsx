import './Header.css'
import React from 'react'
import { Nav } from './Nav'
import { useResize } from '../hooks'

export const Header = () => {
    const { ancho } = useResize()
    return (
        <header className='header'>
            {
                ancho > 600
                    ?
                    <Nav />
                    :
                    <div className='nav-hamburger'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
            }
        </header>
    )
}