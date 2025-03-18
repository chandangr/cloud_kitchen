"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { LocationSearch } from "./location-search";

interface DeliveryServiceProps {
  orderId: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

interface Location {
  address: string;
  lat: number;
  lng: number;
}

export function DeliveryService({ orderId, items }: DeliveryServiceProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState<Location | null>(
    null
  );
  const { toast } = useToast();

  const handleShiprocketDelivery = async () => {
    if (!deliveryLocation) {
      toast({
        title: "Error",
        description: "Please select delivery location",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/shiprocket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          delivery_address: deliveryLocation.address,
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create shipment request");
      }

      toast({
        title: "Shipment Created",
        description: "Your order is being processed for delivery.",
      });
    } catch (error) {
      console.error("Error creating shipment request:", error);
      toast({
        title: "Error",
        description: "Failed to create shipment request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Service</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Order ID</Label>
          <Input value={orderId} readOnly />
        </div>

        <LocationSearch
          label="Delivery Location"
          placeholder="Enter delivery address"
          onLocationSelect={setDeliveryLocation}
        />

        <div className="space-y-2">
          <Label>Items</Label>
          <div className="space-y-1">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <span>{item.name}</span>
                <span className="text-muted-foreground">
                  {item.quantity} x ₹{item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleShiprocketDelivery}
          className="w-full"
          disabled={isLoading || !deliveryLocation}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Shipment...
            </>
          ) : (
            "Request 2-Wheeler Delivery"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
