import React, { useEffect } from 'react';
import './editpost.css';
import Navbar from '../../components/navbar/Navbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import {Navigate, useParams} from 'react-router-dom';

import storage from '../../firebase/firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

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

  
 
  const EditPost = () => {
    const {id} = useParams(); 
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [selectedOption, setSelectedOption] = useState('All');
    const [redirect, setRedirect] = useState(false);
    const [files, setFiles] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(()=>{ 
        
        fetch('https://blog-server-two-alpha.vercel.app/posts/'+id).then(response => {
            response.json().then(postData => {
                setTitle(postData.title);
                setSummary(postData.summary);
                setSelectedOption(postData.category);
                setContent(postData.content);
            })
        });

    }, []);

    async function updatePost(e){
        e.preventDefault();
    
        setLoading(true);

        let url='';
        if(files?.[0]){
            url = await uploadImage(files?.[0]);
        }

        const data = {
          'userId': reactLocalStorage.get('id'),
          'id': id,
          'title': title,
          'summary': summary,
          'content': content,
          'category': selectedOption,
          'imageUrl': url
        };

        setLoading(false);

        const response = await fetch('https://blog-server-two-alpha.vercel.app/post', {
            method: 'PUT',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        });

        //check res
        if(response.ok){
            setRedirect(true);
        }
      }

      async function uploadImage(file){
        const date = Date.now();
  
        const imageRef = ref(storage, date.toString());
  
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
  
        return url;
      }

    if(redirect===true){
      //navigate to home page
      return <Navigate to="/"/>
    }

  return (
 
    <div className="editpost">
        <Navbar/>
        <form className="create" onSubmit={updatePost}>
        <h1 className="heading">Edit Post</h1>

            <p className="label">Title</p>
            <input type="title" 
                placeholder="Title" 
                value={title} 
                onChange={ev=> {setTitle(ev.target.value)}}/>

            <p className="label">Summary</p>
            <input type="summary" 
                placeholder="Summary" 
                value={summary} 
                onChange={ev=> {setSummary(ev.target.value)}}/>

            <p className="label">Category</p>
            <select className="category" value={selectedOption} onChange={(ev) => {setSelectedOption(ev.target.value)}}>
              <option value="All">All</option>
              <option value="Tech">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
            </select>

            <p className="label">Post Cover</p>
            <input type="file" onChange={ev=> {setFiles(ev.target.files)}}/>

            <p className="label">Content</p>
            <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={newValue=> {setContent(newValue)}}
                modules={modules} 
                formats={formats} 
            />

            <button className="btn">
            {isLoading && (
                <span class="loader_edit"></span>
              )}
              {!isLoading && (
                <p>Update</p>
              )}
            </button>
        </form>
    </div>
  )
}

export default EditPost