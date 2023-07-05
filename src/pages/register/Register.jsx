import React from 'react';
import './register.css';
import Navbar from '../../components/navbar/Navbar';
import { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');

  async function register(ev){ 
    ev.preventDefault();

    if(username==='' || password===''){
      alert('Please fill the required fields*'); 
      return;
    }
    if(password.length < 5){
      alert('Passwords must be at least 5 characters');
      return; 
    }

    const response = await fetch('https://blog-server-two-alpha.vercel.app/register/', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'}, 
    });

    if(response.status === 200){ 
      alert('Registration Success!!!');
    }
    else{
      alert('Registration Failed!!!');
    }
  }

  return (
    <div className="register">
        <Navbar/>
        <h1 className="heading">Register</h1>
        <form onSubmit={register}>
            <input type="text" placeholder="Username" value={username} onChange={ev => {setUsername(ev.target.value)}}/>
            <input type="password" placeholder="Password" value={password} onChange={ev=> {setPassword(ev.target.value)}}/>
            <button className="btn">Register</button>
        </form>

    </div>
  )
}

export default Register;