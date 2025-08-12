import React, { createContext, useState, useContext, useCallback } from 'react';

const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [venues, setVenues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const findAndFetchNearbyVenues = useCallback(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }

        setIsLoading(true);
        setVenues([]); // Clear previous results
        setError(null);

        // 1. Get User's Location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lng: longitude });

                // 2. Immediately Fetch Venues with the new coordinates
                const searchRadius = 5000;
                const overpassQuery = `
                    [out:json][timeout:25];
                    (
                      node["leisure"="sports_centre"](around:${searchRadius},${latitude},${longitude});
                      way["leisure"="sports_centre"](around:${searchRadius},${latitude},${longitude});
                      relation["leisure"="sports_centre"](around:${searchRadius},${latitude},${longitude});
                      node["leisure"="pitch"](around:${searchRadius},${latitude},${longitude});
                      way["leisure"="pitch"](around:${searchRadius},${latitude},${longitude});
                      relation["leisure"="pitch"](around:${searchRadius},${latitude},${longitude});
                      node["sport"](around:${searchRadius},${latitude},${longitude});
                      way["sport"](around:${searchRadius},${latitude},${longitude});
                      relation["sport"](around:${searchRadius},${latitude},${longitude});
                    );
                    out center;
                `;

                const API_ENDPOINT = "https://overpass-api.de/api/interpreter";

                fetch(API_ENDPOINT, {
                    method: "POST",
                    body: "data=" + encodeURIComponent(overpassQuery)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Venues found:", data);
                        setVenues(data.elements || []); // Store the found venues
                        setIsLoading(false);
                    })
                    .catch(err => {
                        setError("Failed to fetch venue data.");
                        console.error("Overpass API Error:", err);
                        setIsLoading(false);
                    });
            },
            (err) => {
                // Handle location permission denial
                setError(err.message);
                console.error("Geolocation Error:", err);
                setIsLoading(false);
            }
        );
    }, []);

    const value = {
        location,
        venues,
        isLoading,
        error,
        findAndFetchNearbyVenues, // Expose the new function
    };

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (context === null) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};