import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";
import BookingCard from "../components/BookingCard";

import "./BookingHistory.css";

function BookingHistory() {

  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const res =
        await API.get("/bookings/my-bookings");

      setBookings(res.data);

    } catch {

      alert("Unable to load bookings");

    }

  };

  const cancelBooking = async (id) => {

    try {

      await API.put(`/bookings/${id}/cancel`);

      alert("Booking cancelled successfully");

      fetchBookings();

    } catch {

      alert("Unable to cancel booking");

    }

  };

  return (

    <>

      <Navbar />

      <div className="booking-history-container">

        <div className="booking-history-header">

          <div>

            <h1 className="booking-history-title">
              My Bookings
            </h1>

            <p className="booking-history-subtitle">
              Track your stays, payments and upcoming bookings.
            </p>

          </div>

          <button
            className="browse-btn"
            onClick={() => navigate("/user")}
          >
            Browse Properties
          </button>

        </div>

        {bookings.length === 0 ? (

          <div className="no-bookings-card">

            <div className="empty-icon">
              🧳
            </div>

            <h2>No Bookings Yet</h2>

            <p>
              Looks like you haven't booked any property yet.
            </p>

            <button
              className="browse-btn"
              onClick={() => navigate("/user")}
            >
              Explore Properties
            </button>

          </div>

        ) : (

          <div className="booking-list">

            {bookings.map((booking) => (

              <BookingCard
                key={booking.id}
                booking={booking}
                cancelBooking={cancelBooking}
              />

            ))}

          </div>

        )}

      </div>

    </>

  );

}

export default BookingHistory;