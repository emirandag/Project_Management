import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard, Home, Gallery, Details, CheckCode, Register, Login, ForgotPassword, Profile, Projects, Tasks, Project, AddMember } from './pages'
import { AuthContextProvider } from './context/authContext.jsx'
import { Protected, ProtectedCheckChildren } from './components/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/dashboard' element={
            <Protected>
              <Dashboard />    
            </Protected>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/checkCode' element={
          <ProtectedCheckChildren>
            <CheckCode />
          </ProtectedCheckChildren>
          
          } />
          {/* <Route path='/gallery' element={
            <Protected>
              <Gallery />
            </Protected>} /> */}
          <Route path='/details' element={
            <Protected>
              <Details />
            </Protected>
            } />
            <Route path='/profile' element={
              <Protected>
                <Profile />
              </Protected>
            } />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/projects" element={
              <Protected>
                <Projects />
              </Protected>
            } />
            <Route path="/projects/:id" element={
              <Protected>
                <Project />
              </Protected>
            } />
            <Route path="/projects/:id/addmember" element={
              <Protected>
                <AddMember />
              </Protected>
            } />
            <Route path="/tasks" element={
              <Protected>
                <Tasks />
              </Protected>
            } />
        </Route>
      </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
