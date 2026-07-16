import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {

    const navigate = useNavigate();

    return (

        <div className="landing-page">

            {/* HERO */}

            <section className="landing-hero-section">

                <div className="landing-hero-overlay">

                    <h1 className="landing-brand-title">
                        StayEase
                    </h1>

                    <h2 className="landing-hero-heading">
                        Find Your Perfect Stay
                    </h2>

                    <p className="landing-hero-description">
                        Verified PGs, Hostels and Apartments for Students &
                        Working Professionals across India.
                    </p>

                    <div className="landing-hero-buttons">

                        <button
                            className="landing-login-btn"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>

                        <button
                            className="landing-register-btn"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>

                    </div>

                </div>

            </section>

            {/* WHY STAYEASE */}

            <section className="landing-features-section">

                <h2>
                    Why Choose StayEase?
                </h2>

                <div className="landing-features-grid">

                    <div className="landing-feature-card">

                        <div className="landing-feature-icon">
                            🏠
                        </div>

                        <h3>
                            Verified Properties
                        </h3>

                        <p>
                            Every property is carefully verified before being
                            listed.
                        </p>

                    </div>

                    <div className="landing-feature-card">

                        <div className="landing-feature-icon">
                            💰
                        </div>

                        <h3>
                            Affordable Pricing
                        </h3>

                        <p>
                            Transparent pricing with no hidden charges.
                        </p>

                    </div>

                    <div className="landing-feature-card">

                        <div className="landing-feature-icon">
                            🔒
                        </div>

                        <h3>
                            Secure Booking
                        </h3>

                        <p>
                            Safe online payments with instant confirmation.
                        </p>

                    </div>

                    <div className="landing-feature-card">

                        <div className="landing-feature-icon">
                            ⚡
                        </div>

                        <h3>
                            Instant Booking
                        </h3>

                        <p>
                            Reserve your accommodation in just a few clicks.
                        </p>

                    </div>

                </div>

            </section>

            {/* PROPERTY TYPES */}

            <section className="landing-categories-section">

                <h2>
                    Explore Our Property Types
                </h2>

                <div className="landing-categories-grid">

                    <div className="landing-category-card">

                        <div className="landing-category-icon">
                            🏢
                        </div>

                        <h3>PG</h3>

                        <p>
                            Comfortable and affordable paying guest
                            accommodations.
                        </p>

                    </div>

                    <div className="landing-category-card">

                        <div className="landing-category-icon">
                            🏠
                        </div>

                        <h3>Hostels</h3>

                        <p>
                            Shared living spaces with modern facilities.
                        </p>

                    </div>

                    <div className="landing-category-card">

                        <div className="landing-category-icon">
                            🏡
                        </div>

                        <h3>Apartments</h3>

                        <p>
                            Fully furnished apartments for professionals.
                        </p>

                    </div>

                    <div className="landing-category-card">

                        <div className="landing-category-icon">
                            🎓
                        </div>

                        <h3>Student Housing</h3>

                        <p>
                            Safe accommodation near colleges and universities.
                        </p>

                    </div>

                </div>

            </section>

            {/* POPULAR AMENITIES */}

            <section className="landing-amenities-section">

                <h2>
                    Popular Amenities
                </h2>

                <div className="landing-amenities-grid">

                    <div className="landing-amenity-item">
                        📶 WiFi
                    </div>

                    <div className="landing-amenity-item">
                        🍱 Food Included
                    </div>

                    <div className="landing-amenity-item">
                        🚗 Parking
                    </div>

                    <div className="landing-amenity-item">
                        🏋️ Gym
                    </div>

                    <div className="landing-amenity-item">
                        🧺 Laundry
                    </div>

                    <div className="landing-amenity-item">
                        ❄️ Air Conditioning
                    </div>

                    <div className="landing-amenity-item">
                        📹 CCTV Security
                    </div>

                    <div className="landing-amenity-item">
                        ⚡ Power Backup
                    </div>

                </div>

            </section>

                    {/* HOW IT WORKS */}

            <section className="landing-how-section">

                <h2>
                    How StayEase Works
                </h2>

                <div className="landing-how-grid">

                    <div className="landing-how-card">

                        <div className="landing-how-icon">
                            👤
                        </div>

                        <h3>
                            Register
                        </h3>

                        <p>
                            Create your StayEase account in just a minute.
                        </p>

                    </div>

                    <div className="landing-how-card">

                        <div className="landing-how-icon">
                            🏠
                        </div>

                        <h3>
                            Browse
                        </h3>

                        <p>
                            Explore verified PGs, hostels and apartments after login.
                        </p>

                    </div>

                    <div className="landing-how-card">

                        <div className="landing-how-icon">
                            💳
                        </div>

                        <h3>
                            Book
                        </h3>

                        <p>
                            Complete your booking securely with online payment.
                        </p>

                    </div>

                </div>

            </section>

            {/* OWNER SECTION */}

            <section className="landing-owner-section">

                <div className="landing-owner-content">

                    <h2>
                        List Your Property
                    </h2>

                    <p>
                        Reach thousands of students and working professionals looking
                        for verified accommodation across India.
                    </p>

                    <button
                        className="landing-owner-btn"
                        onClick={() => navigate("/register")}
                    >
                        List Your Property
                    </button>

                </div>

            </section>

            {/* FOOTER */}

            <footer className="landing-footer">

                <h2>
                    StayEase
                </h2>

                <p>
                    Book • Stay • Relax
                </p>

                <small>
                    © 2026 StayEase. All Rights Reserved.
                </small>

            </footer>

        </div>

    );

}

export default LandingPage;