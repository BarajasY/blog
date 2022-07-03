import React, { useState, useEffect } from 'react';
import './Home.css';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase-config';
import { FiTrash2 } from 'react-icons/fi';

const Home = ({ isAuth }) => {

    const [PostsList, setPostsList] = useState([])
    const postsCollectionRef = collection(db, 'posts');

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc)
        window.location.reload()
    }

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef)
            setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getPosts()
    }, [])

    return (
        <div className="home_container">
            <div className="home_content">
                {PostsList.map((post) => {
                    return (
                        <div className="post_container">
                            <div className="post_header">
                                <div className="post_title">
                                    <h1>{post.title}</h1>
                                </div>
                                {isAuth && post.author.id === auth.currentUser.uid && (
                                    <div className="post_delete">
                                        <FiTrash2 onClick={() => {
                                            deletePost(post.id)
                                        }} />
                                    </div>
                                )}
                            </div>
                            <div className="post_text">
                                <h1>{post.postText}</h1>
                            </div>
                            <div className="post_author">
                                <h2>@ {post.author.name}</h2>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Home