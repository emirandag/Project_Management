import React from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { Footer, Header } from './components'



const App = () => {
    return (
        <div className='App'>
            <Header />
            <main className='main'>
                <Outlet />
            </main>
            <Footer />
        </div>
  )
}

export default App