import React from 'react';
import './Navbar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAccountCircle } from 'react-icons/md';

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
                    <Link to="/" className="individual_link">Blog</Link>
                    {isAuth
                        ?
                        <>
                            <Link to="/createpost" className="individual_link">Create Post</Link>
                            <section id="logout">
                                <MdOutlineAccountCircle onClick={signUserOut} className="logout_button" />
                            </section>
                        </>
                        :
                        <section id="login">
                            <MdOutlineAccountCircle className="login_button" onClick={() => navigate('/login')} />
                        </section>
                    }
                </div>
            </div>
        </div >
    )
}

export default Navbar