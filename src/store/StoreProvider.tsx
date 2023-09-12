"use client";
import { ReactNode } from "react";
import store from "./index";
import { Provider } from "react-redux";

interface IStoreProviderProps {
  children: ReactNode;
}

const StoreProvider: React.FC<IStoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
