"use client";

import React from "react";

interface CheckoutProps {
  cartItems: { productName: string; productPrice: number }[];
  totalPrice: number;
  onCheckout?: () => void;
}

const CheckoutModal: React.FC<CheckoutProps> = ({
  cartItems,
  totalPrice,
  onCheckout,
}) => {
  return (
    <div className="fixed right-0 top-0 w-1/3 bg-white shadow-lg p-4">
      <h2 className="text-lg font-semibold">Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.productName} className="flex justify-between">
                <span>{item.productName}</span>
                <span>₹{item.productPrice}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <strong>Total: ₹{totalPrice}</strong>
          </div>
          <button
            onClick={onCheckout}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded"
          >
            Proceed to Pay
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutModal;
