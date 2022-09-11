import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/Register";
import ARegister from "./components/admin/staffLogin/ARegister";
import Navbar from "./components/navbar/Navbar";
import Admin from "./components/admin/Admin";
import User from "./components/user/User";

function App() {
  return (
    // <User></User>
    // <Admin></Admin>
    <Router>
      <div className="App">
        <Navbar />
        <div className="auth-wrapper">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/userDashboard" element={<User />} />
            <Route exact path="/adminDashboard" element={<Admin />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/staff-sign-up" element={<ARegister />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
