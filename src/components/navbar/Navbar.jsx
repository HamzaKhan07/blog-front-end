import React from 'react';
import './navbar.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';

const Navbar = () => {
  const [username, setUsername] = useState(null);

  useEffect(()=>{ 
    //set username 
    setUsername(reactLocalStorage.get('username'));
    console.log("Nav username: "+reactLocalStorage.get('username'));
  }, []);

  function logout(){
    //reset 
    reactLocalStorage.set('username', '');
    reactLocalStorage.set('id', '');

    setUsername(null);
  }

  return (

      <div className="nav">
        <Link to="/">
            <div className="logo">
              
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
            </Link>
          <ul className="links">

              {username && (
                <>
                  <li><a href="/create">Create</a></li>
                  
                  <li><a href="/" onClick={logout}>Sign out</a></li>
                </>
              )}

              {!username && (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
    
          </ul>
      </div>
  
  )
}

export default Navbar