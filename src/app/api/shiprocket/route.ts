import { NextResponse } from "next/server";

const SHIPROCKET_API_KEY = process.env.SHIPROCKET_API_KEY;
const SHIPROCKET_API_URL = "https://apiv2.shiprocket.in/v2";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pickup_address, delivery_address, items } = body;

    // Create shipment request
    const response = await fetch(`${SHIPROCKET_API_URL}/shipments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SHIPROCKET_API_KEY}`,
      },
      body: JSON.stringify({
        order_id: `order_${Date.now()}`,
        order_date: new Date().toISOString(),
        pickup_location: "Restaurant",
        channel_id: "2", // 2-wheeler delivery
        order_status: "confirmed",
        billing_customer_name: "Customer Name",
        billing_address: delivery_address,
        billing_city: "City",
        billing_pincode: "PIN",
        billing_state: "State",
        billing_country: "India",
        billing_email: "customer@example.com",
        billing_phone: "9999999999",
        shipping_is_billing: true,
        order_items: items.map((item: any) => ({
          name: item.name,
          sku: `SKU_${Date.now()}`,
          units: item.quantity,
          selling_price: item.price,
        })),
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating Shiprocket shipment:", error);
    return NextResponse.json(
      { error: "Failed to create shipment request" },
      { status: 500 }
    );
  }
}
