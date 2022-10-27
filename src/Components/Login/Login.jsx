import React from 'react';
import './Login.css';
import { auth, provider } from '../../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuth }) => {

    let navigate = useNavigate()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/")
        })
    }

    return (
        <div className="login_container">
            <div className="login_content">
                <div className="login_header">
                    <h1>Sign in with Google to continue</h1>
                </div>
                <div className="google_login">
                    <button className="login" onClick={signInWithGoogle}>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login