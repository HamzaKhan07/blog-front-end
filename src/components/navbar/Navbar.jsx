import React from 'react';
import './navbar.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [username, setUsername] = useState(null);

  useEffect(()=>{
    
    fetch('https://gray-frightened-moth.cyclic.app/profile', {
      credentials: 'include',
    }).then((response) => {
      response.json().then((userInfo)=>{
        //set username
        setUsername(userInfo.username);
      });
    });

  }, []);

  function logout(){
    fetch('https://gray-frightened-moth.cyclic.app/logout', {
      credentials: 'include',
      method: 'POST',
    });

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