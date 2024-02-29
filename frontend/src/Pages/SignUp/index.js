import React, { useEffect, useState } from 'react'
import "./index.css";
import { Link, useNavigate } from 'react-router-dom';
// import PopUpMessage from '../../Components/Toast';
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import PopUpMessage from '../../Sections/Components/Toast'
// import { ChatState } from '../../Context/ChatProvider';

export default function SignUp() {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [pic, setpic] = useState("")
    const [loading, setloading] = useState(false)
    const [message, setmessage] = useState('')
    const [toastshow, settoastshow] = useState(false);
    const [color, setcolor] = useState('');
    const navigate = useNavigate();
    // const { user } = ChatState();

    useEffect(() => {
      const userInfo = localStorage.getItem("user");
      if(userInfo) {
        navigate("/chats");
      }
    }, [navigate]);

    const postDetails = (pics) => {
        setloading(true);
        if (!pics) {
            setmessage("Please, Upload the image correctly.");
            setcolor('danger')
            settoastshow(true);
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "djykpxtae");
            fetch("https://api.cloudinary.com/v1_1/djykpxtae/upload", {
                method: 'post',
                body: data
            }).then( res => res.json())
            .then((data) => {
                setpic(data.url.toString());
                console.log(data.url.toString());
                setloading(false);
            })
        }
        else{
            setmessage('Please, Upload the image correctly.');
            setcolor('primary')
            settoastshow(true);
        }
    }

    const submitHandler=async (event)=>{
        event.preventDefault();
        setloading(true);
        if(!name || !email || !password) {
            setmessage('Please, Enter all feilds')
            setcolor('danger')
            settoastshow(true);
            setloading(false);
        }

        try{
            const config={
                headers: {
                    "Content-type": "application/json"
                }
            };

            const {data} = await axios.post("/api/user", {
                name,
                email,
                password,
                pic
            }, config);

            setmessage("Registration Successful");
            setcolor("primary")
            settoastshow(true);
            localStorage.setItem("user", JSON.stringify(data));
            setloading(false);
            navigate('/chats');
        }
        catch(err){
            if(err.request.status===500) {
                setmessage(err.request.statusText);
            }
            else{
                setmessage(err.response.data.message);
            }
            settoastshow(true);
            setcolor("danger");
            setloading(false);
        }
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center signup-body">
                <form method='post' className="signup-container">
                    <h1 className="signup-header">
                        SignUp - SnapTalk
                    </h1>
                    <div className="mb-3 fields">
                        <label for="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name='name'
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={e => setname(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 fields">
                        <label for="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name='email'
                            placeholder="Enter Email"
                            value={email}
                            onChange={e => setemail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 fields">
                        <label for="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name='password'
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setpassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 fields">
                        <label for="pic" className="form-label">Upload Your Picture</label>
                        <input
                            type="file"
                            className="form-control"
                            id="pic"
                            name='pic'
                            accept="image/*"
                            onChange={e => postDetails(e.target.files[0])}
                        />
                    </div>
                    <div className="mb-4 fields d-flex justify-content-center">
                        <button onClick={submitHandler} type="submit" className="btn btn-primary w-100" disabled={loading} >
                            {
                                !loading && `Sign Up`
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
                                Already have an account
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
            <PopUpMessage show={toastshow} setShow={settoastshow} message={message} color={color} />
        </>
    )
}
