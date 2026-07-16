import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./OwnerBookings.css";

function OwnerBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const properties =
        await API.get("/properties/my-properties");

      let allBookings = [];

      for (const property of properties.data) {

        const res =
          await API.get(
            `/bookings/property/${property.id}`
          );

        allBookings = [
          ...allBookings,
          ...res.data
        ];

      }

      setBookings(allBookings);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div>

      <Navbar />

      <div className="owner-bookings-container">

        <div className="table-header">

          <h2>

            Property Bookings

          </h2>

          <span>

            {bookings.length} Bookings

          </span>

        </div>

        {bookings.length === 0 && (

          <div className="empty-bookings">

            No bookings found

          </div>

        )}

        {bookings.length > 0 && (

          <div className="booking-table-wrapper">

            <table className="booking-table">

              <thead>

                <tr>

                  <th>Booking</th>

                  <th>Guest</th>

                  <th>Property</th>

                  <th>Room</th>

                  <th>Check In</th>

                  <th>Check Out</th>

                  <th>Status</th>

                  <th>Payment</th>

                  <th>Amount</th>

                </tr>

              </thead>

              <tbody>

                {bookings.map((booking) => (

                  <tr
                    key={booking.bookingId}
                  >

                    <td>

                      #{booking.bookingId}

                    </td>

                    <td>

                      {booking.userEmail}

                    </td>

                    <td>

                      {booking.propertyName}

                    </td>

                    <td>

                      {booking.roomNumber}

                    </td>

                    <td>

                      {booking.checkInDate}

                    </td>

                    <td>

                      {booking.checkOutDate}

                    </td>

                    <td>

                      <span
                        className={`status status-${booking.status.toLowerCase()}`}
                      >

                        {booking.status}

                      </span>

                    </td>

                    <td>

                      <span
                        className={`payment payment-${booking.paymentStatus.toLowerCase()}`}
                      >

                        {booking.paymentStatus}

                      </span>

                    </td>

                    <td>

                      ₹{booking.amount}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

}

export default OwnerBookings;