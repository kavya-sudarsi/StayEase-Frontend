import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OwnerDashboard from "./pages/OwnerDashboard";
import UserDashboard from "./pages/UserDashboard";
import BookingHistory from "./pages/BookingHistory";
import OwnerBookings from "./pages/OwnerBookings";
import PropertyDetails from "./pages/PropertyDetails";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/owner"
          element={<OwnerDashboard />}
        />

        <Route
          path="/user"
          element={<UserDashboard />}
        />

        <Route
          path="/bookings"
          element={<BookingHistory />}
        />

        <Route
          path="/owner-bookings"
          element={<OwnerBookings />}
        />

        <Route
          path="/property/:id"
          element={<PropertyDetails />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;