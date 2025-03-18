"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface LocationSearchProps {
  onLocationSelect: (location: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
  label: string;
  placeholder?: string;
}

export function LocationSearch({
  onLocationSelect,
  label,
  placeholder = "Search location...",
}: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load Google Maps Places API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();
            if (data.results[0]) {
              onLocationSelect({
                address: data.results[0].formatted_address,
                lat: latitude,
                lng: longitude,
              });
              setSearchQuery(data.results[0].formatted_address);
            }
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to get address from coordinates",
              variant: "destructive",
            });
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          toast({
            title: "Error",
            description: "Failed to get current location",
            variant: "destructive",
          });
          setIsLoading(false);
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 3) {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }

    setIsLoading(true);
    try {
      const service = new google.maps.places.AutocompleteService();
      const response = await service.getPlacePredictions({
        input: query,
        types: ["address"],
      });
      setPredictions(response.predictions);
      setShowPredictions(true);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = async (placeId: string) => {
    setIsLoading(true);
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ placeId });
      if (response.results[0]) {
        const location = response.results[0].geometry.location;
        onLocationSelect({
          address: response.results[0].formatted_address,
          lat: location.lat(),
          lng: location.lng(),
        });
        setSearchQuery(response.results[0].formatted_address);
        setShowPredictions(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get location details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Input
            ref={searchInputRef}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={placeholder}
            className="pr-10"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin" />
          )}
        </div>

        {showPredictions && predictions.length > 0 && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-background shadow-md">
            {predictions.map((prediction) => (
              <button
                key={prediction.place_id}
                className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-accent"
                onClick={() => handleSelectLocation(prediction.place_id)}
              >
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{prediction.description}</span>
              </button>
            ))}
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={getCurrentLocation}
          disabled={isLoading}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Use Current Location
        </Button>
      </CardContent>
    </Card>
  );
}
