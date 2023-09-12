"use client";
import React from "react";
import ProductListLayout from "@/components/product/ProductListLayout";
import productsData from "@/data/products.json";

const ProductsPage: React.FC = () => {
  const products = productsData.products;

  return (
    <div>
      <ProductListLayout products={products} />
    </div>
  );
};

export default ProductsPage;
