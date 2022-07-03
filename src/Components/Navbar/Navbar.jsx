import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isAuth, setIsAuth }) => {

    let navigate = useNavigate();

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear()
            setIsAuth(false)
            navigate("/login")
        })
    }

    return (
        <div className="navbar_container">
            <div className="navbar_content">
                <div className="links">
                    <Link to="/" className="individual_link">Home</Link>
                    {isAuth
                        ?
                        <>
                            <button className="logout_button" onClick={signUserOut}>Logout</button>
                            <Link to="/createpost" className="individual_link">Create Post</Link>
                        </>
                        :
                        <Link to="/login" className="individual_link">Login</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar