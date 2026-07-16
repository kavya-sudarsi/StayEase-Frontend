import { useNavigate } from "react-router-dom";
import "./PropertyCard.css";

function PropertyCard({
  property,
  ownerView,
  deleteProperty
}) {

  const navigate = useNavigate();

  const lowestPrice =
    property.rooms?.length > 0
      ? Math.min(
          ...property.rooms.map((r) => r.pricePerBed)
        )
      : null;

  const availableRooms =
    property.rooms?.filter(
      (r) => r.availableBeds > 0
    ).length || 0;

  return (

    <div className="property-card">

      <div className="property-image-section">

      <img
        src={
          property.imageUrl
            ? property.imageUrl.startsWith("http")
              ? property.imageUrl
              : `http://localhost:8082${property.imageUrl}`
            : "https://images.unsplash.com/photo-1566073771259-6a8506099945"
        }
        alt={property.name}
        className="property-image"
      />

      </div>

      <div className="property-content">

        <div className="property-top">

          <div>

            <h2 className="property-title">
              {property.name}
            </h2>

            <p className="property-location">
              📍 {property.city}, {property.state}
            </p>

          </div>

          {lowestPrice && (

            <div className="price-box">

              ₹{lowestPrice}

              <span>/month</span>

            </div>

          )}

        </div>

        <div className="property-badges">

          <span className="badge">
            {property.gender}
          </span>

          <span className="badge">
            {property.propertyType}
          </span>

          <span className="badge status">
            {property.status}
          </span>

        </div>

        <p className="property-description">

          {property.description
            ? property.description.substring(0, 120)
            : "Comfortable stay with modern amenities."}

          {property.description?.length > 120 && "..."}
        </p>

        <div className="amenities">

          {property.amenities?.slice(0,4).map((a,index)=>(

            <span
              key={index}
              className="amenity-chip"
            >
              {a}
            </span>

          ))}

        </div>

        <div className="property-footer">

          <div>

            <strong>

              {availableRooms}

            </strong>

            {" "}Rooms Available

          </div>

          <div className="property-actions">

            <button
              className="details-btn"
              onClick={() =>
                navigate(`/property/${property.id}`)
              }
            >
              View Details
            </button>

            {ownerView && (

              <button
                className="delete-btn"
                onClick={() =>
                  deleteProperty(property.id)
                }
              >
                Delete
              </button>

            )}

          </div>

        </div>

      </div>

    </div>

  );
}

export default PropertyCard;