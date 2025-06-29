"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRestaurantByID, getRestaurantMenuItems, MenuItem, MenuItemsResult } from "@/services/websiteBuilderService";

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
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const partnerId = params.partner_id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [restaurantData, menuData] = await Promise.all([
          getRestaurantByID(partnerId),
          getRestaurantMenuItems(partnerId)
        ]);
        
        setRestaurant(restaurantData);
        setMenuItems(menuData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (partnerId) {
      fetchData();
    }
  }, [partnerId]);

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

  if (loading) {
    return (
      <div className="container mx-auto px-[10%] py-[2%] space-y-6">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto px-[10%] py-[2%] space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Restaurant not found</h1>
          <p className="text-muted-foreground">The restaurant you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-[10%] py-[2%] space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{restaurant.website_name || "Restaurant"}</h1>

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
                <span>{restaurant.location || "Basavanagudi"}</span>
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
            <h3 className="text-lg font-semibold">Recommended ({menuItems.length})</h3>
          </div>

          {menuItems
            .filter((product) =>
              product.dish_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.dish_recipe?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
            <Card
              key={product.id}
              className="flex justify-between p-4"
            >
              <div className="space-y-2">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Bestseller
                </Badge>
                <h4 className="font-semibold">{product.dish_name}</h4>
                <div className="flex items-center gap-2">
                  <span>₹{product.dish_price}</span>
                  <Badge variant="outline" className="text-sm">
                    60% OFF USE STEALDEAL
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.dish_recipe}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src={product.dish_image || "https://via.placeholder.com/96x96?text=No+Image"}
                  alt={product.dish_name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                {getItemQuantity(product.dish_name) > 0 ? (
                  <div className="flex items-center gap-2 border rounded-lg overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none hover:bg-secondary"
                      onClick={() =>
                        removeFromCart(
                          product.dish_name,
                          product.dish_price
                        )
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {getItemQuantity(product.dish_name)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none hover:bg-secondary"
                      onClick={() => addToCart({
                        productName: product.dish_name,
                        productPrice: product.dish_price
                      })}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => addToCart({
                      productName: product.dish_name,
                      productPrice: product.dish_price
                    })}
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
