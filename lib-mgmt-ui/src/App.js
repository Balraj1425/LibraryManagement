import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/Register";
import ARegister from "./components/admin/staffLogin/ARegister";
import Navbar from "./components/navbar/Navbar";
import Admin from "./components/admin/Admin";
import User from "./components/user/User";
import AuthContext from "./Context/auth-context";
import { useState } from "react";
import Logout from "./components/Logout/Logout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const loginHandler = (data) => {
    console.log(data);
    setIsLoggedIn(data.isLoggedIn);
    setUserData(data.userDetails);
  };
  return (
    // <User></User>
    // <Admin></Admin>
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        loggedInUserData: userData,
      }}
    >
      <Router>
        <div className="App">
          <Navbar />

          <Routes>
            <Route exact path="/" element={<Login onLogin={loginHandler} />} />
            <Route
              exact
              path="/userDashboard"
              element={<User userData={userData} />}
            />
            <Route
              exact
              path="/adminDashboard"
              element={<Admin userData={userData} />}
            />
            <Route path="/sign-in" element={<Login onLogin={loginHandler} />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/staff-sign-up" element={<ARegister />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
