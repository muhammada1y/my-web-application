import React, { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
      const auth = localStorage.getItem('user');
      if (auth) {
        navigate('/');
      }
    }, [navigate]);
  

    const collectData = async () => {
        console.log(name, email, password);

        
            const result = await fetch('http://localhost:2006/signup', {
                method: 'POST',
                body: JSON.stringify({ name, password, email }),
                headers: {
                    'Content-Type': 'application/json',
            
                } 
           });

           const data = await result.json()
           console.warn(data);
           localStorage.setItem("user",JSON.stringify(data));
           if(result){
            navigate("/")
           }
    };

    return (
        <div className="signup">
            <h1>Signup page</h1>
            <input className="inputbox" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" />
            <input className="inputbox" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter email" />
            <input className="inputbox" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" />
            <button onClick={collectData} className="buttonSup" type="button">signup</button>
        </div>
    );
};

export default SignUp;
