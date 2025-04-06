"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import debounce from "lodash/debounce";
import { MapPin, Navigation, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface AddressDialogProps {
  onSave: (address: {
    fullAddress: string;
    doorNumber: string;
    landmark: string;
    type: string;
    label?: string;
    coordinates: [number, number];
  }) => void;
  selectedAddress?: {
    fullAddress: string;
    doorNumber: string;
    landmark: string;
    type: string;
    label?: string;
    coordinates: [number, number];
  };
}

interface DraggableMarkerProps {
  position: [number, number];
  onPositionChange: (position: [number, number]) => void;
}

// Function to fetch address details from coordinates
async function fetchAddressFromCoordinates(lat: number, lng: number) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=en&namedetails=1`,
      {
        headers: {
          "Accept-Language": "en",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
}

function DraggableMarker({ position, onPositionChange }: DraggableMarkerProps) {
  const map = useMap();
  const [localPosition, setLocalPosition] = useState(position);

  // Debounce the position change handler for address lookup
  const debouncedPositionChange = useCallback(
    debounce((newPosition: [number, number]) => {
      onPositionChange(newPosition);
    }, 1000),
    []
  );

  // Update marker position in real-time as the map moves
  useMapEvents({
    move: () => {
      const center = map.getCenter();
      const newPosition: [number, number] = [center.lat, center.lng];

      // Update local position immediately for smooth marker movement
      setLocalPosition(newPosition);

      // Debounce the address lookup
      debouncedPositionChange(newPosition);
    },
  });

  // Use Leaflet's built-in smooth animation for marker movement
  return (
    <Marker
      position={localPosition}
      eventHandlers={{
        add: (e) => {
          e.target.options.smoothFactor = 1;
        },
      }}
    />
  );
}

function LocationButton() {
  const map = useMap();

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          map.flyTo(
            [position.coords.latitude, position.coords.longitude],
            map.getZoom(),
            {
              duration: 1.5,
            }
          );
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">
        <button
          onClick={handleClick}
          className="flex items-center justify-center w-8 h-8 bg-white hover:bg-gray-100 border-b border-gray-300"
          title="Go to current location"
        >
          <Navigation className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function AddressDialog({ onSave, selectedAddress }: AddressDialogProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<[number, number]>([
    12.9716, 77.5946,
  ]); // Default to Bangalore
  const [address, setAddress] = useState("");
  const [doorNumber, setDoorNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressType, setAddressType] = useState<string>("home");
  const [customLabel, setCustomLabel] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with selected address if available
  useEffect(() => {
    if (selectedAddress) {
      setAddress(selectedAddress.fullAddress);
      setDoorNumber(selectedAddress.doorNumber);
      setLandmark(selectedAddress.landmark);
      setAddressType(selectedAddress.type);
      setPosition(selectedAddress.coordinates);
      if (selectedAddress.type === "other" && selectedAddress.label) {
        setCustomLabel(selectedAddress.label);
        setShowCustomInput(true);
      }
    }
  }, [selectedAddress]);

  // Debounced function to update address fields
  const debouncedUpdateAddress = useCallback(
    debounce(async (pos: [number, number]) => {
      setIsLoading(true);
      const addressData = await fetchAddressFromCoordinates(pos[0], pos[1]);

      if (addressData) {
        // Extract address components
        const displayName = addressData.display_name || "";
        const houseNumber = addressData.address?.house_number || "";
        const road = addressData.address?.road || "";
        const suburb = addressData.address?.suburb || "";

        // Set the full address
        setAddress(displayName);

        // Set door number if available
        if (houseNumber) {
          setDoorNumber(houseNumber);
        }

        // Set landmark (using road or suburb)
        if (road) {
          setLandmark(road);
        } else if (suburb) {
          setLandmark(suburb);
        }
      }

      setIsLoading(false);
    }, 0),
    []
  );

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    }
  }, []);

  // Update address fields when position changes
  useEffect(() => {
    debouncedUpdateAddress(position);

    // Cleanup function to cancel pending debounced calls
    return () => {
      debouncedUpdateAddress.cancel();
    };
  }, [position, debouncedUpdateAddress]);

  const handleAddressTypeChange = (type: string) => {
    setAddressType(type);
    setShowCustomInput(type === "other");
    if (type !== "other") {
      setCustomLabel("");
    }
  };

  const handleSave = () => {
    if (addressType === "other" && !customLabel) {
      return; // Don't save if custom label is empty
    }

    onSave({
      fullAddress: address,
      doorNumber,
      landmark,
      type: addressType,
      label: addressType === "other" ? customLabel : undefined,
      coordinates: position,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <MapPin className="mr-2 h-4 w-4" />
          {selectedAddress ? (
            <div className="text-left">
              <p className="font-medium">
                {selectedAddress.type === "other"
                  ? selectedAddress.label
                  : selectedAddress.type}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {selectedAddress.fullAddress}
              </p>
            </div>
          ) : (
            "Add New Address"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Save delivery address</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="h-[300px] w-full rounded-md overflow-hidden relative">
            <MapContainer
              center={position}
              zoom={13}
              className="h-full w-full"
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <DraggableMarker
                position={position}
                onPositionChange={setPosition}
              />
              <LocationButton />
            </MapContainer>
          </div>

          <div className="space-y-2">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Input
              value={doorNumber}
              onChange={(e) => setDoorNumber(e.target.value)}
              placeholder="Door / Flat No."
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Input
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="Landmark"
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              className={cn(
                "flex-1",
                addressType === "home" && "bg-primary text-primary-foreground"
              )}
              onClick={() => handleAddressTypeChange("home")}
            >
              Home
            </Button>
            <Button
              variant="outline"
              className={cn(
                "flex-1",
                addressType === "work" && "bg-primary text-primary-foreground"
              )}
              onClick={() => handleAddressTypeChange("work")}
            >
              Work
            </Button>
            <Button
              variant="outline"
              className={cn(
                "flex-1",
                addressType === "other" && "bg-primary text-primary-foreground"
              )}
              onClick={() => handleAddressTypeChange("other")}
            >
              Other
            </Button>
          </div>

          {showCustomInput && (
            <div className="space-y-2">
              <Input
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                placeholder="Enter label (e.g., Mom's House)"
                className="w-full"
              />
            </div>
          )}

          <Button
            className="w-full"
            onClick={handleSave}
            disabled={addressType === "other" && !customLabel}
          >
            SAVE ADDRESS & PROCEED
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
