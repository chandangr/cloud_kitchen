
const PORTER_API_KEY = process.env.PORTER_API_KEY;
const PORTER_API_URL = "https://api.porter.in/v1";

// export async function GET(
//   request: Request,
//   { params }: { params: { deliveryId: string } }
// ) {
//   try {
//     const response = await fetch(
//       `${PORTER_API_URL}/delivery/tracking/${params.deliveryId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${PORTER_API_KEY}`,
//         },
//       }
//     );

//     const data = await response.json();

//     // Transform Porter API response to our format
//     const status = {
//       status: data.status,
//       progress: calculateProgress(data.status),
//       estimatedTime: data.estimated_delivery_time,
//       driverName: data.driver?.name,
//       driverPhone: data.driver?.phone,
//     };

//     return NextResponse.json(status);
//   } catch (error) {
//     console.error("Error fetching delivery status:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch delivery status" },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {}

function calculateProgress(status: string): number {
  switch (status.toLowerCase()) {
    case "accepted":
      return 20;
    case "picked_up":
      return 50;
    case "in_transit":
      return 75;
    case "delivered":
      return 100;
    default:
      return 0;
  }
}
