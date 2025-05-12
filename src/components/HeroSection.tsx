import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, MapPin, Search, User } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="relative p">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-black">
        {/* Left side decorative image */}
        <div className="absolute left-0 bottom-0 w-1/4">
          <Image
            src="/images/vegetables.png"
            alt="Vegetables"
            width={500}
            height={500}
            className="w-full object-contain"
          />
        </div>
        {/* Right side decorative image */}
        <div className="absolute right-0 bottom-0 w-1/4">
          <Image
            src="/images/sushi.png"
            alt="Sushi"
            width={500}
            height={500}
            className="w-full object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} className="h-8" />
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