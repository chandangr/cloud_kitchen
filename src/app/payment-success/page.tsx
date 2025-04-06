"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Clock, MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // You can pass these as URL params when redirecting to this page
  const orderId = searchParams.get("orderId") || "#123456";
  const amount = searchParams.get("amount") || "853";
  const estimatedTime = "45-50 mins";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500 animate-bounce" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            Payment Successful!
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Your order has been confirmed and is being processed
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Details */}
          <div className="bg-green-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Order ID</span>
              <Badge variant="secondary">{orderId}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Amount Paid</span>
              <span className="font-semibold">₹{amount}</span>
            </div>
          </div>

          <Separator />

          {/* Delivery Estimate */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>Estimated Delivery Time</span>
            </div>
            <div className="font-semibold text-lg">{estimatedTime}</div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>Delivery Address</span>
            </div>
            <p className="text-sm text-gray-600">
              {searchParams.get("address") || "Your saved delivery address"}
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              onClick={() => router.push("/orders")}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Track Order
            </Button>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
