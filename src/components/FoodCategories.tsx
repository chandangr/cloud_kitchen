"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

const foodCategories = [
  { name: "Idli", image: "/images/idli.png" },
  { name: "Dosa", image: "/images/dosa.png" },
  { name: "Biryani", image: "/images/biryani.png" },
  { name: "Puttu", image: "/images/puttu.png" },
  { name: "Cake", image: "/images/cake.png" },
  { name: "Chole Bhature", image: "/images/chole-bhature.png" },
  { name: "Pancake", image: "/images/pancake.png" },
  { name: "Paratha", image: "/images/paratha.png" },
  { name: "Pure Veg", image: "/images/pure-veg.png" },
  { name: "Salad", image: "/images/salad.png" },
  { name: "Parotta", image: "/images/parotta.png" },
  { name: "Vada", image: "/images/vada.png" },
  { name: "Pongal", image: "/images/pongal.png" },
  { name: "Poori", image: "/images/poori.png" },
  { name: "Shake", image: "/images/shake.png" },
  { name: "Coffee", image: "/images/coffee.png" },
];

export function FoodCategories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full py-4">
      {/* Scroll Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background shadow-md"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background shadow-md"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide px-8"
      >
        {foodCategories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center space-y-2"
          >
            <Card className="relative h-24 w-24 overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                width={96}
                height={96}
                className="h-full w-full object-cover transition-transform hover:scale-110"
              />
            </Card>
            <span className="text-sm font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 