import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResetPasswordForm from "./Pages/ForgotPassword/ForgotPassword";
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Upload from './Pages/Upload/Upload'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/forgotpassword" element={<ResetPasswordForm/>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
