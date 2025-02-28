import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Components/redux/store";
import PrivateRoute from "./Components/PrivateRoute";
import Register from "./Components/Register/Register.jsx";
import Login from "./Components/Login/Login.jsx";
import PersonaApp from "./Components/Pages/PersonaApp.jsx";
import Dashboard from "./Components/Pages/Dashboard.jsx";
import FirstPage from "./Components/Pages/FirstPage.jsx";

const App = () => {
    
 

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
          
        <Routes>
           
          <Route path="/" element={<FirstPage/>}   />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/persona" element={<PrivateRoute element={<PersonaApp />} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
   </>
  );
};

export default App;

