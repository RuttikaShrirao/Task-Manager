import * as React from 'react';
import { useState,useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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

  return (
  <div className='form'>
  <FormControl sx={{ mt: 2, mb: 4, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Username</InputLabel>
          <Input
            id="standard-adornment-password"
            type="text" onChange={loginEmail}

          />
        </FormControl>
      <FormControl sx={{ mt: 2, mb: 4, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            onChange={loginPassword}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                //   onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

      <Button variant="contained" onClick={loginHandler}>Login</Button>
      <p>{msg}</p>
     <p>Don't have account? </p>
     <a onClick={()=>{navigate('/registration')}}>sign up</a>
    </div>
  );
}
  
