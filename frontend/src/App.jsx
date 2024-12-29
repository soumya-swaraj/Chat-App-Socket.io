import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/user/Login";
import Signup from "./features/user/Signup";
import HomePage from "./features/messages/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
