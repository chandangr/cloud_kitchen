"use client";

import { Card02 } from "@/components/card-02/card-02";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";
import { useState } from "react";

const cardData = [
  {
    id: 1,
    title: "Pizza",
    titleOwner: "Cloud Kitchen Owner",
    description: "Delicious cheese pizza",
    imageUrl: "/images/pizza.jpg",
  },
  {
    id: 2,
    title: "Burger",
    titleOwner: "Cloud Kitchen Owner",
    description: "Juicy beef burger",
    imageUrl: "/images/burger.jpg",
  },
  {
    id: 3,
    title: "Sushi",
    titleOwner: "Sushi Master",
    description: "Fresh sushi rolls",
    imageUrl: "/images/sushi.jpg",
  },
  {
    id: 4,
    title: "Pasta",
    titleOwner: "Italian Chef",
    description: "Creamy Alfredo pasta",
    imageUrl: "/images/pasta.jpg",
  },
  {
    id: 5,
    title: "Salad",
    titleOwner: "Health Guru",
    description: "Fresh garden salad",
    imageUrl: "/images/salad.jpg",
  },
  {
    id: 6,
    title: "Tacos",
    titleOwner: "Mexican Chef",
    description: "Spicy beef tacos",
    imageUrl: "/images/tacos.jpg",
  },
  {
    id: 7,
    title: "Steak",
    titleOwner: "Grill Master",
    description: "Juicy grilled steak",
    imageUrl: "/images/steak.jpg",
  },
  {
    id: 8,
    title: "Ice Cream",
    titleOwner: "Dessert Specialist",
    description: "Creamy vanilla ice cream",
    imageUrl: "/images/ice-cream.jpg",
  },
  {
    id: 9,
    title: "Cupcakes",
    titleOwner: "Baker Extraordinaire",
    description: "Delicious chocolate cupcakes",
    imageUrl: "/images/cupcakes.jpg",
  },
  {
    id: 10,
    title: "Sandwich",
    titleOwner: "Deli Owner",
    description: "Classic club sandwich",
    imageUrl: "/images/sandwich.jpg",
  },
  {
    id: 11,
    title: "Donuts",
    titleOwner: "Pastry Chef",
    description: "Glazed donuts",
    imageUrl: "/images/donuts.jpg",
  },
  {
    id: 12,
    title: "Fried Rice",
    titleOwner: "Asian Cuisine Expert",
    description: "Savory fried rice",
    imageUrl: "/images/fried-rice.jpg",
  },
  {
    id: 13,
    title: "Quiche",
    titleOwner: "French Chef",
    description: "Delicious quiche",
    imageUrl: "/images/quiche.jpg",
  },
  {
    id: 14,
    title: "Burrito",
    titleOwner: "Mexican Chef",
    description: "Loaded burrito",
    imageUrl: "/images/burrito.jpg",
  },
  {
    id: 15,
    title: "Pancakes",
    titleOwner: "Breakfast Specialist",
    description: "Fluffy pancakes",
    imageUrl: "/images/pancakes.jpg",
  },
  {
    id: 16,
    title: "Waffles",
    titleOwner: "Breakfast Specialist",
    description: "Crispy waffles",
    imageUrl: "/images/waffles.jpg",
  },
  {
    id: 17,
    title: "Chili",
    titleOwner: "Spicy Food Lover",
    description: "Hearty chili",
    imageUrl: "/images/chili.jpg",
  },
  {
    id: 18,
    title: "Baguette",
    titleOwner: "French Baker",
    description: "Freshly baked baguette",
    imageUrl: "/images/baguette.jpg",
  },
  {
    id: 19,
    title: "Cheesecake",
    titleOwner: "Dessert Specialist",
    description: "Rich cheesecake",
    imageUrl: "/images/cheesecake.jpg",
  },
  {
    id: 20,
    title: "Fruit Tart",
    titleOwner: "Pastry Chef",
    description: "Colorful fruit tart",
    imageUrl: "/images/fruit-tart.jpg",
  },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCards = cardData.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <input
          type="text"
          placeholder="Search Cloud Kitchen Owner, food name, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border rounded"
        />

        <div className="flex flex-wrap gap-4 m-3">
          {filteredCards.map((card) => (
            <Link href={`/pdp/${card.id}`} key={card.id}>
              <Card02
                key={card.id}
                title={card.title}
                description={card.description}
                titleOwner={card.titleOwner}
                className="ml-10"
              />
            </Link>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
