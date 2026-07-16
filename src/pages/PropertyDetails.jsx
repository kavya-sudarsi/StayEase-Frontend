import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./PropertyDetails.css";

function PropertyDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [property, setProperty] = useState(null);

  const [checkInDate, setCheckInDate] = useState("");

  const [checkOutDate, setCheckOutDate] = useState("");

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {

    try {

      const res = await API.get(`/properties/${id}`);

      setProperty(res.data);

    } catch {

      alert("Property not found");

      navigate("/user");

    }

  };

  const createBooking = async (roomId) => {

    if (!checkInDate || !checkOutDate) {

      alert("Please select check-in and check-out dates");

      return;

    }

    try {

      const bookingRes = await API.post("/bookings", {

        propertyId: property.id,

        roomId,

        checkInDate,

        checkOutDate

      });

      const booking = bookingRes.data;

      const orderRes = await API.post(

        "/payments/create-order",

        {

          bookingId: booking.id

        }

      );

      const order = orderRes.data;

      const options = {

        key: order.razorpayKey,

        amount: order.amount * 100,

        currency: order.currency,

        name: "StayEase",

        description: "Room Booking",

        order_id: order.orderId,

        handler: async function (response) {

          try {

            await API.post(

              "/payments/verify",

              {

                bookingId: booking.id,

                razorpayOrderId:
                  response.razorpay_order_id,

                razorpayPaymentId:
                  response.razorpay_payment_id,

                razorpaySignature:
                  response.razorpay_signature

              }

            );

            alert("Payment Successful!");

            fetchProperty();

          } catch (err) {

            alert(

              err.response?.data?.message ||

              "Payment verification failed"

            );

          }

        },

        theme: {

          color: "#7e22ce"

        }

      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (err) {

      alert(

        err.response?.data?.message ||

        "Booking failed"

      );

    }

  };

  if (!property) {

    return <div>Loading...</div>;

  }

  const imageUrl =
    property.imageUrl
      ? property.imageUrl.startsWith("http")
        ? property.imageUrl
        : `http://localhost:8082${property.imageUrl}`
      : "https://images.unsplash.com/photo-1566073771259-6a8506099945";

  const lowestPrice =
    property.rooms?.length > 0
      ? Math.min(...property.rooms.map(r => r.pricePerBed))
      : 0;

  return (

    <>

      <Navbar />

      <div className="details-container">

        {/* HERO SECTION */}

        <div className="property-hero">

          {/* LEFT IMAGE */}

          <div className="hero-image">

            <img

              src={imageUrl}

              alt={property.name}

            />

          </div>

          {/* RIGHT DETAILS */}

          <div className="hero-info">

            <h1>{property.name}</h1>

            <p className="hero-address">

              📍 {property.address}, {property.city}, {property.state}

            </p>

            <div className="hero-tags">

              <span>{property.propertyType}</span>

              <span>{property.gender}</span>

              <span>{property.status}</span>

            </div>

            <div className="price-card">

              <h2>Starting From</h2>

              <h1>₹{lowestPrice}</h1>

              <p>/ Month</p>

            </div>

            <div className="owner-card">

              <h3>Owner Contact</h3>

              <p>📞 {property.contactNumber}</p>

            </div>

            {/* AMENITIES (moved here, in place of Check In / Check Out) */}

            <div className="booking-box">

              <h3>Amenities</h3>

              <div className="amenity-list">

                {property.amenities?.map((item, index) => (

                  <span
                    key={index}
                    className="amenity-chip"
                  >
                    {item}
                  </span>

                ))}

              </div>

              {/* <button
                className="hero-book-btn"
                onClick={() => {
                  if (!property.rooms?.length) {
                    alert("No rooms available");
                    return;
                  }

                  const room =
                    property.rooms.find(r => r.availableBeds > 0);

                  if (!room) {
                    alert("No rooms available");
                    return;
                  }

                  createBooking(room.id);
                }}
              >
               Book Now
              </button> */}

            </div>

          </div>

        </div>

        {/* ABOUT */}

        <div className="details-card">

          <h2>About Property</h2>

          <p>{property.description}</p>

        </div>

        {/* CHECK IN / CHECK OUT (moved here, in place of Amenities) */}

        <div className="details-card">

          <h2>Check In / Check Out</h2>

          <div className="checkin-checkout-row">

            <div className="checkin-field">

              <label>Check In</label>

              <input

                type="date"

                value={checkInDate}

                min={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }

                onChange={(e) =>
                  setCheckInDate(e.target.value)
                }

              />

            </div>

            <div className="checkin-field">

              <label>Check Out</label>

              <input

                type="date"

                value={checkOutDate}

                min={
                  checkInDate ||
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }

                onChange={(e) =>
                  setCheckOutDate(e.target.value)
                }

              />

            </div>

          </div>

        </div>

        {/* ROOMS */}

        <div className="details-card">

          <h2>Available Rooms</h2>

          {property.rooms.map(room=>(

            <div
              className="room-card"
              key={room.id}
            >

              <div>

                <h3>

                  Room {room.roomNumber}

                </h3>

                <p>

                  👥 {room.roomType}

                </p>

                <p>

                  🛏 Available Beds :
                  {" "}
                  {room.availableBeds}

                </p>

              </div>

              <div className="room-right">

                <div className="room-price">

                  ₹{room.pricePerBed}

                  <span>/month</span>

                </div>

                <button

                  className="book-btn"

                  disabled={
                    room.availableBeds===0
                  }

                  onClick={()=>
                    createBooking(room.id)
                  }

                >

                  {

                    room.availableBeds===0

                      ? "Sold Out"

                      : "Book Now"

                  }

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </>

  );

}

export default PropertyDetails;