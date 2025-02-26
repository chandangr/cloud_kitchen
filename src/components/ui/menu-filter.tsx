"use client";

import * as React from "react";

interface MenuCategory {
  title: string;
  count: number;
}

interface MenuFilterProps {
  categories: MenuCategory[];
  minPrice?: number;
  maxPrice?: number;
}

export const MenuFilter: React.FC<MenuFilterProps> = ({
  categories,
  minPrice = 0,
  maxPrice = 1000,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Menu Categories</h2>
      <div className="mt-4">
        <label className="block text-sm">Min Price</label>
        <input type="number" value={minPrice} className="border rounded p-1" />
        <label className="block text-sm mt-2">Max Price</label>
        <input type="number" value={maxPrice} className="border rounded p-1" />
      </div>
      <ul className="mt-2">
        {categories.map((category) => (
          <li key={category.title} className="flex justify-between py-1">
            <span>{category.title}</span>
            <span className="text-gray-500">{category.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
