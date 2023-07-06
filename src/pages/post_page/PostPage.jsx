import React, { useEffect, useState } from 'react';
import './postpage.css';
import Navbar from '../../components/navbar/Navbar';
import { useParams, Navigate } from 'react-router-dom';
import { format, formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';

import {reactLocalStorage} from 'reactjs-localstorage';

const PostPage = () => {
    const params = useParams();
    const {id} = useParams();
    console.log(params);
    const [postInfo, setPostInfo] = useState(null);
    const [userId, setUserId] = useState(null);
    const [comment, setComment] = useState('');
    const [commentsData, setCommentsData] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        //set logged in userID
        setUserId(reactLocalStorage.get('id'));

        fetch(`https://blog-server-two-alpha.vercel.app/posts/${id}`)
        .then(response => {
            response.json().then(postInfo => {
                //set post data
                setPostInfo(postInfo);
                //set comments data
                setCommentsData(postInfo.comments);
            })
        })
    }, []);
 
    if(postInfo==null) return ''; 


    async function addComments(ev){
        ev.preventDefault();

        if(comment===''){
            alert("Please fill the comment!");
        }

        const response = await fetch(`https://blog-server-two-alpha.vercel.app/comments/${id}`, {
            method: 'POST',
            body: JSON.stringify({comment, userId}),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok){
            const data = await response.json();
            setCommentsData(data.comments);
            console.log(data.comments);
        }

    }

    async function deletePost(){
        const isConfirm = window.confirm('Are you sure you want to delete this Post ?');
        if(isConfirm === true){
            //delete the post
            const response = await fetch(`https://blog-server-two-alpha.vercel.app/delete/${id}`, {
                method: 'DELETE',
            });

            if(response.ok){
                //navigate to home
                setRedirect(true);
            }

        }
    }

    if(redirect){
        return <Navigate to="/"/>
    }

  return (
    <div className="postpage">
        <Navbar/> 

        <div class="content">
            <div className="heading"> 
                <p className="by">{format(new Date(postInfo.createdAt), 'MMM d, yyyy') + " • "+ postInfo.author.username}</p>
                <div className="tag">
                    {postInfo.category}
                </div>
                <h1 className="title">{postInfo.title}</h1>
                <p className="summary">{postInfo.summary}</p>

                {console.log(userId+" "+postInfo.author._id)}
                
                
            </div>
            <div className="image">
                <img src={`https://blog-server-two-alpha.vercel.app/${postInfo.cover}`} alt="postImage"/>
            </div>
            <div className="para" dangerouslySetInnerHTML={{__html: postInfo.content}}></div>


            {(userId === postInfo.author._id) && (userId!=='' && postInfo.author._id!=='') && (
                    <div className="actions">
                        <div className="edit">
                            <Link to={`/editPost/${postInfo._id}`} className="edit-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            
                                Edit
                            </Link>
                        </div>

                        <div className="delete" onClick={deletePost}>
                            <div className="delete-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                                Delete
                                </div>
                        </div>
                    </div>

                    
                )}

                <h2 className="comment-head">Comments</h2>
                
                {/* everybody can comment */}
                <form className="comments" onSubmit={addComments}>
                    <textarea rows="5" value={comment} onChange={(ev)=> setComment(ev.target.value)}></textarea>
                    <button className="btn">Add</button>
                </form>
          

            

            {commentsData.length > 0 && commentsData.map((comment) => {
                return <div className="comment">
                    <p className="username">{comment.author.username}</p>
                    <p className="time">{formatDistance(new Date(comment.createdAt), Date.now())}</p>
                    <p className="matter">{comment.content}</p>
                    <br></br>
                    <br></br>
                    <div className="line"></div>
                    <br></br>
                    <br></br>
                </div>
            })}
                
        </div>
    </div>
  )
}

export default PostPage