import React from "react";
import { IProduct } from "@/types/Product";
import AddToCartButton from "./AddToCartButton";
import Image from "next/image";
import AddToCompareButton from "../Compare/AddToCompare";

interface ProductTableProps {
  products: IProduct[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <div className=" overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-black-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product Details
            </th>

            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {

            return (
              <tr
                className="bg-slate-50 border-b border-gray-200 dark:hover:bg-slate-100 text-gray-700"
                key={product.product_id}
              >
                <td className="w-1/4 p-4">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-40 object-cover rounded-lg"
                    width={100}
                    height={200}
                  />
                </td>
                <td className="w-1/3 px-6 py-4 font-semibold  text-black">
                  <div className="text-lg">{product.title}</div>
                  <div>{product.brand}</div>
                  <div className="my-4">
                    <AddToCompareButton productId={product.product_id} />
                  </div>
                </td>

                <td className="px-6 py-4 w-1/6 font-semibold  text-black">
                  ${product.price}
                </td>
                <td className="px-6 py-4 w-1/6">
                  <AddToCartButton
                    productId={product.product_id}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
