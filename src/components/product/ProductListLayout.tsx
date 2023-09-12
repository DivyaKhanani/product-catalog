"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductTable from "./ProductTable";
import ProductGrid from "./ProductGrid";
import { IProduct, LayoutType } from "@/types/Product";
import { RootState } from "@/store";
import CompareView from "../Compare/CompareView";
import Cart from "../cart/Cart";

interface ProductListLayoutProps {
  products: IProduct[];
}

const ProductListLayout: React.FC<ProductListLayoutProps> = ({ products }) => {
  const layoutView = useSelector((state: RootState) => state.layout);


  return (
    <div>
      <Cart />
      <CompareView />
      {layoutView === LayoutType.GRID ? (
        <ProductGrid products={products} />
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
};

export default ProductListLayout;
