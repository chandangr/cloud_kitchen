"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const router = useRouter();

  const handleBackToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Options</h1>
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          1 item • Total: ₹853 • Savings of ₹50
        </p>
        <p className="text-green-600">
          Save upto ₹171 more with payment offers
        </p>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Preferred Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p>PhonePe (Wallet/UPI/Cards)</p>
              <p className="text-sm text-gray-500">
                Pay using PhonePe wallet to get an additional flat ₹40 cashback
                on transactions above ₹399
              </p>
            </div>
            <Button variant="outline" className="text-red-500">
              Link Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Pay by any UPI App</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full">+ Add New UPI ID</Button>
          <p className="text-sm text-gray-500">
            You need to have a registered UPI ID
          </p>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Credit & Debit Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p>One Card • • • 3057</p>
            <Button className="text-blue-500">+ Add New Card</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>More Payment Options</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Wallets: PhonePe, Amazon Pay & more</p>
          <p>Pluxee: Pluxee card valid only on Food & Instamart</p>
          <p>Netbanking: Select from a list of banks</p>
          <p>Pay on Delivery: Pay in cash or pay online.</p>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Button onClick={handleBackToCheckout} className="w-full">
          Back to Checkout
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
