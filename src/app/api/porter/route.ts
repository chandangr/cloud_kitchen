import { NextResponse } from "next/server";

const PORTER_API_KEY = process.env.PORTER_API_KEY;
const PORTER_API_URL = "https://api.porter.in/v1";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pickup_address, delivery_address, items } = body;

    // Create delivery request
    const response = await fetch(`${PORTER_API_URL}/delivery/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PORTER_API_KEY}`,
      },
      body: JSON.stringify({
        pickup: {
          address: pickup_address,
          contact: {
            name: "Restaurant Name",
            phone: "9999999999",
          },
        },
        delivery: {
          address: delivery_address,
          contact: {
            name: "Customer Name",
            phone: "9999999999",
          },
        },
        items,
        vehicle_type: "bike",
        payment_mode: "cod",
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating Porter delivery:", error);
    return NextResponse.json(
      { error: "Failed to create delivery request" },
      { status: 500 }
    );
  }
}
