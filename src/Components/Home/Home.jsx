import React, { useState, useEffect } from 'react';
import './Home.css';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase-config';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';
import moment from 'moment';

const Home = ({ isAuth }) => {
    const [PostId, setPostId] = useState('')
    const [PostsList, setPostsList] = useState([])
    const [Edited, setEdited] = useState(false)
    const [EditedTitle, setEditedTitle] = useState('')
    const [EditedText, setEditedText] = useState('')

    const EditPost = async () => {
        const EditDocRef = doc(db, 'posts', PostId);
        await updateDoc(EditDocRef, {
            title: EditedTitle,
            postText: EditedText,
        })
        setEdited(false);
        setPostId('');
        window.location.reload()
    }

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc)
        window.location.reload()
    }

    useEffect(() => {
        const postsCollectionRef = collection(db, 'posts');
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef)
            setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getPosts()
    }, [])

    return (
        <div className="home_container">
            {Edited ?
                <div className="edit_content">
                    <div className="edit_header">
                        <h1>Edit Post</h1>
                    </div>
                    <div className="edit_inputs">
                        <div className="individual_input">
                            <label>Title</label>
                            <input type="text" placeholder="Title..." onChange={(e) => { setEditedTitle(e.target.value) }} />
                        </div>
                        <div className="individual_input">
                            <label>Post</label>
                            <textarea placeholder="Post..." cols="30" rows="10" onChange={(e) => { setEditedText(e.target.value) }}></textarea>
                        </div>
                        <div className="submit_button">
                            <button onClick={EditPost}>Edit Submitted Post</button>
                        </div>
                    </div>
                </div>
                :
                <div className="home_content">
                    {PostsList.map((post) => {
                        return (
                            <div className="post_container">
                                <div className="post_header">
                                    <div className="post_title">
                                        <h1>{post.title}</h1>
                                    </div>
                                    {isAuth && post.author.id === auth.currentUser.uid && (
                                        <>
                                            <div className="post_edit">
                                                <FiEdit3 onClick={() => {
                                                    setEdited(true)
                                                    setPostId(post.id)
                                                }} />
                                            </div>
                                            <div className="post_delete">
                                                <FiTrash2 onClick={() => {
                                                    deletePost(post.id)
                                                }} />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="post_text">
                                    <h1>{post.postText}</h1>
                                </div>
                                <div className="post_footer">
                                    <div className="post_author">
                                        <h2>@ {post.author.name}</h2>
                                    </div>
                                    <div className="post_date">
                                        <h3>{moment(post.date.toDate().toString()).calendar()}</h3>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            }
        </div >
    )
}

export default Home