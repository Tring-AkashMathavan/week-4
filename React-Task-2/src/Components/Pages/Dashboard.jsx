import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  
import photos from "../images";
import './dashboard.css';
import { updateUserPersona } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Navigate } from "react-router-dom";
import { setSelectedPersona } from "../redux/authSlice";

const Page = () => {
    const navigate = useNavigate(); 
    const [personas, setPersonas] = useState([]);
    const dispatch=useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        
        const storedUser = JSON.parse(localStorage.getItem("currentUser"));

        if (storedUser && storedUser.personas) {
            setPersonas(storedUser.personas);
        }
        
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
      }
  

    const handleAddPersona = () => {
        navigate("/persona");
    };

    const handleEditPersona = (persona) => {
        dispatch(setSelectedPersona(persona)); // Store selected persona in Redux
        navigate("/persona"); // Navigate without state
      };


    return (
        <>
            <section className="dashboard-app">
                <div className="dashboard">
                    <div className="dashboard-img">
                        <img src={photos.TALogo} alt="tringapps" />
                    </div>

                    <nav className="button-dashboard-nav" style={{ height: '20px' }}>
                        <span>
                            <button className="logout-button" onClick={() => dispatch(logout())}>
                                Logout
                            </button>
                        </span>
                    </nav>
                </div>

                <div className="d-flex   justify-content-center w-100 h-auto">
                    <div className="container my-4 d-flex  px-3  py-4 " style={{ backgroundColor: 'whitesmoke', width: '100%', display: 'flex',height:'auto',flexDirection:'column' }}>
                        <div className="d-flex justify-content-between align-items-center py-3 px-3" >
                            <h4 style={{ color: 'black' }}>Personas</h4>
                            <p onClick={handleAddPersona} className="text-primary fw-bold text-decoration-none" style={{ cursor: 'pointer' }}>+ Add Persona</p>
                        </div>

                        <div className="row mt-3 gy-3">
                          {personas.length > 0 ? (
                    personas.map((persona, index) => (
                        <div key={index} className="col-md-4 select-div">
                            <div className="card shadow-sm border-0" onClick={() => handleEditPersona(persona)} style={{ cursor: "pointer" }}>
                                <img src={persona.image || "https://th.bing.com/th/id/OIP.GUKishxFCm0czTfvydFr3gHaFj?w=264&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7"} className="card-img-top"  style={{maxHeight:'250px'}} alt={persona.name} />
                                <div className="card-body">
                                    {/* <h6 className="">{persona.name}</h6> */}
                                    <p className="card-title"  >{persona.quote}</p>
                                    <p className="card-text">{persona.jobsNeeds}</p>
                                    <p className="card-text">{persona.activities}</p>
                                    <small className="text-muted">Last updated just now</small>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No personas found. Click "Add Persona" to create one.</p>
                )}

                            {/* Add Persona Card */}
                            <div className="col-md-4">
                                <div className="card shadow-sm border-0 d-flex align-items-center justify-content-center"   onClick={handleAddPersona}  style={{ minHeight: "385px" }}>
                                    <div className="text-center">
                                        <button onClick={handleAddPersona} className="btn btn-outline-secondary rounded-circle">
                                            +
                                        </button>
                                        <p className="mt-2 text-muted">Add a Persona</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;

