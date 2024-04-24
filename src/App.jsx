
import './App.css';
import Header from './components/Header';

import { v4 as uuidv4 } from 'uuid';
import React,{useEffect,useState}from 'react';
import Home from './components/Home.jsx';
import Form from './components/form.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Expense from './components/expense';


function App() {
  const [Users,setUsers]=useState(null)


  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await axios.get("http://localhost:8000/api")
        setUsers(response.data);
      }
      catch(error){
        console.error(error)
      }
      
      
    }
    fetchData();
    
  },[]);
  console.log(Users)


  const [category,setCategory]=useState([]);
  Users&&Users?.map((item)=>{
    category.includes(item.category)?" ":category.push(item.category);
  })
  console.log(category)


  return (
    <>
    
    {/* <Header/> */}
    {/* <Home category={category} setCategory={setCategory}/> */}
    <Expense Users={Users} setUsers={setUsers}/>  
    {/* <Form/> */}
    
      
      
    </>
  )
}

export default App;
