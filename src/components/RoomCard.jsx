import "./RoomCard.css";

function RoomCard({
  room,
  onDelete,
  onBook,
  showDelete,
  showBook
}) {

  return (
    <div className="room-card">

      <p>
        <strong>Room Number:</strong> {room.roomNumber}
      </p>

      <p>
        <strong>Type:</strong> {room.roomType || "—"}
      </p>

      <p>
        <strong>Beds Available:</strong>{" "}
        {room.availableBeds}/{room.totalBeds}
      </p>

      <p>
        <strong>Price Per Bed:</strong> ₹{room.pricePerBed}
      </p>

      <p>
        <strong>WiFi:</strong> {room.wifi ? "✅" : "❌"}
      </p>

      <p>
        <strong>AC:</strong> {room.ac ? "✅" : "❌"}
      </p>

      {showDelete && (
        <button
          className="delete-room-btn"
          onClick={() => onDelete(room.id)}
        >
          Delete Room
        </button>
      )}

      {showBook && (
        <button
          className="book-room-btn"
          disabled={room.availableBeds <= 0}
          onClick={() => onBook(room.id)}
        >
          {room.availableBeds <= 0 ? "Fully Booked" : "Book Room"}
        </button>
      )}

    </div>
  );
}

export default RoomCard;