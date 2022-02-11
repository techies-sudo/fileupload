import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResetPasswordForm from "./Pages/ForgotPassword/ForgotPassword";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Landing from "./Pages/Landing/Landing";
import Upload from "./Pages/Upload/Upload";
import  NavLayout  from "./components/NavRoute/NavRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route  path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ResetPasswordForm />} />
          <Route path="/" element={<NavLayout/>}>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<Upload />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
