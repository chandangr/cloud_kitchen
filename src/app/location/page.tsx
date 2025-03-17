// 'use client';

// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// // @ts-expect-error --ignore
// import debounce from 'lodash.debounce';
// import { useEffect, useRef, useState } from 'react';
// import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";

// // Fix for default icon issue in Leaflet
// // @ts-expect-error --ignore
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// // Karnataka, India coordinates
// const karnatakaCenter = L.latLng(12.9716, 77.5946); // Bangalore coordinates

// // MapEvents component to track map movement and update marker
// const MapEvents = ({ setPosition }: { setPosition: (position: L.LatLng) => void }) => {
//   const map = useMapEvents({
//     drag: () => {
//       setPosition(map.getCenter());
//     },
//     click: (e) => {
//       setPosition(e.latlng);
//     },
//   });

//   return null;
// };

// // ChangeView component to manage map view
// const ChangeView = ({ center, zoom }: { center: L.LatLng, zoom: number }) => {
//   const map = useMap();
  
//   useEffect(() => {
//     map.setView(center, zoom);
//   }, [center, zoom, map]);
  
//   return null;
// };

// // SearchBox component using OpenStreetMap Nominatim
// const SearchBox = ({ setPosition }: { setPosition: (position: L.LatLng) => void }) => {
//   const [searchTerm, setSearchTerm] = useState('');
// /* eslint-disable */
//   const [suggestions, setSuggestions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const debouncedSearch = useRef(
//     debounce(async (query: string) => {
//       if (query.trim() === '') return;

//       setLoading(true);
//       try {
//         const response = await fetch(
//           `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//             query + ', Karnataka, India'
//           )}&limit=5&accept-language=en`
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setSuggestions(data);
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//       } finally {
//         setLoading(false);
//       }
//     }, 300)
//   ).current;

//   useEffect(() => {
//     debouncedSearch(searchTerm);
//   }, [searchTerm, debouncedSearch]);

//   const handleSelectLocation = (lat: number, lon: number) => {
//     setPosition(L.latLng(lat, lon));
//     setSuggestions([]);
//     setSearchTerm('');
//   };

//   if(loading) return null

//   return (
//     <div className="relative w-full">
//       <div className="flex gap-2">
//         <Input 
//           type="text" 
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search for locations in Karnataka, India" 
//           className="w-full"
//         />
//       </div>
      
//       {suggestions.length > 0 && (
//         <Card className="absolute z-50 w-full mt-1 shadow-lg max-h-60 overflow-y-auto p-0">
//           <CardContent className="p-0">
//             {suggestions.map((item, index) => (
//               <div
//                 key={index}
//                 className="p-2 hover:bg-accent bg-white cursor-pointer border-b border-border"
//                 onClick={() => handleSelectLocation(parseFloat(item.lat), parseFloat(item.lon))}
//               >
//                 {item.display_name}
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default function PaymentPage() {
//   // Initialize position with Karnataka's coordinates rather than null
//   const [position, setPosition] = useState<L.LatLng>(karnatakaCenter);
//   const [address, setAddress] = useState<string | null>(null);
//   const [isLocating, setIsLocating] = useState<boolean>(false);

//   const debouncedFetchAddress = useRef(
//     debounce(async (lat: number, lng: number) => {
//       const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2&accept-language=en`;
//       try {
//         const response = await fetch(url, {
//           headers: {
//             'User-Agent': 'MyWebApp/1.0 (Contact: info@example.com)'
//           }
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setAddress(data.display_name);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }, 500)
//   ).current;

//   useEffect(() => {
//     if (position) {
//       debouncedFetchAddress(position.lat, position.lng);
//     }
//   }, [position, debouncedFetchAddress]);

//   // Load Karnataka address on initial render
//   useEffect(() => {
//     debouncedFetchAddress(karnatakaCenter.lat, karnatakaCenter.lng);
//   }, [debouncedFetchAddress]);

//   // Function to get user's current location using browser's Geolocation API
//   const getCurrentLocation = () => {
//     setIsLocating(true);
    
//     if (typeof window !== 'undefined' && navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setPosition(L.latLng(latitude, longitude));
//           setIsLocating(false);
//         },
//         (error) => {
//           console.error("Error getting current location:", error);
//           alert("Unable to retrieve your location. Please make sure location services are enabled.");
//           setIsLocating(false);
//         },
//         { enableHighAccuracy: true }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//       setIsLocating(false);
//     }
//   };
  
//   // More appropriate default zoom level for Karnataka state view
//   const defaultZoomLevel = 18;
//   const maxZoomLevel = 18;

//   return (
//     <div className="container mx-auto p-4 space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl">Select Your Location in Karnataka, India</CardTitle>
//           <CardDescription>Move the map or search to select your delivery location</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="relative z-50">
//             <SearchBox setPosition={setPosition} />
//           </div>
          
//           <div>
//             <Button 
//               onClick={getCurrentLocation}
//               disabled={isLocating}
//               variant="secondary"
//               className="w-full md:w-auto"
//             >
//               {isLocating ? "Getting Location..." : "Get My Current Location"}
//             </Button>
//           </div>
          
//           <div className="border rounded-lg overflow-hidden relative z-0">
//             <MapContainer 
//               center={position} 
//               zoom={defaultZoomLevel} 
//               style={{ height: '500px', width: '100%' }}
//               scrollWheelZoom={true}
//             >
//               <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 maxZoom={maxZoomLevel}
//               />
//               <Marker 
//                 position={position} 
//                 draggable={true} 
//                 eventHandlers={{
//                   dragend: (e) => {
//                     setPosition(e.target.getLatLng());
//                   },
//                 }}
//               />
//               <MapEvents setPosition={setPosition} />
//               <ChangeView center={position} zoom={defaultZoomLevel} />
//             </MapContainer>
//           </div>
//         </CardContent>
        
//         {position && (
//           <CardFooter className="flex-col items-start">
//             <div className="bg-accent/50 p-3 rounded-md w-full">
//               <p className="font-medium">Selected Location: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}</p>
//               {address && <p className="text-sm text-muted-foreground mt-1">{address}</p>}
//             </div>
//             <Button className="mt-4 w-full sm:w-auto">Confirm Location</Button>
//           </CardFooter>
//         )}
//       </Card>
//     </div>
//   );
// }


"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const LocationPage = () => {
  const router = useRouter();

  const handleBackToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Options</h1>
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          1 item • Total: ₹853 • Savings of ₹50
        </p>
        <p className="text-green-600">
          Save upto ₹171 more with payment offers
        </p>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Preferred Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p>PhonePe (Wallet/UPI/Cards)</p>
              <p className="text-sm text-gray-500">
                Pay using PhonePe wallet to get an additional flat ₹40 cashback
                on transactions above ₹399
              </p>
            </div>
            <Button variant="outline" className="text-red-500">
              Link Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Pay by any UPI App</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full">+ Add New UPI ID</Button>
          <p className="text-sm text-gray-500">
            You need to have a registered UPI ID
          </p>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Credit & Debit Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p>One Card • • • 3057</p>
            <Button className="text-blue-500">+ Add New Card</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>More Payment Options</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Wallets: PhonePe, Amazon Pay & more</p>
          <p>Pluxee: Pluxee card valid only on Food & Instamart</p>
          <p>Netbanking: Select from a list of banks</p>
          <p>Pay on Delivery: Pay in cash or pay online.</p>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Button onClick={handleBackToCheckout} className="w-full">
          Back to Checkout
        </Button>
      </div>
    </div>
  );
};

export default LocationPage;
