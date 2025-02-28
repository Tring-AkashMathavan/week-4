
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../redux/authSlice";
// import { useNavigate } from "react-router-dom";
// import imageCompression from "browser-image-compression";
// import "../Pages/persona.css";

// const PersonaApp = () => {
//   const dispatch = useDispatch();
// const navigate = useNavigate();
// const currentUser = useSelector((state) => state.auth.user) || {};
// const selectedPersona = useSelector((state) => state.auth.selectedPersona);  // Ensure currentUser is an object

//   const DEFAULT_IMAGE =
//     "https://tse3.mm.bing.net/th?id=OIP.OJwU7prMWNiG4ZNpqAzvkAHaE8&pid=Api&P=0&h=180";

//     const [persona, setPersona] = useState(
//       selectedPersona || {
//         id: "",
//         name: "",
//         quote: "",
//         description: "",
//         motivations: "",
//         painPoints: "",
//         jobsNeeds: "",
//         activities: "",
//         image: "",
//       }
//     );

//   // const isEditing = !!location.state?.persona;

 
// const isEditing = !!selectedPersona;

//   useEffect(() => {
//     if (selectedPersona) {
//       setPersona(selectedPersona);
//     }
//   }, [selectedPersona]);

//   const handleChange = (e) => {
//     setPersona({ ...persona, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
//     if (!validImageTypes.includes(file.type)) {
//       alert("Only image files (JPG, PNG, GIF, WEBP) are allowed!");
//       return;
//     }

//     const options = {
//       maxSizeMB: 0.1,
//       maxWidthOrHeight: 500,
//       useWebWorker: true,
//     };

//     try {
//       const compressedFile = await imageCompression(file, options);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPersona({ ...persona, image: reader.result });
//       };
//       reader.readAsDataURL(compressedFile);
//     } catch (error) {
//       console.error("Image compression error:", error);
//     }
//   };

//   const handleSave = () => {
//     if (!currentUser) {
//       alert("No user logged in!");
//       return;
//     }

//     const personaId = persona.id || `persona_${Date.now()}`;
//     let users = JSON.parse(localStorage.getItem("users")) || [];
  
//     let updatedUsers = users.map((user) => {
//       if (user.email === currentUser.email) {
//         let updatedPersonas = Array.isArray(user.personas)
//           ? isEditing
//             ? user.personas.map((p) => (p.id === persona.id ? persona : p))
//             : [...user.personas, { ...persona, id: personaId }]
//           : [{ ...persona, id: personaId }];

//         return { ...user, personas: updatedPersonas };
//       }
//       return user;
//     });

//     localStorage.setItem("users", JSON.stringify(updatedUsers));

//     let updatedCurrentUser = {
//       ...currentUser,
//       personas: Array.isArray(currentUser.personas)
//         ? isEditing
//           ? currentUser.personas.map((p) => (p.id === persona.id ? persona : p))
//           : [...currentUser.personas, { ...persona, id: personaId }]
//         : [{ ...persona, id: personaId }],
//     };

//     localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

//     dispatch(login(updatedCurrentUser));
//     navigate("/dashboard");
//   };

//   const handleDelete = () => {
//     let updatedUsers = JSON.parse(localStorage.getItem("users")).map((user) => {
//       if (user.email === currentUser.email) {
//         return {
//           ...user,
//           personas: Array.isArray(user.personas) ? user.personas.filter((p) => p.id !== persona.id) : [],
//         };
//       }
//       return user;
//     });

//     localStorage.setItem("users", JSON.stringify(updatedUsers));

//     let updatedCurrentUser = {
//       ...currentUser,
//       personas: Array.isArray(currentUser.personas) ? currentUser.personas.filter((p) => p.id !== persona.id) : [],
//     };

//     localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

//     dispatch(login(updatedCurrentUser));
//     navigate("/dashboard");
//   };

//   const handleClose = () => {
//     navigate("/dashboard");
//   };


//   return (
//     <div className="persona-container">
     
    
//       <div 
//         className="persona-header" 
//         style={{
//           backgroundImage: `url(${persona.image || DEFAULT_IMAGE})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//        <div className="d-flex  w-100 justify-content-between">
//         <h2>{isEditing ? "Edit Persona" : "New Persona"}</h2>
//         <label className="upload-btn">
//           Add Image
//           <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
//         </label>
//         </div>
//       </div>

      
//       <div className="persona-form px-4">
//         <div className="input-group">
//           <label>Notable Quote</label>
          
//           <input type="text" name="quote" placeholder="Enter a quote that identifies the persona" value={persona.quote} onChange={handleChange} />
//         </div>
        
//         <div className="input-group">
//           <label>Description</label>
//           <input type="text" name="description" placeholder="Enter a general description/bio about the persona" value={persona.description} onChange={handleChange} />
//         </div>

//         <div className="input-group">
//           <label>Attitudes / Motivations</label>
//           <input type="text" name="motivations" placeholder="What mindset does the persona have?" value={persona.motivations} onChange={handleChange} />
//         </div>

//         <div className="input-group">
//           <label>Pain Points</label>
//           <input type="text" name="painPoints" placeholder="Biggest challenges the persona faces?" value={persona.painPoints} onChange={handleChange} />
//         </div>

//         <div className="input-group">
//           <label>Jobs / Needs</label>
//           <input type="text" name="jobsNeeds" placeholder="Functional, social & emotional needs?" value={persona.jobsNeeds} onChange={handleChange} />
//         </div>

//         <div className="input-group">
//           <label>Activities</label>
//           <input type="text" name="activities" placeholder="What does the persona do in free time?" value={persona.activities} onChange={handleChange} />
//         </div>
//       </div>

      
//       <div className="persona-buttons justify-content-between  align-items-center ">
//         <div>
//           <button className="close-button" onClick={handleClose}>ClOSE</button>
//         </div>
//         <div className="persona-buttons gap-3">
//         {isEditing && <button className="delete-button" onClick={handleDelete}>DELETE</button>}
//         <button className="update-button" onClick={handleSave}>{isEditing ? "UPDATE" : "SAVE"} PERSONA</button>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default PersonaApp;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdatePersona, deletePersona, setSelectedPersona } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import "../Pages/persona.css";

const PersonaApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  const selectedPersona = useSelector((state) => state.auth.selectedPersona);

  const DEFAULT_IMAGE = "https://tse3.mm.bing.net/th?id=OIP.OJwU7prMWNiG4ZNpqAzvkAHaE8&pid=Api&P=0&h=180";

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  const [tempImage, setTempImage] = useState(selectedPersona?.image ||DEFAULT_IMAGE);

  const [persona, setPersona] = useState(
    selectedPersona || {
      id: "",
      name: "",
      quote: "",
      description: "",
      motivations: "",
      painPoints: "",
      jobsNeeds: "",
      activities: "",
      image: "",
    }
  );

  const isEditing = !!selectedPersona;

  useEffect(() => {
    if (selectedPersona) {
      setPersona(selectedPersona);
      setTempImage(selectedPersona.image || "");
    }
  }, [selectedPersona]);

  const handleChange = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const options = { maxSizeMB: 0.1, maxWidthOrHeight: 500, useWebWorker: true };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Image compression error:", error);
    }
  };

  const handleImageDelete = () => {
    setTempImage("");
  };

  const handleImageSave = () => {
    setPersona((prev) => ({ ...prev, image: tempImage }));
    setIsImageModalOpen(false);
  };

  const handleZoom = (zoomLevel) => {
    document.querySelector(".preview-img").style.transform = `scale(${zoomLevel})`;
  };

  const handleSave = () => {
    if (!currentUser) {
      alert("No user logged in!");
      return;
    }

    const personaId = persona.id || `persona_${Date.now()}`;
    dispatch(addOrUpdatePersona({ ...persona, id: personaId }));
    dispatch(setSelectedPersona(null)); // Clear selected persona after save
    navigate("/dashboard");
  };

  const handleDelete = () => {
    if (persona.id) {
      dispatch(deletePersona(persona.id));
    }
    dispatch(setSelectedPersona(null)); // Clear selected persona
    navigate("/dashboard");
  };

  const handleClose = () => {
    dispatch(setSelectedPersona(null)); // Clear selected persona when closing
    navigate("/dashboard");
  };

  return (
    <div className="persona-container">
      <div
        className="persona-header"
        style={{
          backgroundImage: `url(${persona.image || DEFAULT_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="d-flex w-100 justify-content-between">
          <h2>{isEditing ? "" : ""}</h2>
          <div className="image-container" onClick={() => setIsImageModalOpen(true)}>
  {/* <img src={persona.image || DEFAULT_IMAGE} alt="Persona" className="persona-image" /> */}
  <button className="edit-image-btn">Edit Image</button>
</div>
        </div>
      </div>

      <div className="persona-form px-4">
        <div className="input-group">
          <label>Notable Quote</label>
          <input type="text" name="quote" placeholder="Enter a quote" value={persona.quote} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Description</label>
          <input type="text" name="description" placeholder="Enter description" value={persona.description} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Motivations</label>
          <input type="text" name="motivations" placeholder="Enter motivations" value={persona.motivations} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Pain Points</label>
          <input type="text" name="painPoints" placeholder="Enter pain points" value={persona.painPoints} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Jobs / Needs</label>
          <input type="text" name="jobsNeeds" placeholder="Enter jobs/needs" value={persona.jobsNeeds} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Activities</label>
          <input type="text" name="activities" placeholder="Enter activities" value={persona.activities} onChange={handleChange} />
        </div>
      </div>

      <div className="persona-buttons justify-content-between align-items-center">
        <button className="close-button" onClick={handleClose}>CLOSE</button>
        <div className="persona-buttons gap-3">
          {isEditing && <button className="delete-button" onClick={handleDelete}>DELETE</button>}
          <button className="update-button" onClick={handleSave}>{isEditing ? "UPDATE" : "SAVE"} PERSONA</button>
        </div>
      </div>
      {isImageModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>Update Image</h3>
      <div className="image-preview">
        {tempImage ? (
          <img src={tempImage} alt="Selected" className="preview-img" />
        ) : (
          <p>No image selected</p>
        )}
      </div>

      {/* Change Image */}
      <label className="upload-btn">
        Change Image
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e)}
          style={{ display: "none" }}
        />
      </label>

      {/* Buttons */}
      <div className="modal-buttons">
        <button className="delete-btn" onClick={handleImageDelete}>Delete</button>
        <button className="cancel-btn" onClick={() => setIsImageModalOpen(false)}>Cancel</button>
        <button className="save-btn" onClick={handleImageSave}>Save</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default PersonaApp;
