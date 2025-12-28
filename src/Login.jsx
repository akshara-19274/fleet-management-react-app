import {use, useEffect,useRef,useState} from "react";
import {useNavigate} from "react-router-dom";
export default function Login({setIsAuth}){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    const emailRef=useRef(null);
    useEffect(()=>{
        emailRef.current?.focus();
    },[]);
    const handleLogin=(e)=>{
        e.preventDefault();
        const valid=email.trim("")=="admin@gmail.com" && password.trim("")=="admin123";
        if (valid){
            alert("Login Successful");
            setIsAuth(true);
            navigate("/admin");
        }else{
            alert("Wrong email or password");
        }
    };
    return(
        <div></>
    )
}