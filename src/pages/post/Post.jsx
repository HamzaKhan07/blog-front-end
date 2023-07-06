import React from 'react';
import './post.css';
import Navbar from '../../components/navbar/Navbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import {Navigate} from 'react-router-dom'; 

import {reactLocalStorage} from 'reactjs-localstorage';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}], 
      ['link', 'image'],
      ['clean']
    ],
  }; 

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];


const Post = () => {
  
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [selectedOption, setSelectedOption] = useState('All');
    const [redirect, setRedirect] = useState(false);
    const [files, setFiles] = useState('');

    async function createPost(ev){
        ev.preventDefault();

        const data=new FormData();
        data.set('userId', reactLocalStorage.get('id'));
        console.log("User ID: "+reactLocalStorage.get('id'));
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('category', selectedOption);
        data.set('file', files[0]);

        //fetch
        const response = await fetch(
            'http://localhost:4000/post',
            {
                method: 'POST',
                body: data,
                credentials: 'include'
            }
        );

        if(response.ok){
          setRedirect(true);
        }

    }

    if(redirect===true){
      //navigate to home page
      return <Navigate to="/"/>
    }

  return (

    <div className="post">
        <Navbar/>
        <form className="create" onSubmit={createPost}>

            <h1 className="heading">Create Post</h1>

            <p className="label">Title</p>
            <input type="title" 
                placeholder="" 
                value={title} 
                onChange={ev=> {setTitle(ev.target.value)}}/>

            <p className="label">Summary</p>
            <input type="summary"  
                placeholder="" 
                value={summary} 
                onChange={ev=> {setSummary(ev.target.value)}}/>

            <p className="label">Category</p>
             <select className="category" value={selectedOption} onChange={(ev) => {setSelectedOption(ev.target.value)}}>
              <option value="All">All</option>
              <option value="Tech">Tech</option>
              <option value="Finance">Finance</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
            </select>

            <p className="label">Post Cover</p>
            <input type="file" onChange={ev=> {setFiles(ev.target.files)}}/>

            <p className="label">Cover</p>
            <ReactQuill 
               className="editor"
                theme="snow" 
                value={content} 
                onChange={newValue=> {setContent(newValue)}}
                modules={modules} 
                formats={formats} 
            />

            <button className="btn">Create</button>
        </form>
    </div>
  )
}

export default Post