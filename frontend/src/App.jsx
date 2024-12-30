import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/user/Login";
import Signup from "./features/user/Signup";
import Auth from "./features/auth/Auth";
import AppLayout from "./features/pages/AppLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Auth isPrivate={true}>
                <AppLayout />
              </Auth>
            }
          />
          <Route
            path="/login"
            element={
              <Auth isPrivate={false}>
                <Login />
              </Auth>
            }
          />
          <Route
            path="/signup"
            element={
              <Auth isPrivate={false}>
                <Signup />
              </Auth>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
