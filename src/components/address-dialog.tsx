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
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
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
    type: "home" | "work" | "other";
    coordinates: [number, number];
  }) => void;
}

interface DraggableMarkerProps {
  position: [number, number];
  onPositionChange: (position: [number, number]) => void;
}

function DraggableMarker({ position, onPositionChange }: DraggableMarkerProps) {
  const map = useMap();

  // Update marker position in real-time as the map moves
  useMapEvents({
    move: () => {
      const center = map.getCenter();
      onPositionChange([center.lat, center.lng]);
    },
  });

  // Use Leaflet's built-in smooth animation for marker movement
  return (
    <Marker
      position={position}
      eventHandlers={{
        add: (e) => {
          e.target.options.smoothFactor = 1;
        },
      }}
    />
  );
}

export function AddressDialog({ onSave }: AddressDialogProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<[number, number]>([
    12.9716, 77.5946,
  ]); // Default to Bangalore
  const [address, setAddress] = useState("");
  const [doorNumber, setDoorNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressType, setAddressType] = useState<"home" | "work" | "other">(
    "home"
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

  const handleSave = () => {
    onSave({
      fullAddress: address,
      doorNumber,
      landmark,
      type: addressType,
      coordinates: position,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Address</Button>
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
          <div className="h-[300px] w-full rounded-md overflow-hidden">
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
            </MapContainer>
          </div>

          <div className="space-y-2">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Input
              value={doorNumber}
              onChange={(e) => setDoorNumber(e.target.value)}
              placeholder="Door / Flat No."
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Input
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="Landmark"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              className={cn(
                "flex-1",
                addressType === "home" && "bg-primary text-primary-foreground"
              )}
              onClick={() => setAddressType("home")}
            >
              Home
            </Button>
            <Button
              variant="outline"
              className={cn(
                "flex-1",
                addressType === "work" && "bg-primary text-primary-foreground"
              )}
              onClick={() => setAddressType("work")}
            >
              Work
            </Button>
            <Button
              variant="outline"
              className={cn(
                "flex-1",
                addressType === "other" && "bg-primary text-primary-foreground"
              )}
              onClick={() => setAddressType("other")}
            >
              Other
            </Button>
          </div>

          <Button className="w-full" onClick={handleSave}>
            SAVE ADDRESS & PROCEED
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
