import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Body from './components/Body'

function App() {
  

  return (
    <>
    
    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Body/>} >
          <Route path='/home'/>
          <Route path='/about'/>
      </Route>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
