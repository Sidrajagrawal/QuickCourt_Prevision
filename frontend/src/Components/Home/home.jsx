import React, { useState, useEffect } from "react";
import Navbar from "../Navabr/Navbar.jsx";
import PopularSports from "./PopularSports.jsx";
import VenueCard from "./VenueCard.jsx";
import heroImage from "../../assets/img1.png";
import { useDarkMode } from "../DarkModeContext.jsx";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedLocation, setSelectedLocation] = useState("Ahmedabad");

    const { isDarkMode } = useDarkMode();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/venues/');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setVenues(data);
            } catch (err) {
                console.error("Failed to fetch venues:", err);
                setError("Failed to load venues. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchVenues();
    }, []);

    const handleViewDetails = (venue) => {
        navigate(`/venue-details/${venue.id}`, { state: { venue } });
    };

    const nextSlide = () => setCurrentSlide((prev) => (venues.length > 0 ? (prev + 1) % venues.length : 0));
    const prevSlide = () => setCurrentSlide((prev) => (venues.length > 0 ? (prev - 1 + venues.length) % venues.length : 0));

    return (
        <div className="min-h-screen transition-all duration-500 bg-primary-light dark:bg-primary-dark text-secondary-light dark:text-secondary-dark">
            <Navbar />

            {/* Hero Section */}
            <div className="px-4 md:px-6 py-12 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 rounded-full opacity-20 blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800 rounded-full opacity-15 blur-3xl" />
                </div>

                <div className="max-w-lg mx-auto md:mx-0 space-y-8 relative z-10">
                    <div className="relative group">
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-purple-400 transition-all duration-200" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <input
                            type="text"
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            placeholder="Search locations in India..."
                            className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-2xl transform hover:scale-[1.01] focus:scale-[1.02] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-purple-500/20 focus:outline-none"
                        />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight transition-colors mx-6.5 duration-300 text-gray-900 dark:text-white">
                            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">FIND PLAYERS &</span>
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">VENUES NEARBY</span>
                        </h1>
                        <p className="text-lg leading-relaxed transition-colors duration-300 text-gray-600 dark:text-gray-300 mx-7">
                            Seamlessly explore sports venues and play with
                            <br />
                            sports enthusiasts just like you!
                        </p>
                    </div>
                </div>

                <div className="hidden md:block absolute right-26 top-20 w-120 h-64 rounded-3xl overflow-hidden shadow-2xl ">
                    <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Venues Section */}
            {/* Venues Section */}
            <div className="px-4 md:px-6 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold transition-colors duration-300 text-gray-900 dark:text-white">
                        Book Venues
                    </h2>
                    <Link
                        to="/venues"
                        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-full font-semibold shadow hover:scale-105 transition-all"
                    >
                        See All Venues
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-10">
                        <p className="text-xl font-semibold">Loading venues...</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center py-10">
                        <p className="text-red-500 text-xl font-semibold">{error}</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Grid */}
                        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-12">
                            {venues.map((venue) => (
                                <VenueCard
                                    key={venue.id}
                                    venue={venue}
                                    onView={() => navigate(`/venue-details/${venue.id}`)}
                                    isDarkMode={isDarkMode}
                                />
                            ))}
                        </div>

                        {/* Mobile Carousel */}
                        <div className="md:hidden relative mb-12">
                            <div className="overflow-hidden rounded-3xl">
                                <div
                                    className="flex transition-transform duration-500 ease-out"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {venues.map((venue) => (
                                        <div key={venue.id} className="w-full flex-shrink-0 px-3">
                                            <VenueCard
                                                venue={venue}
                                                onView={() => navigate(`/venue-details/${venue.id}`)}
                                                isDarkMode={isDarkMode}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Carousel controls remain unchanged */}
                        </div>
                    </>
                )}
            </div>


            <PopularSports isDarkMode={isDarkMode} />

            <footer className="text-center py-12 text-gray-600 dark:text-gray-400">
                <p className="text-lg font-medium">Made with ❤️ for Sports Enthusiasts</p>
            </footer>
        </div>
    );
};

export default Home;
