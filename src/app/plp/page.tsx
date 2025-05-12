"use client";

import { FoodCategories } from "@/components/FoodCategories";
import { HeroSection } from "@/components/HeroSection";
import { NavigationMenuBar } from "@/components/molecules/NavigationMenuBar/NavigationMenuBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import FilterTabs from "@/components/ui/menu-filter";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const restaurants = [
  {
    id: 1,
    name: "The Black Pearl",
    description: "Continental, Salad",
    price: "₹1,500 for two",
    rating: 4.2,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    distance: "6.4 km",
    offer: "Flat 20% OFF",
  },
  {
    id: 2,
    name: "Maya",
    description: "Asian, North Indian",
    price: "₹1,500 for two",
    rating: 4.4,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    distance: "5.6 km",
    offer: "Flat 15% OFF",
  },
  {
    id: 3,
    name: "Maddy's Resto Pub",
    description: "North Indian, Continental",
    price: "₹1,000 for two",
    rating: 4.2,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    distance: "4.3 km",
    offer: "Flat 45% OFF",
  },
  {
    id: 4,
    name: "The Black Pearl",
    description: "Continental, Salad",
    price: "₹1,500 for two",
    rating: 4.2,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    distance: "6.4 km",
    offer: "Flat 20% OFF",
  },
  {
    id: 5,
    name: "Maya",
    description: "Asian, North Indian",
    price: "₹1,500 for two",
    rating: 4.4,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    distance: "5.6 km",
    offer: "Flat 15% OFF",
  },
  {
    id: 6,
    name: "Maddy's Resto Pub",
    description: "North Indian, Continental",
    price: "₹1,000 for two",
    rating: 4.2,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    distance: "4.3 km",
    offer: "Flat 45% OFF",
  },
  {
    id: 7,
    name: "The Black Pearl",
    description: "Continental, Salad",
    price: "₹1,500 for two",
    rating: 4.2,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    distance: "6.4 km",
    offer: "Flat 20% OFF",
  },
  {
    id: 8,
    name: "Maya",
    description: "Asian, North Indian",
    price: "₹1,500 for two",
    rating: 4.4,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    distance: "5.6 km",
    offer: "Flat 15% OFF",
  },
];

export default function PLPPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <HeroSection />
      <div className="px-[200px] py-[10px]">
        <NavigationMenuBar />

        <div className="container mx-auto">
          <FoodCategories />
        </div>
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Restaurants in Bengaluru</h1>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <Button onClick={() => setIsDialogOpen(true)}>Filters</Button>
          <Button variant="outline">Offers</Button>
          <Button variant="outline">Rating: 4.5+</Button>
          <Button variant="outline">Pet Friendly</Button>
          <Button variant="outline">Outdoor Seating</Button>
          <Button variant="outline">Serves Alcohol</Button>
          <Button variant="outline">Open Now</Button>
        </div>
        <Input
          type="text"
          placeholder="Search for restaurant, cuisine or a dish"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-4 mb-4"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="shadow-lg">
              <CardHeader>
                <CardTitle>{restaurant.name}</CardTitle>
                <CardDescription>{restaurant.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">{restaurant.price}</span>
                  <span className="text-green-600">{restaurant.offer}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm">Rating: {restaurant.rating}</span>
                  <span className="text-sm">{restaurant.distance}</span>
                </div>
                <Button
                  className="mt-4 w-full"
                  onClick={() => router.push(`/pdp/partner/${restaurant.id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Filters</DialogTitle>
              </DialogHeader>
              <FilterTabs
                categories={[
                  { title: "Offers", count: 5 },
                  { title: "Rating: 4.5+", count: 10 },
                  { title: "Pet Friendly", count: 3 },
                  { title: "Outdoor Seating", count: 4 },
                  { title: "Serves Alcohol", count: 6 },
                  { title: "Open Now", count: 8 },
                ]}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </main>
  );
}
