import './login.css';
import Navbar from '../../components/navbar/Navbar';
import { useState } from 'react';
import { Navigate } from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';

const Login = () => { 
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  

  async function login(e){
    e.preventDefault();

    if(username==='' || password===''){
      alert("Please fill all the fields!");
      return;
    }

    const response = await fetch('https://blog-server-two-alpha.vercel.app/login',{
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });

    //if result is ok, navigate to homepage
    if(response.ok){
      //set user id and password globally
      const {_id, username} = await response.json();
      reactLocalStorage.set('id', _id);
      reactLocalStorage.set('username', username);

      console.log("id:" +_id);

      //now redirect
      setRedirect(true);
    }
    else{
      alert('Wrong Credentials!!!');
    }
  }

  if(redirect===true){
    //navigate to login
    return <Navigate to={'/'}/>
  }

  return (
    <div className="login">
        <Navbar/>
        <h1 className="heading">Login</h1> 
        <form onSubmit={login}>
            <input type="text" placeholder="Username" value={username} onChange={ev => setUsername(ev.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={ev => setPassword(ev.target.value)}/>
            <button className="btn">Login</button>
        </form>

    </div>
  )
}

export default Login