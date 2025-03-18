"use client";

import { DeliveryService } from "@/components/delivery-service";
import { DeliveryTracking } from "@/components/delivery-tracking";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = async (orderData: {
    amount: number;
    currency: string;
  }) => {
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const initializeRazorpayPayment = async () => {
    try {
      setIsLoading(true);

      const orderData = {
        amount: 85300, // Amount in paise (₹853)
        currency: "INR",
      };

      // Create order first
      const order = await createOrder(orderData);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Cloud Kitchen",
        description: "Food Order Payment",
        order_id: order.id, // Use the order ID from the API response
        handler: async (response: RazorpayResponse) => {
          try {
            // Verify payment
            const verificationResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verificationResponse.ok) {
              throw new Error("Payment verification failed");
            }

            // If verification successful, redirect to success page
            router.push("/payment-success");
          } catch (error) {
            console.error("Payment verification failed:", error);
            // Handle payment verification failure
            // You might want to show an error message to the user
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#EF4444",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initialization failed:", error);
      // Handle order creation failure
      // You might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Payment Options</h1>
        <div className="mt-2 flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            1 item
          </Badge>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm font-medium">₹853</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-primary">Savings of ₹50</span>
        </div>
        <p className="mt-2 text-sm text-primary">
          Save upto ₹171 more with payment offers
        </p>
      </div>

      <div className="space-y-4">
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="text-xl text-primary">
              Pay with Razorpay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={initializeRazorpayPayment}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Pay with Razorpay"
              )}
            </Button>
          </CardContent>
        </Card>

        <Button
          onClick={handleBackToCheckout}
          variant="outline"
          className="w-full"
        >
          Back to Checkout
        </Button>
      </div>

      <DeliveryService
        orderId="order_123"
        items={[
          { name: "Item 1", quantity: 1, price: 100 },
          { name: "Item 2", quantity: 2, price: 200 },
        ]}
        customerAddress="Customer's delivery address"
        restaurantAddress="Restaurant's pickup address"
      />

      <DeliveryTracking deliveryId="porter_delivery_id" />
    </div>
  );
};

export default PaymentPage;
