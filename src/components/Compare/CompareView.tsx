import { RootState } from "@/store";
import { removeFromCompare, setModalStatus } from "@/store/compareSlice";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddToCartButton from "../product/AddToCartButton";
import productsData from "@/data/products.json";
import Image from "next/image";

const CompareView: FunctionComponent = () => {
  const { openModal, items } = useSelector((state: RootState) => state.compare);
  const dispatch = useDispatch();

  const compareItemsData = productsData.products.filter((item) =>
    items.includes(item.product_id)
  );

  const handleRemoveFromCompare = (productId: number) => () => {
    dispatch(removeFromCompare(productId));
  };

  const closeModal = () => {
    dispatch(setModalStatus(false));
  };
  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-10 w-full" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-3/4    transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                >
                  Compare Products
                  <button
                    type="button"
                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    onClick={closeModal}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </Dialog.Title>
                <div className="mt-2">
                  <div className="md:grid md:grid-cols-3 xl:grid-cols-3 border border-gray-100 rounded-5xl overflow-hidden">
                    {compareItemsData.length === 0 && (
                      <div className="m-4">No Products to compare</div>
                    )}
                    {compareItemsData.map((item) => {
                      return (
                        <div
                          className="py-8    px-6 md:px-10 flex flex-col justify-between md:border-b border-gray-100 xl:border-b-0"
                          key={item.product_id}
                        >
                          <div>
                            <div className="relative max-w-max">
                              <Image
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-40 object-cover rounded-lg"
                                width={150}
                                height={300}
                              />
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <h3 className="mr-2 font-heading text-xl font-semibold leading-10 tracking-tight">
                                {item.title}
                              </h3>
                            </div>

                            <div className="font-heading text-md flex items-center mb-4">
                              <span className="text-base  mr-2 ">$</span>
                              <span>{item.price}</span>
                            </div>

                            <ul className="mb-5">
                              <li className="flex items-start leading-6 font-normal text-darkBlueGray-400 mb-3 flex-col">
                                <label className="font-semibold">Rating</label>
                                <div>{item.rating}</div>
                              </li>
                              <li className="flex items-start leading-6 font-normal text-darkBlueGray-400 mb-3 flex-col">
                                <label className="font-semibold">Brand</label>
                                <div>{item.brand}</div>
                              </li>
                              <li className="flex items-start leading-6 font-normal text-darkBlueGray-400 mb-3 flex-col">
                                <label className="font-semibold">
                                  Category
                                </label>
                                <div>{item.category}</div>
                              </li>
                              <li className="flex items-start leading-6 font-normal text-darkBlueGray-400 flex-col">
                                <label className="font-semibold">
                                  Description
                                </label>
                                <div data-config-id="auto-txt-26-1">
                                  {item.description}
                                </div>
                              </li>
                            </ul>
                          </div>

                          <AddToCartButton productId={item.product_id} />
                          <div className="mt-4 flex justify-end">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={handleRemoveFromCompare(item.product_id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Got it!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CompareView;
