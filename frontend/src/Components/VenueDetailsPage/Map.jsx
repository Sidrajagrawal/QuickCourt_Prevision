import React from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const Map = ({ apiKey, position, darkMode = false, height = '250px' }) => {
    if (!apiKey) {
        return (
            <div className={`text-center p-4 rounded-xl ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
            }`}>
                API Key is missing. Map cannot be displayed.
            </div>
        );
    }

    // Custom map styles for dark/light mode
    const lightMapStyles = [
        {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#c9c9c9" }]
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }]
        },
        {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{ color: "#eeeeee" }]
        }
    ];

    const darkMapStyles = [
        {
            elementType: "geometry",
            stylers: [{ color: "#212121" }]
        },
        {
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
        },
        {
            elementType: "labels.text.fill",
            stylers: [{ color: "#757575" }]
        },
        {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#212121" }]
        },
        {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ color: "#757575" }]
        },
        {
            featureType: "administrative.country",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9e9e9e" }]
        },
        {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{ color: "#2c2c2c" }]
        },
        {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#8a8a8a" }]
        },
        {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{ color: "#373737" }]
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#3c3c3c" }]
        },
        {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{ color: "#252525" }]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#000000" }]
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#3d3d3d" }]
        }
    ];

    const mapOptions = {
        // Disable default UI controls
        disableDefaultUI: true,
        
        // Enable specific controls
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        
        // Styling
        styles: darkMode ? darkMapStyles : lightMapStyles,
        
        // Interaction options
        gestureHandling: 'cooperative', // Requires ctrl+scroll to zoom
        zoomControlOptions: {
            position: 7, // TOP_RIGHT
            style: 'SMALL'
        },
        
        // Map restrictions
        restriction: {
            latLngBounds: {
                north: 25,
                south: 20,
                west: 68,
                east: 78
            },
            strictBounds: false
        }
    };

    return (
        <APIProvider apiKey={apiKey}>
            <div 
                style={{ 
                    height: height, 
                    width: '100%', 
                    borderRadius: '1rem', 
                    overflow: 'hidden',
                    border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb'
                }}
            >
                <GoogleMap
                    defaultCenter={position}
                    defaultZoom={15}
                    options={mapOptions}
                    mapId={darkMode ? "dark-map-id" : "light-map-id"}
                >
                    <AdvancedMarker position={position}>
                        <Pin 
                            background={darkMode ? "#3B82F6" : "#EF4444"} 
                            borderColor={darkMode ? "#1E40AF" : "#DC2626"}
                            glyphColor="#FFFFFF"
                            scale={1.2}
                        />
                    </AdvancedMarker>
                </GoogleMap>
            </div>
        </APIProvider>
    );
};

export default Map;