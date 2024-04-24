import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import About from "./components/About.jsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Expense from './components/expense'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/about" element={<About/>}/>
      <Route path="/expense/:category" element={<Expense/>}/>
    </Routes>
  </BrowserRouter>
  

  <ToastContainer/>
  
    
  </React.StrictMode>,
)