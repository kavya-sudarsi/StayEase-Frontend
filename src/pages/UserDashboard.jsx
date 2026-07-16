import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import "./Dashboard.css";

function UserDashboard() {

  const [properties, setProperties] = useState([]);

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {

  const queryCity =
    new URLSearchParams(location.search)
      .get("city");

  if (queryCity) {

    setCity(queryCity);

    searchByCity(queryCity);

  } else {

    fetchProperties();

  }

}, [location.search]);

  const fetchProperties = async () => {

    const res =
      await API.get("/properties");

    setProperties(res.data);
  };

const searchByCity = async (
  searchCity = city
) => {

  if (!searchCity) {

    fetchProperties();

    return;

  }

  try {

    const res =
      await API.get(
        `/properties/search?city=${searchCity}`
      );

    setProperties(res.data);

  } catch {

    alert("No properties found");

  }

};

  const filterByGender = async (selectedGender) => {

    setGender(selectedGender);

    if (!selectedGender) {
      fetchProperties();
      return;
    }

    try {

      const res =
        await API.get(
          `/properties/filter/gender?gender=${selectedGender}`
        );

      setProperties(res.data);

    } catch {

      alert("No properties found");
    }
  };

  const filterByPrice = async () => {

    if (!minPrice || !maxPrice) {
      alert("Enter min and max price");
      return;
    }

    try {

      const res =
        await API.get(
          `/properties/filter/price?minPrice=${minPrice}&maxPrice=${maxPrice}`
        );

      setProperties(res.data);

    } catch {

      alert("No properties found");
    }
  };

  const resetFilters = () => {

    setCity("");
    setGender("");
    setMinPrice("");
    setMaxPrice("");

    fetchProperties();
  };

  const createBooking = async (
    propertyId,
    roomId
  ) => {

    if (
      !checkInDate ||
      !checkOutDate
    ) {

      alert(
        "Please select check-in and check-out dates"
      );

      return;
    }

    try {

      const bookingRes =
        await API.post(
          "/bookings",
          {
            propertyId,
            roomId,
            checkInDate,
            checkOutDate
          }
        );

      const booking =
        bookingRes.data;

      const orderRes =
        await API.post(
          "/payments/create-order",
          {
            bookingId:
              booking.id
          }
        );

      const order =
        orderRes.data;

      const options = {

        key:
          order.razorpayKey,

        amount:
          order.amount * 100,

        currency:
          order.currency,

        name:
          "StayEase",

        description:
          "Room Booking Payment",

        order_id:
          order.orderId,

        handler:
          async function (
            response
          ) {

            try {

              await API.post(
                "/payments/verify",
                {
                  bookingId:
                    booking.id,

                  razorpayOrderId:
                    response.razorpay_order_id,

                  razorpayPaymentId:
                    response.razorpay_payment_id,

                  razorpaySignature:
                    response.razorpay_signature
                }
              );

              alert(
                "Payment Successful!"
              );

              fetchProperties();

            } catch (err) {

              alert(
                err.response?.data?.message ||
                "Payment verification failed"
              );
            }
          },

        theme: {
          color:
            "#2563eb"
        }
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Booking failed"
      );
    }
  };

  return (

    <div>

      <Navbar />

      <div className="page-container">



        
<div className="filter-card">

  <div className="filter-title">

    Filters

  </div>

  <select
    className="filter-input"
    value={gender}
    onChange={(e) =>
      filterByGender(
        e.target.value
      )
    }
  >

    <option value="">
      All Genders
    </option>

    <option value="MALE">
      Male
    </option>

    <option value="FEMALE">
      Female
    </option>

    <option value="CO_ED">
      Co-Ed
    </option>

  </select>

  <input
    className="filter-input"
    type="number"
    placeholder="Min Price"
    value={minPrice}
    onChange={(e) =>
      setMinPrice(e.target.value)
    }
  />

  <input
    className="filter-input"
    type="number"
    placeholder="Max Price"
    value={maxPrice}
    onChange={(e) =>
      setMaxPrice(e.target.value)
    }
  />

  <button
    className="dashboard-btn"
    onClick={filterByPrice}
  >
    Apply
  </button>

  <button
    className="reset-btn"
    onClick={resetFilters}
  >
    Reset
  </button>

</div>

<div className="property-header">

  <h2 className="section-heading">

    {properties.length} Properties Available

  </h2>

  <select className="sort-dropdown">

    <option>
      Sort By
    </option>

    <option>
      Price Low → High
    </option>

    <option>
      Price High → Low
    </option>

  </select>

</div>

        {properties.length === 0 && (

          <p className="empty-text">
            No properties available
          </p>

        )}

        <div className="properties-grid">

          {properties.map((p) => (

            <PropertyCard
              key={p.id}
              property={p}
              createBooking={
                createBooking
              }
              ownerView={false}
            />

          ))}

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;