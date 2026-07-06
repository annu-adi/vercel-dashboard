import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import AddNewAdmin from './components/AddNewAdmin';
import AddNewDoctor from './components/AddNewDoctor';
import Login from './components/Login';
import Doctors from './components/Doctors';
import Messages from './components/Messages';
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { Context } from './main';
import axios from 'axios';
import "./App.css"

const App = () => {
  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context);
   useEffect(() =>{
    const fetchUser = async () =>{
      try{
        const response = await axios.get("http://localhost:4000/api/v1/user/admin/me", {withCredentials:true});
        setIsAuthenticated(true);
        setUser(response.data.user);

      } catch (error){
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
   }, [isAuthenticated]);
  return (
    <BrowserRouter>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/admin/addnew' element={<AddNewAdmin/>}/>
        <Route path='/doctor/addnew' element={<AddNewDoctor/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/messages' element={<Messages />}/>
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  )
}

export default App
