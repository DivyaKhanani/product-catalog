// components/AddToCartButton.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, updateCart } from "@/store/cartSlice";
import QuantityButton from "@/components/cart/QuantityButton";
import { IInventory } from "@/types/Product";
import inventoryData from "@/data/inventory.json";
import { STOCK_WARNING_LEVEL } from "@/constants";

interface AddToCartButtonProps {
  productId: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const handleAddToCart = () => {
    dispatch(updateCart({ product_id: productId, quantity: 1 }));
  };

  const inCart = cartItems.find((item) => item.product_id === productId);

  const stock = (inventoryData as IInventory)[productId] || 0;

  if (inCart) {
    return <QuantityButton product={inCart} />;
  }

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="px-4 py-2 w-full text-lg bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300"
        disabled={stock <= 0}
      >
        {stock <= 0 ? "Out of Stock" : "Add to Cart"}
      </button>
      {stock > 0 && stock <= STOCK_WARNING_LEVEL && (
        <div className="text-red-600 mt-2 font-semibold  ">
          <p>Low stock!</p>
        </div>
      )}
    </>
  );
};

export default AddToCartButton;
