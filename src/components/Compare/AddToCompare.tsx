import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCompare, removeFromCompare } from "@/store/compareSlice";
import { RootState } from "@/store";

interface AddToCompareButtonProps {
  productId: number;
}

const AddToCompareButton: React.FC<AddToCompareButtonProps> = ({
  productId,
}) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.compare);
  const inCompare = items.includes(productId);

  //   const [checked, setChecked] = React.useState(inCompare);

  const handleAddToCompare = () => {
    // setChecked(!checked);
    if (inCompare) {
      dispatch(removeFromCompare(productId));
    } else {
      dispatch(addToCompare(productId));
    }
  };

  return (
    <div className="flex items-center">
      <input
        id={`checked-checkbox-${productId}`}
        type="checkbox"
        checked={inCompare}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
        onChange={handleAddToCompare}
      />
      <label
        htmlFor={`checked-checkbox-${productId}`}
        className="ml-2 text-sm font-medium text-gray-700 cursor-pointer "
      >
        {inCompare ? "Click to remove from compare" : "Add to Compare"}
      </label>
    </div>
  );
};

export default AddToCompareButton;
