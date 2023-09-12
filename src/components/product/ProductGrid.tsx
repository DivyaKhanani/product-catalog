"use client";
import React from "react";
import Image from "next/image";
import { IProduct } from "@/types/Product";
import AddToCartButton from "./AddToCartButton";
import AddToCompareButton from "../Compare/AddToCompare";

interface ProductGridProps {
  products: IProduct[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => {
        return (
          <div key={product.product_id} className="p-4 border rounded-lg">
            {/* Display product information here */}

            <Image
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded-lg"
              width={150}
              height={300}
            />
            <h2 className="text-md font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-500 text-sm">{product.brand}</p>
            <p className="text-gray-800 font-semibold">
              ${product.price.toFixed(2)}
            </p>

            <div className="my-4">
              <AddToCartButton productId={product.product_id} />
            </div>
            <div className="my-4">
              <AddToCompareButton productId={product.product_id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
