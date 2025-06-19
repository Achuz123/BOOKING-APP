import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Loader from "./components/loaderanimation.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";

function App() {
  // Accessing the 'loading' value from the 'loader' slice of the Redux store
  //loading now contains thae actual boolean value of loader

  const { loading } = useSelector((state) => state.loader);
  const { user } = useSelector((state) => state.user);
  //console.log(loading);
  //console.log(user);
  return (
    <>
      {/* If loading is true, show the loading message; otherwise show nothing*/}
      {loading && (
        <div>
          <Loader />
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
