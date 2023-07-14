import React from 'react';
import './post.css';
import Navbar from '../../components/navbar/Navbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import {Navigate} from 'react-router-dom'; 

import {reactLocalStorage} from 'reactjs-localstorage';
import storage from '../../firebase/firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

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
    const [isLoading, setLoading] = useState(false);

    async function createPost(ev){
        ev.preventDefault();

        //set loading
        setLoading(true);

        const url = await uploadImage();

        console.log("uploading: "+url);

        const data = {
          'userId': reactLocalStorage.get('id'),
          'title': title,
          'summary': summary,
          'content': content,
          'category': selectedOption,
          'imageUrl': url
        };

        //hide loading
        setLoading(false);

        //fetch
        const response = await fetch(
            'https://blog-server-two-alpha.vercel.app/post',
            {
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {'Content-Type' : 'application/json'},
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

    async function uploadImage(){
      const date = Date.now();

      const imageRef = ref(storage, date.toString());

      await uploadBytes(imageRef, files[0]);
      const url = await getDownloadURL(imageRef);

      return url;
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

            <button className="btn">
              {isLoading && (
                <span class="loader_create"></span>
              )}
              {!isLoading && (
                <p>Create</p>
              )}
            </button>
        </form>
    </div>
  )
}

export default Post