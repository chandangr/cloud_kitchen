"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const sortOptions = [
  "popularity",
  "rating",
  "costLowToHigh",
  "costHighToLow",
  "distance",
];

const FilterTabs: React.FC<MenuFilterProps> = ({
  categories,
  minPrice = 0,
  maxPrice = 1000,
}) => {
  const [selectedSort, setSelectedSort] = React.useState("popularity");
  const [selectedCuisines, setSelectedCuisines] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleCuisineChange = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  return (
    <Tabs defaultValue="sort-by">
      <TabsList>
        <TabsTrigger value="sort-by">Sort by</TabsTrigger>
        <TabsTrigger value="cuisines">Cuisines</TabsTrigger>
        <TabsTrigger value="rating">Rating</TabsTrigger>
        <TabsTrigger value="cost-for-two">Cost for two</TabsTrigger>
        <TabsTrigger value="more-filters">More Filters</TabsTrigger>
      </TabsList>

      <TabsContent value="sort-by">
        <div className="p-4">
          <h3 className="font-medium mb-2">Sort by</h3>
          <div className="flex flex-col">
            {sortOptions.map((sortOption) => (
              <label key={sortOption} className="flex items-center mb-2">
                <Input
                  type="radio"
                  name="sort"
                  value={sortOption}
                  className="w-5"
                  checked={selectedSort === sortOption}
                  onChange={() => setSelectedSort(sortOption)}
                />
                <span className="text-sm ml-2">
                  {sortOption
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </span>
              </label>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="cuisines">
        <h3 className="font-medium">Cuisines</h3>
        <Input
          type="text"
          placeholder="Search here"
          className="mb-4"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {categories
          .filter((category) =>
            category.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((category) => (
            <label key={category.title} className="block">
              <Checkbox
                checked={selectedCuisines.includes(category.title)}
                onChange={() => handleCuisineChange(category.title)}
                className="mr-2"
              />
              {category.title} ({category.count})
            </label>
          ))}
      </TabsContent>

      <TabsContent value="rating">
        <h3 className="font-medium">Rating</h3>
        <div className="flex items-center">
          <span className="mr-2">Any</span>
          <Input
            type="range"
            min="0"
            max="5"
            step="0.1"
            className="w-full"
            onChange={(e) => console.log(e.target.value)}
          />
          <span className="ml-2">5.0</span>
        </div>
      </TabsContent>

      <TabsContent value="cost-for-two">
        <h3 className="font-medium">Cost for two</h3>
        <div className="flex items-center">
          <span className="mr-2">₹</span>
          <Input
            type="number"
            placeholder="0"
            className="w-20"
            onChange={(e) => console.log(`Min: ₹${e.target.value}`)}
          />
          <span className="mx-2">-</span>
          <Input
            type="number"
            placeholder="Any"
            className="w-20"
            onChange={(e) => console.log(`Max: ₹${e.target.value}`)}
          />
        </div>
        <div className="mt-4">
          <label className="flex items-center">
            <Checkbox className="mr-2" />
            ₹500 - ₹1000
          </label>
        </div>
      </TabsContent>

      <TabsContent value="more-filters">
        <h3 className="font-medium">More Filters</h3>
        <Input
          type="text"
          placeholder="Search here"
          className="mb-4"
          onChange={(e) => console.log(`Search: ${e.target.value}`)}
        />
        <div className="flex flex-col">
          {[
            "Wheelchair Accessible",
            "Credit Card",
            "Buffet",
            "Happy hours",
            "Serves Alcohol",
            "Sunday Brunch",
            "Desserts and Bakes",
          ].map((filter) => (
            <label key={filter} className="flex items-center mb-2">
              <Checkbox className="mr-2" />
              {filter}
            </label>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FilterTabs;
