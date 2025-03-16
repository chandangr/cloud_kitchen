'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Fix for default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Karnataka, India coordinates
const karnatakaCenter = L.latLng(12.9716, 77.5946); // Bangalore coordinates

// MapEvents component to track map movement and update marker
const MapEvents = ({ setPosition }) => {
  const map = useMapEvents({
    drag: () => {
      setPosition(map.getCenter());
    },
    click: (e) => {
      setPosition(e.latlng);
    },
  });

  return null;
};

// ChangeView component to manage map view
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
};

// LocationMarker component to show the marker and handle user location
const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    locationfound: (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  // Removed automatic location finding to avoid overriding the Karnataka default

  return position === null ? null : (
    <Marker 
      position={position} 
      draggable={true} 
      eventHandlers={{
        dragend: (e) => {
          setPosition(e.target.getLatLng());
        },
      }}
    />
  );
};

// SearchBox component using OpenStreetMap Nominatim
const SearchBox = ({ setPosition }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useRef(
    debounce(async (query) => {
      if (query.trim() === '') return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query + ', Karnataka, India'
          )}&limit=5&accept-language=en`
        );

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300)
  ).current;

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleSelectLocation = (lat, lon) => {
    setPosition(L.latLng(lat, lon));
    setSuggestions([]);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <Input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for locations in Karnataka, India" 
          className="w-full"
        />
      </div>
      
      {suggestions.length > 0 && (
        <Card className="absolute z-50 w-full mt-1 shadow-lg max-h-60 overflow-y-auto p-0">
          <CardContent className="p-0">
            {suggestions.map((item, index) => (
              <div
                key={index}
                className="p-2 hover:bg-accent bg-white cursor-pointer border-b border-border"
                onClick={() => handleSelectLocation(item.lat, item.lon)}
              >
                {item.display_name}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default function PaymentPage() {
  // Initialize position with Karnataka's coordinates rather than null
  const [position, setPosition] = useState<L.LatLng>(karnatakaCenter);
  const [address, setAddress] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);

const debouncedFetchAddress = useRef(
    debounce(async (lat, lng) => {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2&accept-language=en`;
        fetch(url, {
            headers: {
                'User-Agent': 'MyWebApp/1.0 (Contact: info@example.com)'
            }
        })
        .then(response => response.json())
            .then(data => { 
                setAddress(data.display_name)
            })
        .catch(error => console.error("Error:", error));
    }, 500)
).current;

  useEffect(() => {
    if (position) {
      debouncedFetchAddress(position.lat, position.lng);
    }
  }, [position, debouncedFetchAddress]);

  // Load Karnataka address on initial render
  useEffect(() => {
    debouncedFetchAddress(karnatakaCenter.lat, karnatakaCenter.lng);
  }, [debouncedFetchAddress]);

  // Function to get user's current location using browser's Geolocation API
  const getCurrentLocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition(L.latLng(latitude, longitude));
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting current location:", error);
          alert("Unable to retrieve your location. Please make sure location services are enabled.");
          setIsLocating(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLocating(false);
    }
  };
  
  // More appropriate default zoom level for Karnataka state view
  const defaultZoomLevel = 18;
  const maxZoomLevel = 18;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Select Your Location in Karnataka, India</CardTitle>
          <CardDescription>Move the map or search to select your delivery location</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative z-50">
            <SearchBox setPosition={setPosition} />
          </div>
          
          <div>
            <Button 
              onClick={getCurrentLocation}
              disabled={isLocating}
              variant="secondary"
              className="w-full md:w-auto"
            >
              {isLocating ? "Getting Location..." : "Get My Current Location"}
            </Button>
          </div>
          
          <div className="border rounded-lg overflow-hidden relative z-0">
            <MapContainer 
              center={position} 
              zoom={defaultZoomLevel} 
              style={{ height: '500px', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={maxZoomLevel}
              />
              <Marker 
                position={position} 
                draggable={true} 
                eventHandlers={{
                  dragend: (e) => {
                    setPosition(e.target.getLatLng());
                  },
                }}
              />
              <MapEvents setPosition={setPosition} />
              <ChangeView center={position} zoom={defaultZoomLevel} />
            </MapContainer>
          </div>
        </CardContent>
        
        {position && (
          <CardFooter className="flex-col items-start">
            <div className="bg-accent/50 p-3 rounded-md w-full">
              <p className="font-medium">Selected Location: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}</p>
              {address && <p className="text-sm text-muted-foreground mt-1">{address}</p>}
            </div>
            <Button className="mt-4 w-full sm:w-auto">Confirm Location</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}