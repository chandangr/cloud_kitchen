"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useParams } from "next/navigation";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data for demonstration; replace with actual data fetching logic
  const itemDetails = {
    1: {
      title: "Peri Peri Paneer & Channa Salad",
      description:
        "A delicious salad with paneer and channa, topped with fresh vegetables.",
      price: 320,
      imageUrl:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2560&auto=format&fit=crop",
    },
    2: {
      title: "Crunchy Falafel & Sweet Corn Salad",
      description:
        "A crunchy salad with falafel and sweet corn, drizzled with a tangy dressing.",
      price: 320,
      imageUrl:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2560&auto=format&fit=crop",
    },
    // Add more items as needed
  }[id];

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>{itemDetails?.[id]?.title}</CardTitle>
          <CardDescription>{itemDetails?.[id]?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2560&auto=format&fit=crop"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="Modern cloud kitchen facility"
          />
          <p className="mt-4 text-lg font-bold">
            Price: ₹{itemDetails?.[id]?.price}
          </p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Add to Cart
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
