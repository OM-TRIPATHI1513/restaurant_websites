import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from "react-bootstrap/Badge";
import Modal from '../Modal';
import Cart from '../screen/Cart';
import { useCart } from './ContextReducer';


function Navbar() {
    let data = useCart();
    const [cartview, setCartView] = useState(false)
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("./login")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to={"/"} style={{ "fontFamily": 'Open Sans' }}>Gofood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to={"/"}>Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to={"/myOrder"}>My Order</Link>
                                </li> : ""
                            }
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <div className='d-flex'>
                                <Link className="btn bg-white test-success mx-1" to={"/login"}>Login</Link>
                                <Link className="btn bg-white test-success mx-1" to={"/Signup"}>SignUp</Link>
                            </div>
                            :
                            <div>
                                <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>My Cart{" "}
                                    {(data.length !== 0) ? <Badge pill bg="danger">{data.length}</Badge> : null}
                                </div>
                                {cartview ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout</div>
                            </div>
                        }

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar