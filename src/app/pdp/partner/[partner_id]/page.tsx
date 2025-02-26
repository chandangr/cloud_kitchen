"use client";

import CheckoutModal from "@/components/checkout-modal/checkout-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useParams, useRouter } from "next/navigation";
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

const PartnerPage = () => {
  const { partner_id } = useParams<{ partner_id: string }>();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isVeg, setIsVeg] = useState(true); // State for Veg/Non-Veg filter
  const [cartItems, setCartItems] = useState<
    { productName: string; productPrice: number }[]
  >([]);

  const filteredProducts = productList.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: {
    productName: string;
    productPrice: number;
  }) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.productPrice,
    0
  );

  const handleCheckout = () => {
    const queryParams = new URLSearchParams();
    queryParams.append("items[]", JSON.stringify(cartItems));
    queryParams.append("totalPrice", totalPrice.toString());
    router.push(`/checkout?${queryParams.toString()}`);
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h2 className="text-lg font-semibold">Menu Categories</h2>
        </SidebarHeader>
        <SidebarContent>
          <Input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <div className="flex items-center mb-4">
            <label className="mr-2">Veg</label>
            <input
              type="checkbox"
              checked={isVeg}
              onChange={() => setIsVeg(!isVeg)}
            />
            <label className="ml-4 mr-2">Non-Veg</label>
            <input
              type="checkbox"
              checked={!isVeg}
              onChange={() => setIsVeg(!isVeg)}
            />
          </div>
          <h3 className="text-md font-semibold">Categories</h3>
          <ul>
            <li>Salads</li>
            <li>Bowls</li>
            <li>Smoothies</li>
            <li>Cold Press Juice</li>
            <li>Subscription</li>
          </ul>
        </SidebarContent>
        <SidebarFooter>
          <Button className="w-full" onClick={handleCheckout}>
            Checkout
          </Button>
        </SidebarFooter>
      </Sidebar>
      <div className="p-4 flex-1 flex">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">
            Salads for Partner {partner_id}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.productName} className="shadow-lg">
                <CardHeader>
                  <CardTitle>{product.productName}</CardTitle>
                  <CardDescription>
                    {product.productDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <p className="mt-2 text-lg font-bold">
                    ₹{product.productPrice}
                  </p>
                  <Button
                    className="mt-4 w-full"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <CheckoutModal
          cartItems={cartItems}
          totalPrice={totalPrice}
          onCheckout={handleCheckout}
        />
      </div>
    </SidebarProvider>
  );
};

export default PartnerPage;
