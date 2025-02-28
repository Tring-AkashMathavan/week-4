import React,{useEffect} from "react";
import './FirstPage.css'
import { useNavigate } from "react-router-dom";


const FirstPage = (() => {
    const navigate = useNavigate();


    useEffect(() => {
        localStorage.removeItem("currentUser");
      }, []);
    
    return (
        <>
            <div className="firstpage-head">
                    <h3>tringapps</h3>
                <div className="buttons-firstpage">
                    <span>
                        <button onClick={() => {
                  navigate("/register");
                }}>Register</button></span>
                    <span><button onClick={() => {
                  navigate("/login");
                }}>Login</button></span>
                </div>
            </div>

            <div className="firstpage-main">
                <h2 style={{textAlign : "center" , marginTop : "20px"}}>Welcome to Persona App</h2>
                <br />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum ut debitis nemo quod eaque laborum fuga distinctio totam consectetur culpa!z</p>
            </div>
        </>
    )
});

export default FirstPage;