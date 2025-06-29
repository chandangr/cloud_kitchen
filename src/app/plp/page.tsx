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
import { getAllRestaurants, RestaurantData } from "@/services/websiteBuilderService";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function PLPPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.website_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg";

  if (loading) {
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
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading restaurants...</div>
          </div>
        </div>
      </main>
    );
  }

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
                <CardTitle>{restaurant.website_name}</CardTitle>
                <CardDescription className="line-clamp-2 overflow-hidden text-ellipsis">{restaurant.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={restaurant.website_logo || defaultImageUrl}
                  alt={restaurant.website_name}
                  width={400}
                  height={160}
                  className="w-full h-40 object-cover rounded-md"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">₹1,500 for two</span>
                  <span className="text-green-600">Flat 20% OFF</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm">Rating: 4.2</span>
                  <span className="text-sm">5.6 km</span>
                </div>
                <Button
                  className="mt-4 w-full"
                  onClick={() => router.push(`/pdp/partner/${restaurant.user_id}`)}
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
