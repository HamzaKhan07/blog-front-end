import React, { useState } from 'react';
import './home.css';
import Navbar from '../../components/navbar/Navbar';
import Tile from '../../components/tile/Tile';
import {format } from 'date-fns';
import searchImage from '../../assets/question.png';

import { useEffect } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState('');
 
  useEffect(()=>{
    getUserName();
    fetch(`https://gray-frightened-moth.cyclic.app/getPosts/${category}`).then(response => {
      response.json().then(posts => {
        setPosts(posts);
        console.log(posts);
      });
    });

  }, [category]);

  function getUserName(){
    fetch('https://gray-frightened-moth.cyclic.app/getUserName', {
        credentials: 'include',
    }, []).then(response => {
        response.json().then(data => {
            setUserName(data.username);
            console.log("username: "+data.username);
        })
    });
}

  function search(ev){
    ev.preventDefault();

    //set category
    if(searchQuery === ''){
      alert("Please fill the Search box!");
    }
    console.log(searchQuery);

    setCategory(searchQuery);
  }

  function activeTab(ev){
    //select current tab
    const tabs=document.querySelectorAll('.tab');

    for(let i=0; i<tabs.length; i++){
      tabs[i].style.background="transparent";
      tabs[i].style.color="#111";
    }

    ev.target.style.background = 'linear-gradient(90deg, rgba(128, 204, 255, 1) 0%, rgba(255, 164, 255, 1) 100%)';
    ev.target.style.color = '#fff';

    //load category
    const selectedCategory = (ev.target.innerHTML);
    setCategory(selectedCategory);
  }


  return (
    <div className="home">
        <Navbar/>
        <h1 className="heading"> 
            {userName===undefined || userName==='' ? `Hello 👋` : `Hello, ${userName} 👋`}
        </h1> 
        <form className="searchbar" onSubmit={search}>
          <input type="String" placeholder="Search" value={searchQuery} onChange={ev => setSearchQuery(ev.target.value)}/>
          <button className="btn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          </button>
        </form>
        <div className="categories">
          <div className="tab" onClick={activeTab}>All</div>
          <div className="tab" onClick={activeTab}>Tech</div>
          <div className="tab" onClick={activeTab}>Lifestyle</div>
          <div className="tab" onClick={activeTab}>Finance</div>
          <div className="tab" onClick={activeTab}>Education</div>
            
        </div>

        {/* when no posts */}
        {
            posts.length===0 && (
              <div className="empty">
                <img src={searchImage} alt="No posts"/>
                <p>Posts are empty.</p>
              </div>
            )
          }

        <div className="grid">
          {posts.length > 0 && posts.map(post => {
            return <Tile 
            key={post._id}
              id={post._id}
              category={posts.category}
              image={post.cover} 
              by={post.author.username+" • "+format(new Date(post.createdAt), 'MMM d, yyyy')} 
              title={post.title} 
              desc={post.summary}  
              content={post.content}/>
          })}
        </div>
    </div>
  )
}

export default Home