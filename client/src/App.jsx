import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Loader from "./components/loaderanimation.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Profile from "./pages/Profile/index.jsx";
import Admin from "./pages/Admin/index.jsx";
import SingleMovie from "./pages/singleMovie.jsx";
import BookShow from "./pages/BookShow.jsx";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Stripe public key
const stripePromise = loadStripe(
  "pk_test_51RdatZPsdpG7HzglqoaOobHtioB0jMfXLm6wtCIR0Sdrn3HnBXcf1omOEU1BNJbSrFWbsdxaVkQhLsPOazexG9UL00MoPcr79N"
);

function App() {
  const { loading } = useSelector((state) => state.loader);

  return (
    <>
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
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <SingleMovie />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-show/:id"
            element={
              <ProtectedRoute>
                <Elements stripe={stripePromise}>
                  <BookShow />
                </Elements>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
