"use client";

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
              <img
                src={category.image}
                alt={category.name}
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

export function HeroSection() {
  return (
    <div className="relative p">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-black">
        {/* Left side decorative image */}
        <div className="absolute left-0 bottom-0 w-1/4">
          <img
            src="/images/vegetables.png"
            alt="Vegetables"
            className="w-full object-contain"
          />
        </div>
        {/* Right side decorative image */}
        <div className="absolute right-0 bottom-0 w-1/4">
          <img
            src="/images/sushi.png"
            alt="Sushi"
            className="w-full object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" className="h-8" />
            <span className="text-white text-2xl font-bold">Cloud Kitchen</span>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" className="text-white hover:text-white/80">
              Clould Kitchen Corporate
            </Button>
            <Button variant="ghost" className="text-white hover:text-white/80">
              Partner with us
            </Button>
            <Button variant="ghost" className="text-white hover:text-white/80">
              Get the App
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="py-20">
          <h1 className="text-white text-5xl font-bold text-center mb-6">
            Order food & groceries. Discover
            <br />
            best restaurants. order it!
          </h1>

          {/* Search Section */}
          <div className="max-w-3xl mx-auto flex gap-4">
            {/* Location Selector */}
            <div className="flex-1 max-w-xs bg-white rounded-lg flex items-center px-4 py-2 cursor-pointer hover:shadow-md transition-shadow">
              <MapPin className="h-5 w-5 text-gray-500 mr-2" />
              <span className="flex-1 truncate">T R Nagar, #60/55 Ga...</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>

            {/* Search Input */}
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search for restaurant, item or more"
                className="w-full pl-10 py-6 bg-white"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
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
