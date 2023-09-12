"use client";
import { Disclosure } from "@headlessui/react";
import {
  ShoppingBagIcon,
  ListBulletIcon,
  Squares2X2Icon,
  Square2StackIcon,
} from "@heroicons/react/24/solid";
import { LayoutType } from "@/types/Product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setLayout } from "@/store/layoutSlice";
import { setModalStatus } from "@/store/cartSlice";
import { setModalStatus as setCompareModalStatus } from "@/store/compareSlice";

const mapLayoutToText = {
  [LayoutType.GRID]: "Switch to Table View",
  [LayoutType.TABLE]: "Switch to Grid View",
};

export default function Navbar() {
  const layoutView = useSelector((state: RootState) => state.layout);
  const { openModal } = useSelector((state: RootState) => state.cart);
  const { openModal: openCompareModal } = useSelector(
    (state: RootState) => state.compare
  );
  
  const dispatch = useDispatch()

  const toggleCart = () => {
    dispatch(setModalStatus(!openModal));
  };

  const toggleCompare = () => {
    dispatch(setCompareModalStatus(!openCompareModal));
  };

  const toggleView = (layoutType: LayoutType) => () => {
    const newLayoutType =
      layoutType === LayoutType.GRID ? LayoutType.TABLE : LayoutType.GRID;
    dispatch(setLayout(newLayoutType));
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium">
                    Products
                  </span>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mr-5">
                <button
                  onClick={toggleCompare}
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800 "
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Compare products</span>
                  <Square2StackIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <button
                  onClick={toggleView(layoutView)}
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800 ml-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">mapLayoutToText[layoutView]</span>
                  {layoutView === LayoutType.GRID ? (
                    <ListBulletIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Squares2X2Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>

                <button
                  onClick={toggleCart}
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800 ml-2"
                  placeholder="View Cart"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View Cart</span>
                  <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
