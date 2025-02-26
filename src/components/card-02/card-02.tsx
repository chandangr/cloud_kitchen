"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Card02Props {
  title: string;
  description: string;
  imageUrl?: string;
  titleOwner: string;
  imageOwner?: string;
  className?: string;
}

export function Card02({
  title,
  description,
  titleOwner,
  className,
}: Card02Props) {
  return (
    <div className={`max-w-xs w-full group/card ${className}`}>
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          "bg-[url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2560&auto=format&fit=crop)] bg-cover"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          <Image
            height="100"
            width="100"
            alt="Avatar"
            src="/manu.png"
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              {titleOwner}
            </p>
          </div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {title}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
