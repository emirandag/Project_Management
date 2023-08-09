import './Header.css'
import React, { useState } from 'react'
import { Nav } from './Nav'
import { useResize } from '../hooks'

export const Header = () => {
    const { ancho } = useResize()
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className='header'>
            {
                ancho > 600
                    ?
                    <Nav />
                    :
                    
                    <div className={`nav-hamburger ${isOpen && 'open'}`}
                    onClick={() => setIsOpen(!isOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
            }
        </header>
    )
}