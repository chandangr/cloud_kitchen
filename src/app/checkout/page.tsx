"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

const CheckoutPage = () => {
  const [address, setAddress] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "Chandan Gr",
    phone: "9945622234",
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <div className="flex p-4">
      <div className="w-1/3 pr-4">
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{userDetails.name}</p>
            <p>{userDetails.phone}</p>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Add a Delivery Address</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={handleAddressChange}
              className="mb-2"
            />
            <Button>Add New Address</Button>
          </CardContent>
        </Card>
      </div>

      <div className="w-2/3 pl-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p>Item: Paneer Butter Masala</p>
                <p>Quantity: 3</p>
                <p>Price: ₹777</p>
                <p>Delivery Fee: ₹78</p>
                <p>Extra Discount: -₹50</p>
                <p>Platform Fee: ₹8</p>
                <p>GST and Restaurant Charges: ₹40.29</p>
              </div>
              <div className="text-right">
                <h2 className="font-bold">Total: ₹853</h2>
                <Link href="/payment">
                  <Button className="mt-2">Proceed to Payment</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
