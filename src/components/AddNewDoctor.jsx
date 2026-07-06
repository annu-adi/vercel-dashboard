import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

const AddNewDoctor = () => {
const {isAuthenticated} = useContext(Context);

   const [firstName,setFirstName] =useState("");
   const [lastName,setLastName] =useState("");
   const [email,setEmail] =useState("");
   const [phone,setPhone] =useState("");
   const [nic, setNic] =useState("");
   const [dob, setDob] =useState("");
   const [gender,setGender] =useState("");
   const [password,setPassword] =useState("");
   const [doctorDepartment, setDoctorDepartment] = useState("");
   const [docAvatar, setDocAvatar] = useState("");
   const[docAvatarPreview, setDocAvatarPreview] = useState("");

   const departmentsArray = [
    "Pediatries",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncolgy",
    "Radiology",
    "Phsical Therapy",
    "Dermatology",
    "ENT"
  ];

 const navigateTo = useNavigate(); 
 
 
 const handleAvatar = async (e)=>{
    const file =e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
    setDocAvatarPreview(reader.result);
    setDocAvatar(file);
    };
   };



const handleAddNewDoctor = async(e) =>{
    e.preventDefault(); 
    try{
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("nic", nic);
      formData.append("gender", gender);
      formData.append("password", password);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      formData.append("dob", dob);
      




      const response = await axios.post(
        "http://localhost:4000/api/v1/user/doctor/addnew",
        formData,
        {
      withCredentials:true,
      headers:{"Content-Type":"multipart/form-data"},
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
    <img src="/images.jpg" alt="logo" className='logo'/>
    <h3 className='form-title'>REGISTER A NEW DOCTOR</h3>
    <form onSubmit={handleAddNewDoctor}>


      
      <div className="first-wrapper">
        
         
          <div className='mon'> 
        <img src={docAvatarPreview ? `${docAvatarPreview}`:"/Tajmahal.jpg"} 
          alt="Doctor Avatar" /> 
</div>
          <input type="file" onChange={handleAvatar}/>
        </div>
        
    

          <div>

      <input type="text" placeholder='firstName' value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
      <input type="text" placeholder='LastName' value={lastName} onChange={(e)=> setLastName(e.target.value)}/> 
       </div>
       <div>
      <input type="text" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
      <input type="number" placeholder='Phone Number' value={phone} onChange={(e)=> setPhone(e.target.value)}/> 
      </div>
      <input type="number" placeholder='NIC' value={nic} onChange={(e)=> setNic(e.target.value)}/>
      <input type="date" placeholder='Date of Birth' value={dob} onChange={(e)=> setDob(e.target.value)}/> 
    <div>
        <select value={gender} onChange={(e)=>setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        
         <input type="password" placeholder='password' value={password} 
         onChange={(e)=> setPassword(e.target.value)}/> 
         </div>
         <select value={doctorDepartment}
         onChange={(e)=> setDoctorDepartment(e.target.value)}>
          <option value="">Select Department</option>
          {departmentsArray.map((element, index)=>{
            return(
              <option value={element} key={index}>
                {element}
              </option>
            );
          })

          }
          </select>
          <div style={{alignItems:'center'}}>
 <button type="submit" >Register New Doctor</button>
        </div>
     
           


  </form>
  
    
  </div>

</section>
    </>
  );
};

export default AddNewDoctor;