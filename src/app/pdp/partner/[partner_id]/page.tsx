"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const productList = [
  {
    productName: "Peri Peri Paneer & Channa Salad (Medium)",
    productImage:
      "https://assets.limetray.com/assets/user_images/menus/compressed/1738739762_1736262375PeriPeriPaneerChannaSalad.jpg",
    productDescription:
      "A flavorful mix of black channa, fresh lettuce, purple cabbage, carrot, zucchini, bell peppers, and paneer, drizzled with a zesty chili lemon honey dressing.",
    productPrice: 320,
  },
  {
    productName: "Crunchy Falafel & Sweet Corn Salad (Medium)",
    productImage:
      "https://assets.limetray.com/assets/user_images/menus/compressed/1738739783_1736262398CrunchyFalafelSweetCornSalad.jpg",
    productDescription:
      "Air-fried falafel paired with fresh lettuce, capsicum, cucumber, cherry tomatoes, and sweet corn, drizzled with creamy tahini dressing.",
    productPrice: 320,
  },
  {
    productName: "Zesty Mushroom Salad (Medium)",
    productImage:
      "https://assets.limetray.com/assets/user_images/menus/compressed/1738739802_1736262427ZestyMushroomSalad.jpg",
    productDescription:
      "A vibrant mix of mushrooms, carrot, capsicum, cucumber, onions and lettuce, topped with roasted peanuts and tossed in a 'Garlic-Soy Honey Citrus' dressing.",
    productPrice: 290,
  },
  {
    productName: "Rainbow Harvest Salad (Medium)",
    productImage:
      "https://assets.limetray.com/assets/user_images/menus/compressed/1738739820_1736262454RainbowHarvestSalad.jpg",
    productDescription:
      "A colorful medley of broccoli, bell peppers, zucchini, sweet corn, iceberg lettuce, purple cabbage, and carrot, perfectly complemented by a tangy yogurt dressing for a burst of freshness.",
    productPrice: 270,
  },
];

export default function PartnerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<{
    items: Array<{
      name: string;
      price: number;
      quantity: number;
    }>;
    total: number;
  }>({
    items: [],
    total: 0,
  });
  const router = useRouter();

  const addToCart = (product: {
    productName: string;
    productPrice: number;
  }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.name === product.productName
      );

      if (existingItem) {
        return {
          items: prevCart.items.map((item) =>
            item.name === product.productName
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: prevCart.total + product.productPrice,
        };
      }

      return {
        items: [
          ...prevCart.items,
          {
            name: product.productName,
            price: product.productPrice,
            quantity: 1,
          },
        ],
        total: prevCart.total + product.productPrice,
      };
    });
  };

  const removeFromCart = (productName: string, price: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.name === productName
      );

      if (existingItem && existingItem.quantity > 1) {
        return {
          items: prevCart.items.map((item) =>
            item.name === productName
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
          total: prevCart.total - price,
        };
      }

      return {
        items: prevCart.items.filter((item) => item.name !== productName),
        total: prevCart.total - price,
      };
    });
  };

  const getItemQuantity = (productName: string) => {
    const item = cart.items.find((item) => item.name === productName);
    return item?.quantity || 0;
  };

  const handleViewCart = () => {
    const queryParams = new URLSearchParams();
    cart.items.forEach((item) => {
      queryParams.append("items[]", JSON.stringify(item));
    });
    router.push(`/checkout?${queryParams.toString()}`);
  };

  return (
    <div className="container mx-auto p-4 space-y-6 pb-24">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Burger King</h1>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                <Star className="w-4 h-4 mr-1" />
                4.3 (33K+ ratings)
              </Badge>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">₹350 for two</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Basavanagudi</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>25-30 mins</span>
              </div>
            </div>

            <Badge
              variant="outline"
              className="bg-red-50 text-red-500 border-red-200"
            >
              Free delivery on orders above ₹199
            </Badge>
          </CardContent>
        </Card>

        {/* Deals Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Deals for you</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            <Card className="min-w-[300px]">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">SAVE</Badge>
                  <div>
                    <h3 className="font-semibold">Extra ₹25 Off</h3>
                    <p className="text-sm text-muted-foreground">
                      APPLICABLE OVER & ABOVE COUPONS
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="min-w-[300px]">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800"
                  >
                    DEAL OF DAY
                  </Badge>
                  <div>
                    <h3 className="font-semibold">60% Off Upto ₹120</h3>
                    <p className="text-sm text-muted-foreground">
                      USE STEALDEAL
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Menu Section */}
        <Separator className="my-6" />
        <div className="text-center">
          <h2 className="text-lg font-semibold">MENU</h2>
        </div>

        {/* Search Section */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for dishes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-secondary"
          />
        </div>

        {/* Filter Tags */}
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer">
            Veg
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Non-veg
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Bestseller
          </Badge>
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recommended (16)</h3>
          </div>

          {productList.map((product) => (
            <Card
              key={product.productName}
              className="flex justify-between p-4"
            >
              <div className="space-y-2">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Bestseller
                </Badge>
                <h4 className="font-semibold">{product.productName}</h4>
                <div className="flex items-center gap-2">
                  <span>₹{product.productPrice}</span>
                  <Badge variant="outline" className="text-sm">
                    60% OFF USE STEALDEAL
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.productDescription}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-24 h-24 object-cover rounded-md"
                />
                {getItemQuantity(product.productName) > 0 ? (
                  <div className="flex items-center gap-2 border rounded-lg overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none hover:bg-secondary"
                      onClick={() =>
                        removeFromCart(
                          product.productName,
                          product.productPrice
                        )
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {getItemQuantity(product.productName)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none hover:bg-secondary"
                      onClick={() => addToCart(product)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => addToCart(product)}
                  >
                    ADD
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Cart Summary - Fixed at Bottom */}
        {cart.items.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
            <div className="container mx-auto p-4">
              <div
                className="flex items-center justify-between bg-primary text-primary-foreground rounded-lg p-4 cursor-pointer"
                onClick={handleViewCart}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span>
                      {cart.items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                      item{cart.items.length !== 1 ? "s" : ""}
                    </span>
                    <span>•</span>
                    <span>₹{cart.total}</span>
                  </div>
                  {cart.total < 199 && (
                    <Badge
                      variant="outline"
                      className="bg-background/10 text-primary-foreground border-primary-foreground"
                    >
                      Add ₹{199 - cart.total} for free delivery
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span>VIEW CART</span>
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
