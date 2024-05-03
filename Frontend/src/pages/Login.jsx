// import * as React from 'react';
import { useState } from "react";
import { json } from "react-router-dom";
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { API_URL, TOKEN_KEY} from '../utils/constants'
import "../App.css";
import '../index.css'
// ---------------------------------------------------------------------------------------------

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
// import { useSelector } from "react-redux";


export default function Login() {
  const[loginInfo, setLoginInfo] = useState({
    username:'',
    password:''
})
const [msg, setMsg]=useState('')  
const [showPassword, setShowPassword] = React.useState(false);


// passwoord 
const handleClickShowPassword = () => setShowPassword((show) => !show);
// const handleMouseDownPassword = (event) => {
    // };
    
    // navigate
    const navigate = useNavigate()
    
    const loginHandler=(event)=>{
          event.preventDefault();
        console.log(loginInfo.username,"hjhjh",loginInfo.password)
  
      fetch(`${API_URL}/api/login`,
      {
          method:'POST',
          body:JSON.stringify({username:loginInfo.username, password:loginInfo.password}),
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          }
      }
      )

      .then(res=>res.json())
    .then(data=>{
        if(data.status_code==200){
          localStorage.setItem(TOKEN_KEY,data.token)
          console.log(data.token)
            navigate('/')
      }
      setMsg(data.msg)
    }).catch((e) => setMsg(e.msg))
    }



    const loginEmail=(e)=>{
      setLoginInfo({...loginInfo,username:(e.target.value)})
    }
    
    const loginPassword=(e)=>{
      setLoginInfo({...loginInfo,password:(e.target.value)})
    //   console.log({...loginInfo,password:(e.target.value)})
    }
// ---------------------------------------------------------------------------------------
// const { user } = useSelector((state) => state.auth);
const { user } = ""
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

console.log(  register,"pppp",handleSubmit);
// const navigate = useNavigate();

const submitHandler = async (data) => {
  console.log("submit",data);
};

useEffect(() => {
  user && navigate("/dashboard");
}, [user]);


  // return (
  // <div className='form'>
  // <FormControl sx={{ mt: 2, mb: 4, width: '25ch' }} variant="standard">
  //         <InputLabel htmlFor="standard-adornment-password">Username</InputLabel>
  //         <Input
  //           id="standard-adornment-password"
  //           type="text" onChange={loginEmail}

  //         />
  //       </FormControl>
  //     <FormControl sx={{ mt: 2, mb: 4, width: '25ch' }} variant="standard">
  //         <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
  //         <Input
  //           onChange={loginPassword}
  //           id="standard-adornment-password"
  //           type={showPassword ? 'text' : 'password'}
  //           endAdornment={
  //             <InputAdornment position="end">
  //               <IconButton
  //                 aria-label="toggle password visibility"
  //                 onClick={handleClickShowPassword}
  //               //   onMouseDown={handleMouseDownPassword}
  //               >
  //                 {showPassword ? <VisibilityOff /> : <Visibility />}
  //               </IconButton>
  //             </InputAdornment>
  //           }
  //         />
  //       </FormControl>

  //     <Button variant="contained" onClick={loginHandler}>Login</Button>
  //     <p>{msg}</p>
  //    <p>Don't have account? </p>
  //    <a onClick={()=>{navigate('/registration')}}>sign up</a>
  //   </div>
  // );
// -----------------------------------------------------------------------------------------------

return (
  <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] '>
    <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
      {/* left side */}
      <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
        <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
          <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600'>
            Manage all your task in one place!
          </span>
          <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
            <span>Cloud-Based</span>
            <span>Task Manager</span>
          </p>

          <div className='cell'>
            <div className='circle rotate-in-up-left'></div>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
        >
          <div className=''>
            <p className='text-blue-600 text-3xl font-bold text-center'>
              Welcome back!
            </p>
            <p className='text-center text-base text-gray-700 '>
              Keep all your credential safe.
            </p>
          </div>

          <div className='flex flex-col gap-y-5'>
            <Textbox
              placeholder='email@example.com'
              type='email'
              name='email'
              label='Email Address'
              className='w-full rounded-full'
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />
            <Textbox
              placeholder='your password'
              type='password'
              name='password'
              label='Password'
              className='w-full rounded-full'
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password ? errors.password.message : ""}
            />

            <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>
              Forget Password?
            </span>

            <Button
              type='submit'
              label='Submit'
              className='w-full h-10 bg-blue-700 text-white rounded-full'
            />
          </div>
        </form>
      </div>
    </div>
  </div>
);


}
  
