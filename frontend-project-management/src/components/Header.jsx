import './Header.css'
import React, { useState } from 'react'
import { Nav } from './Nav'
import { useResize } from '../hooks'

export const Header = () => {
    const { ancho } = useResize()
    //const [isOpen, setIsOpen] = useState(false);
    return (
        <header className='header'>

            <Nav />
        </header>
    )
}