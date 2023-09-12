"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "@/store/cartSlice";
import { ICartItem } from "@/types/Product";

interface ICartProps {
  product: ICartItem;
}
const QuantityButton: React.FC<ICartProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleCartUpdate = (productId: number, quantity: number) => () => {
    dispatch(updateCart({ product_id: productId, quantity }));
  };

  return (
    <div className="text-gray-500 text-lg">
      <label className="sr-only">Quantity</label>

      <div className="flex items-center border-2 border-gray-200 rounded justify-between">
        <button
          type="button"
          onClick={handleCartUpdate(product.product_id, -1)}
          className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
          disabled={product.quantity <= 1}
        >
          -
        </button>

        <span id="Quantity" className=" w-16 border-transparent text-center ">
          {product.quantity}
        </span>

        <button
          type="button"
          className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
          onClick={handleCartUpdate(product.product_id, 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityButton;
