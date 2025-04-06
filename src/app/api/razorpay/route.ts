import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount } = body;

    const options = {
      amount: Math.round(10 * 100), // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      name: "Cloud Kitchen",
      description: "Food Order Payment",
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#EF4444",
      },
      handler: async (response) => {
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

          console.log(
            "Payment verification successful:",
            verificationResponse,
            order
          );
        } catch (error) {
          console.error("Payment verification failed:", error);
          // Handle payment verification failure
          // You might want to show an error message to the user
        }
      },
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Error creating payment order" },
      { status: 500 }
    );
  }
}
