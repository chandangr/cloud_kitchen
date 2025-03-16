"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProductDetailPage = () => {
  return (
    <div className="p-4">
      {/* Hero Section */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white p-4">
          <h1 className="text-4xl font-bold">Board 4 Bored</h1>
          <p className="text-lg">Chinese, Fast Food</p>
        </div>
      </div>

      {/* Offers Section */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Flat 20% Off on Weekdays</CardTitle>
            </CardHeader>
            <CardContent>
              <p>₹320 guest</p>
              <p>Pre-book offer: One exclusive with 1 month Swiggy ONE</p>
              <p>Use at just ₹1</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Flat 10% Off</CardTitle>
            </CardHeader>
            <CardContent>
              <p>On total bill</p>
              <p>
                Walk-in offers: Pay restaurant bill via Swiggy app to avail the
                offer
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Offers Section */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Additional Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <p>10% cashback on orders above ₹100</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p>Flat ₹750 Off on orders above ₹1000</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Food Section */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Food</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Cottage cheese stick</CardTitle>
              <p>₹200</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Jalapeno cheese ball</CardTitle>
              <p>₹180</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Onion pakoda</CardTitle>
              <p>₹160</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Garlic kebab</CardTitle>
              <p>₹220</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Burritos</CardTitle>
              <p>₹250</p>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Location Section */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Location</h2>
        <p>
          Chaitanya Plaza, 3rd Floor, Dvg Road, Basavanagudi, Bengaluru,
          Karnataka 560004
        </p>
        <Button className="mt-2">View on Maps</Button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
