import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
        navigate("/")
    }
  })

  const handleLogin = async() => {
    // Your login logic here
    console.warn("Logging in...",name,password);

const loginresult = await fetch('http://localhost:2006/login',{
    method: 'POST',
    body: JSON.stringify({name,password}),
    headers: {
        'Content-Type': 'application/json',
    }

});
const data = await loginresult.json();
console.warn(data);

if (data.name) {
    localStorage.setItem("user", JSON.stringify(data));
    navigate('/');
} else {
    alert("Please enter correct details");
}

  };
  

  return (
    <div className="signup">
      <h1>Login</h1>
      <input
        className="inputbox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter Name"
      />
      <input
        className="inputbox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter password"
      />
      <button className="buttonSup" onClick={handleLogin} type="button">
        Login
      </button>
    </div>
  );
};

export default Login;
