import React, { useState } from 'react';
import './CreatePost.css';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

    const [Title, setTitle] = useState('')
    const [PostText, setPostText] = useState('')

    let navigate = useNavigate();
    const postsCollectionRef = collection(db, 'posts');
    const createPost = async () => {
        await addDoc(postsCollectionRef, { title: Title, postText: PostText, author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }, date: serverTimestamp() });
        navigate("/")
    };

    return (
        <div className="create_container">
            <div className="create_content">
                <div className="create_header">
                    <h1>Share your thoughts</h1>
                </div>
                <div className="create_inputs">
                    <div className="individual_input">
                        <label>Title</label>
                        <input type="text" placeholder="Title..." onChange={(e) => { setTitle(e.target.value) }} />
                    </div>
                    <div className="individual_input">
                        <label>Post</label>
                        <textarea placeholder="Post..." cols="30" rows="10" onChange={(e) => { setPostText(e.target.value) }}></textarea>
                    </div>
                    <div className="submit_button">
                        <button onClick={createPost}>Submit Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost