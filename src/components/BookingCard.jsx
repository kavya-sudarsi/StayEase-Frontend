import "./BookingCard.css";

function BookingCard({ booking, cancelBooking }) {

  return (

    <div className="booking-card">

      <div className="booking-left">

        <img
          src={
            booking.imageUrl ||
            "https://images.unsplash.com/photo-1566073771259-6a8506099945"
          }
          alt={booking.propertyName}
          className="booking-image"
        />

      </div>

      <div className="booking-center">

        <h3 className="booking-title">

          {booking.propertyName}

        </h3>

        <p className="booking-location">

          📍 {booking.city}, {booking.state}

        </p>

        <div className="booking-info-row">

          <span>

            🚪 Room {booking.roomNumber}

          </span>

          <span>

            🛏 {booking.roomType}

          </span>

        </div>

        <div className="booking-info-row">

          <span>

            📅 {booking.checkInDate}

          </span>

          <span>

            ➜

          </span>

          <span>

            {booking.checkOutDate}

          </span>

        </div>

      </div>

      <div className="booking-right">

        <div className="booking-price">

          ₹{booking.amount}

        </div>

        <div className="booking-status">

          <span
            className={`status-badge status-${booking.status?.toLowerCase()}`}
          >
            {booking.status}
          </span>

        </div>

        <div className="payment-status">

          💳 {booking.paymentStatus}

        </div>

        {booking.status === "CONFIRMED" && (

          <button
            className="cancel-booking-btn"
            onClick={() => cancelBooking(booking.id)}
          >

            Cancel Booking

          </button>

        )}

      </div>

    </div>

  );

}

export default BookingCard;