import { Fragment, useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./OwnerDashboard.css";

const TYPE_LABELS = { PG: "PG", HOSTEL: "Hostel", APARTMENT: "Apartment" };
const GENDER_LABELS = { CO_ED: "Co-Ed", MALE: "Male", FEMALE: "Female" };
const SHARING_LABELS = {
  "1-sharing": "1 Sharing",
  "2-sharing": "2 Sharing",
  "3-sharing": "3 Sharing",
  Dormitory: "Dormitory",
};

const EMPTY_ROOM = {
  roomNumber: "",
  totalBeds: "",
  pricePerBed: "",
  roomType: "",
};

function OwnerDashboard() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // create-property form
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [propertyType, setPropertyType] = useState("PG");
  const [gender, setGender] = useState("CO_ED");
  const [contactNumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [amenities, setAmenities] = useState([]);

  // inline room management
  const [expandedPropertyId, setExpandedPropertyId] = useState(null);
  const [newRoom, setNewRoom] = useState(EMPTY_ROOM);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/properties/my-properties");
      setProperties(res.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmenityChange = (amenity) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const uploadImage = async (file) => {

  if (!file) return;

  try {

    setUploadingImage(true);

    const formData = new FormData();

    formData.append("file", file);

    const res = await API.post(

      "/properties/upload-image",

      formData,

      {

        headers: {

          "Content-Type": "multipart/form-data",

        },

      }

    );

    setImageUrl(res.data.imageUrl);

  } catch (err) {

    alert("Image upload failed");

  } finally {

    setUploadingImage(false);

  }

};

  const openCreateForm = () => {
    setShowCreateForm(true);
    setTimeout(() => {
      document
        .getElementById("create-property")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const cancelCreateForm = () => {
    setShowCreateForm(false);
  };

  const createProperty = async () => {
    if (!name || !address) {
      alert("Name and address are required");
      return;
    }

  if (uploadingImage) {

  alert("Please wait until image upload completes");

  return;

}

    try {

      await API.post("/properties", {
        name,
        address,
        city,
        state,
        pincode,
        propertyType,
        gender,
        contactNumber,
        description,
        imageUrl,
        amenities,
      });

      alert("Property created");

      setName("");
      setAddress("");
      setCity("");
      setState("");
      setPincode("");
      setContactNumber("");
      setDescription("");
      setImageUrl("");
      setUploadingImage(false);
      setAmenities([]);
      setShowCreateForm(false);

      fetchProperties();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create property");
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Delete this property? This cannot be undone.")) {
      return;
    }

    await API.delete(`/properties/${id}`);
    alert("Property deleted");
    fetchProperties();
  };

  // ---- Room management ----

  const toggleExpand = (propertyId) => {
    setNewRoom(EMPTY_ROOM);
    setExpandedPropertyId((current) =>
      current === propertyId ? null : propertyId
    );
  };

  const addRoom = async (propertyId, roomData) => {
    try {
      await API.post(`/properties/${propertyId}/rooms`, roomData);
      fetchProperties();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add room");
    }
  };

  const submitNewRoom = async (propertyId) => {
    if (
      !newRoom.roomNumber ||
      !newRoom.totalBeds ||
      !newRoom.pricePerBed ||
      !newRoom.roomType
    ) {
      alert("Enter room number, total beds, price per bed, and sharing type");
      return;
    }

    await addRoom(propertyId, newRoom);
    setNewRoom(EMPTY_ROOM);
  };

  const deleteRoom = async (roomId) => {
    if (!window.confirm("Remove this room?")) return;

    await API.delete(`/properties/rooms/${roomId}`);
    fetchProperties();
  };

  const totalRooms = properties.reduce(
    (sum, p) => sum + (p.rooms?.length || 0),
    0
  );

  return (
    <div>
      <Navbar />

      <div className="owner-dashboard-container">
        {/* ---- Overview strip ---- */}
        <div className="owner-stats-strip">
          <div className="stat-block">
            <span className="stat-value">{properties.length}</span>
            <span className="stat-label">Properties</span>
          </div>

          <div className="stat-divider" />

          <div className="stat-block">
            <span className="stat-value">{totalRooms}</span>
            <span className="stat-label">Rooms listed</span>
          </div>

          <button className="add-property-btn" onClick={openCreateForm}>
            + Add Property
          </button>
        </div>

        {/* ---- Create property (collapsible) ---- */}
        {showCreateForm && (
          <div id="create-property" className="create-property-card">
            <div className="create-property-head">
              <h2>Create New Property</h2>
              <button className="close-form-btn" onClick={cancelCreateForm}>
                Cancel
              </button>
            </div>

            <div className="create-property-form">
              <input
                className="owner-input"
                placeholder="Property Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="owner-input"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <input
                className="owner-input"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <input
                className="owner-input"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />

              <input
                className="owner-input"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />

              <input
                className="owner-input"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />

            <div className="image-upload-section">

              <label className="upload-label">

                Property Image

              </label>

              <input

                type="file"

                accept="image/*"

                onChange={(e) =>

                  uploadImage(e.target.files[0])

                }

              />

              {uploadingImage && (

                <p>Uploading image...</p>

              )}

              {imageUrl && (

                <img

                  src={`http://localhost:8082${imageUrl}`}

                  alt="Preview"

                  className="image-preview"

                />

              )}

            </div>

              <textarea
                className="owner-input owner-description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <select
                className="owner-input"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="PG">PG</option>
                <option value="HOSTEL">Hostel</option>
                <option value="APARTMENT">Apartment</option>
              </select>

              <select
                className="owner-input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="CO_ED">Co-Ed</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>

              <div className="amenities-section">
                {["WiFi", "Food", "Laundry", "Gym", "Parking"].map((item) => (
                  <label key={item} className="amenity-label">
                    <input
                      type="checkbox"
                      checked={amenities.includes(item)}
                      onChange={() => handleAmenityChange(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>

              <button className="create-property-btn" onClick={createProperty}>
                Create Property
              </button>
            </div>
          </div>
        )}

        {/* ---- Properties table ---- */}
        <div className="properties-section">
          <div className="properties-header">
            <h2>Your Properties</h2>
            <span>{properties.length} Total</span>
          </div>

          {isLoading && <div className="table-loading">Loading properties…</div>}

          {!isLoading && properties.length === 0 && (
            <div className="empty-properties-card">
              <p className="empty-title">No properties created yet</p>
              <p className="empty-subtitle">
                Add your first property to start listing rooms.
              </p>
              <button className="add-property-btn" onClick={openCreateForm}>
                + Add Property
              </button>
            </div>
          )}

          {!isLoading && properties.length > 0 && (
            <div className="properties-table-wrap">
              <table className="properties-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Gender</th>
                    <th>Rooms</th>
                    <th>Amenities</th>
                    <th className="actions-col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {properties.map((p) => {
                    const isExpanded = expandedPropertyId === p.id;

                    return (
                      <Fragment key={p.id}>
                        <tr className={isExpanded ? "is-expanded" : ""}>
                          <td>
                            <div className="property-name">{p.name}</div>
                            <div className="property-sub">{p.address}</div>
                          </td>

                          <td>
                            <span className="type-badge">
                              {TYPE_LABELS[p.propertyType] || p.propertyType}
                            </span>
                          </td>

                          <td>
                            {p.city}
                            {p.state ? `, ${p.state}` : ""}
                          </td>

                          <td>
                            <span className={`gender-tag gender-${p.gender}`}>
                              {GENDER_LABELS[p.gender] || p.gender}
                            </span>
                          </td>

                          <td>
                            <span className="room-count">
                              {p.rooms?.length || 0}
                            </span>
                          </td>

                          <td>
                            <div className="amenity-chips">
                              {(p.amenities || []).length === 0 && (
                                <span className="muted-text">—</span>
                              )}
                              {(p.amenities || []).map((a) => (
                                <span className="amenity-chip" key={a}>
                                  {a}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="actions-col">
                            <button
                              className="manage-rooms-btn"
                              onClick={() => toggleExpand(p.id)}
                            >
                              {isExpanded ? "Hide Rooms" : "Manage Rooms"}
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => deleteProperty(p.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>

                        {isExpanded && (
                          <tr className="rooms-row">
                            <td colSpan={7}>
                              <div className="rooms-panel">
                                {(p.rooms || []).length === 0 ? (
                                  <p className="no-rooms-text">
                                    No rooms added yet for this property.
                                  </p>
                                ) : (
                                  <div className="rooms-list">
                                    {p.rooms.map((room) => (
                                      <div className="room-line" key={room.id}>
                                        <span className="room-number">
                                          Room {room.roomNumber}
                                        </span>
                                        <span className="room-detail">
                                          {room.totalBeds} bed
                                          {room.totalBeds > 1 ? "s" : ""}
                                        </span>
                                        <span className="room-detail">
                                          ₹{room.pricePerBed}/bed
                                        </span>
                                        {room.roomType && (
                                          <span className="room-type-tag">
                                            {SHARING_LABELS[room.roomType] ||
                                              room.roomType}
                                          </span>
                                        )}
                                        <button
                                          className="remove-room-btn"
                                          onClick={() => deleteRoom(room.id)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <div className="add-room-form">
                                  <input
                                    className="owner-input room-input"
                                    placeholder="Room Number"
                                    value={newRoom.roomNumber}
                                    onChange={(e) =>
                                      setNewRoom({
                                        ...newRoom,
                                        roomNumber: e.target.value,
                                      })
                                    }
                                  />

                                  <input
                                    className="owner-input room-input"
                                    type="number"
                                    placeholder="Total Beds"
                                    value={newRoom.totalBeds}
                                    onChange={(e) =>
                                      setNewRoom({
                                        ...newRoom,
                                        totalBeds: e.target.value,
                                      })
                                    }
                                  />

                                  <input
                                    className="owner-input room-input"
                                    type="number"
                                    placeholder="Price / Bed"
                                    value={newRoom.pricePerBed}
                                    onChange={(e) =>
                                      setNewRoom({
                                        ...newRoom,
                                        pricePerBed: e.target.value,
                                      })
                                    }
                                  />

                                  <select
                                    className="owner-input room-input"
                                    value={newRoom.roomType}
                                    onChange={(e) =>
                                      setNewRoom({
                                        ...newRoom,
                                        roomType: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="">Room Type</option>
                                    <option value="1-sharing">1 Sharing</option>
                                    <option value="2-sharing">2 Sharing</option>
                                    <option value="3-sharing">3 Sharing</option>
                                    <option value="Dormitory">Dormitory</option>
                                  </select>

                                  <button
                                    className="add-room-btn"
                                    onClick={() => submitNewRoom(p.id)}
                                  >
                                    + Add Room
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;