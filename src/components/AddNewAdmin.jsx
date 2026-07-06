import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

const AddNewAdmin = () => {
const {isAuthenticated} = useContext(Context);

   const [firstName,setFirstName] =useState("");
   const [lastName,setLastName] =useState("");
   const [email,setEmail] =useState("");
   const [phone,setPhone] =useState("");
   const [nic, setNic] =useState("");
   const [dob, setDob] =useState("");
   const [gender,setGender] =useState("");
   const [password,setPassword] =useState("");

 const navigateTo = useNavigate();

  




const handleAddNewAdmin = async(e) =>{
    e.preventDefault(); 
    try{
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/admin/addnew",
        {firstName, lastName, email, phone, nic, dob, gender, password,},
        {
      withCredentials:true,
      headers:{"Content-Type":"application/json"},
        }
      );
      toast.success(response.data.message);
      

      navigateTo("/");
    } 
    catch (error) {
      toast.error(error.response.data.message);
    }

   };

   if (!isAuthenticated){
    return <Navigate to={"/login"}/> //navigateTo("/");
   }


  return (
    <>
    <section className='page'>
    <div className='container form-component add-admin-form'>
    {/*//<img src="/school.jpg" alt="logo" className='logo'/>*/}
    <h3 className='form-title'>ADD NEW ADMIN</h3>
    <form onSubmit={handleAddNewAdmin}>

    <div>
      <input type="text" placeholder='first Name' value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
      <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=> setLastName(e.target.value)}/> 
       </div><div>
      <input type="text" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
      <input type="number" placeholder='Phone Number' value={phone} onChange={(e)=> setPhone(e.target.value)}/> 
      </div><div>
      <input type="number" placeholder='NIC' value={nic} onChange={(e)=> setNic(e.target.value)}/>
      <input type="date" placeholder='Date of Birth' value={dob} onChange={(e)=> setDob(e.target.value)}/> 
      </div><div>
        <select value={gender} onChange={(e)=>setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
         <input type="password" placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)}/> 
        </div>
     
              <div style={{justifyContent:"center", alignItems:"center"}}>
                <button type="submit">Add new admin</button>
                
              </div>

  </form>
  
    
  </div>

</section>
    </>
  );
};

export default AddNewAdmin