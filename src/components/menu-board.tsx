"use client";

import { MenuItem } from "@/services/websiteBuilderService";
import Image from "next/image";

interface MenuBoardProps {
  height: string;
  className?: string;
  menuItems?: MenuItem[];
}

export function MenuBoard({ height, className, menuItems = [] }: MenuBoardProps) {
  // Show loading state if no menu items
  if (!menuItems || menuItems.length === 0) {
    return (
      <div
        className={`bg-white rounded-lg shadow-lg p-6 overflow-y-auto ${className}`}
        style={{ height }}
      >
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow animate-pulse"
            >
              <div className="aspect-square bg-gray-200 rounded-lg mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-200 rounded mb-2" />
              <div className="h-5 bg-gray-200 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 overflow-y-auto ${className}`}
      style={{ height }}
    >
      <div className="grid grid-cols-2 gap-4">
        {menuItems.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="aspect-square bg-gray-200 rounded-lg mb-2 overflow-hidden">
              {item.dish_image ? (
                <Image
                  src={item.dish_image}
                  alt={item.dish_name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-sm truncate">{item.dish_name}</h3>
            <p className="text-xs text-gray-600 line-clamp-2">
              {item.dish_recipe || "Delicious dish description"}
            </p>
            <p className="text-lg font-bold mt-2">₹{item.dish_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 