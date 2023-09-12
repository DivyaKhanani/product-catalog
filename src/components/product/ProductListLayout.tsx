"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductTable from "./ProductTable";
import ProductGrid from "./ProductGrid";
import { IProduct, LayoutType } from "@/types/Product";
import { RootState } from "@/store";
import CompareView from "../Compare/CompareView";
import Cart from "../cart/Cart";
import { hideLoading } from "@/store/cartSlice";

interface ProductListLayoutProps {
  products: IProduct[];
}

const ProductListLayout: React.FC<ProductListLayoutProps> = ({ products }) => {
  const layoutView = useSelector((state: RootState) => state.layout);
  const { loading } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(hideLoading())
  }, [dispatch])

  if (loading) {
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
  }

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
