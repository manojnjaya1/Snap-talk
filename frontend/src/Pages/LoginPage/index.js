import React, { useEffect, useState } from 'react'
import "./index.css";
import { Link, useNavigate } from 'react-router-dom';
// import { MessageFilled } from "@ant-design/icons";
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import PopUpMessage from '../../Sections/Components/Toast';
// import { ChatState } from '../../Context/ChatProvider';

export default function LoginPage() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false)
    const [message, setmessage] = useState('')
    const [toastshow, settoastshow] = useState(false);
    const [color, setcolor] = useState('');
    const navigate = useNavigate();
    // const { user } = ChatState();

    useEffect(() => {
        const userInfo = localStorage.getItem("user");
        if (userInfo) {
            navigate("/chats");
        }
    }, [navigate]);

    const loginHandle = async (event) => {
        event.preventDefault();
        setloading(true);
        if (!email || !password) {
            setmessage("Enter all fields");
            setcolor('danger');
            settoastshow(true);
            setloading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };

            const { data } = await axios.post("/api/user/login", {
                email, password
            }, config);
            console.log(data);
            setmessage("Login Successful");
            settoastshow(true);
            setcolor("primary");
            localStorage.setItem("user", JSON.stringify(data));
            setloading(false);
            navigate("/chats");
        }
        catch (err) {
            if (err.request.status === 500) {
                setmessage(err.request.statusText);
            }
            else {
                setmessage(err.response.data.message);
            }
            settoastshow(true);
            setcolor("danger");
            setloading(false);
        }
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center login-body">
                <div className="login-container">
                    <h1 className="header">
                        Login - SnapTalk
                    </h1>
                    {/* <div className="logo">
                        Login -
                        <span>Snap</span>Talk
                        <span>
                            <MessageFilled className="logo-icon" />
                        </span>
                    </div> */}
                    <div className="mb-3 fields">
                        <label for="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={e => setemail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 fields">
                        <label for="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setpassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 fields d-flex justify-content-center">
                        <button onClick={loginHandle} type="submit" className="btn btn-primary w-100" disabled={loading} >
                            {
                                !loading && `Login`
                            }
                            {
                                loading &&
                                <Spinner
                                    animation="border"
                                    as="span"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    variant="light" />
                            }
                        </button>
                    </div>
                    <div className=" links-container d-flex justify-content-evenly ">
                        <span>
                            <Link to="/">
                                Forgot Password
                            </Link>
                        </span>
                        <span>
                            <Link to="/signup">
                                Create an account
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
            <PopUpMessage show={toastshow} setShow={settoastshow} message={message} color={color} />
        </>
    )
}
