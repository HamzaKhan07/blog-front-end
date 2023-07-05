import React from 'react';
import { Link } from 'react-router-dom';
import './tile.css';
 
const Tile = (props) => {
  return ( 
    <div className="tile">  
      <Link to={`/post/${props.id}`}>
          <div className="image"> 
              <img src={'https://blog-server-two-alpha.vercel.app/'+props.image} alt="post"/>
          </div>
          <div className="content">
              <p className="by">{props.by}</p>
              <h2 className="title">{props.title}</h2> 
          </div>
        </Link> 
    </div>
  )
}

export default Tile