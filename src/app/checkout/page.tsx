"use client";

import { AddressDialog } from "@/components/address-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MapPin, Minus, Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [suggestions, setSuggestions] = useState("");

  useEffect(() => {
    const items = searchParams
      .getAll("items[]")
      .map((item) => JSON.parse(item));
    setCartItems(items);
  }, [searchParams]);

  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 43;
  const platformFee = 10;
  const discount = 25;
  const gstCharges = Number((itemTotal * 0.05).toFixed(2));
  const total = itemTotal + deliveryFee + platformFee - discount + gstCharges;

  const handleAddressSelect = (address: any) => {
    setSelectedAddress(address.fullAddress);
  };

  const handlePayment = async () => {
    try {
      // Create Razorpay order
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
        }),
      });

      const data = await response.json();

      if (!data.orderId) {
        throw new Error("Error creating payment order");
      }

      // Initialize Razorpay payment
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Cloud Kitchen",
        description: "Food Order Payment",
        order_id: data.orderId,
        handler: function (response: any) {
          // Handle successful payment
          console.log("Payment successful:", response);
          // You can redirect to success page or show success message
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#00B1A9",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      // Handle payment error (show error message)
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div className="container mx-auto py-8">
        <div className="flex gap-8">
          {/* Left Section - Delivery Address & Payment */}
          <div className="flex-1 space-y-6">
            {/* Delivery Address Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <CardTitle>Delivery address</CardTitle>
                </div>
                {selectedAddress && (
                  <Button variant="ghost" className="text-primary">
                    CHANGE
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {selectedAddress ? (
                  <div className="space-y-2">
                    <div className="font-medium">Home</div>
                    <p className="text-sm text-muted-foreground">
                      {selectedAddress}
                    </p>
                    <div className="text-sm text-muted-foreground">44 MINS</div>
                  </div>
                ) : (
                  <AddressDialog onSave={handleAddressSelect} />
                )}
              </CardContent>
            </Card>

            {/* Choose Payment Method Section */}
            <Card>
              <CardHeader>
                <CardTitle>Choose payment method</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handlePayment}
                  className="w-full bg-[#00B1A9] hover:bg-[#009d96]"
                >
                  PROCEED TO PAY
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Order Summary */}
          <div className="w-[400px] space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Cafe Amudham</CardTitle>
                <span className="text-sm text-muted-foreground">Jayanagar</span>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cart Items */}
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        ⬤
                      </Badge>
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex items-center gap-2">
                        <span>₹{item.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 border rounded-lg overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Suggestions Input */}
                <div className="space-y-2">
                  <Input
                    placeholder="Any suggestions? We will pass it on..."
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                  />
                </div>

                {/* No-contact Delivery Option */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="no-contact"
                      className="rounded"
                    />
                    <Label htmlFor="no-contact">
                      Opt in for No-contact Delivery
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Unwell, or avoiding contact? Please select no-contact
                    delivery. Partner will safely place the order outside your
                    door (not for COD)
                  </p>
                </div>

                <Separator />

                {/* Bill Details */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Bill Details</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Item Total</span>
                      <span>₹{itemTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee | 4.0 kms</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Extra discount for you</span>
                      <span>- ₹{discount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform fee</span>
                      <span>₹{platformFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST and Restaurant Charges</span>
                      <span>₹{gstCharges}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between font-semibold">
                  <span>TO PAY</span>
                  <span>₹{total}</span>
                </div>

                <div className="bg-green-50 p-3 rounded-md text-sm text-green-700">
                  Savings of ₹{discount}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
