"use client";
import React from "react";
import ProductListLayout from "@/components/product/ProductListLayout";
import productsData from "@/data/products.json";
import dynamic from "next/dynamic";

const NoSSRProductList = dynamic(
  () => import("@/components/product/ProductListLayout"),
  {
    ssr: false,
    loading: () => {
      return (
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      );
    },
  }
);

const ProductsPage: React.FC = () => {
  const products = productsData.products;

  return (
    <div>
      <NoSSRProductList products={products} />
    </div>
  );
};

export default ProductsPage;
