import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/user/Login";
import Signup from "./features/user/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
