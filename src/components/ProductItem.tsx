import { useState } from "react";
import { ProductInterface } from "../models";
import {
  deleteProduce,
  descreaseProduct,
  increaseProduct,
} from "../store/cart/cartSlice";
import { useAppDispatch } from "../store/hooks";
import PopUp from "./common/Popup";

interface ProductItemProps {
  product?: ProductInterface;
  handleClickProductItem?: any;
  isCheckOut?: boolean;
  quantityInCart?: number;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  handleClickProductItem,
  isCheckOut = false,
  quantityInCart,
}) => {
  const [quantity, setQuantity] = useState(quantityInCart || 1);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const dispatch = useAppDispatch();

  function handleClickProductItemInside(productId: string | undefined) {
    if (isCheckOut) return;
    handleClickProductItem(productId);
  }

  function dispatchActionDescreaseQuantityCart(productId: string | undefined) {
    dispatch(descreaseProduct(productId));
    setQuantity((pre) => pre - 1);
  }

  function dispatchActionIncreaseQuantityCart(productId: string | undefined) {
    dispatch(increaseProduct(productId));
    setQuantity((pre) => pre + 1);
  }

  function handleClickOnAddDelete(productId: string | undefined) {
    if (isCheckOut) {
      setIsShowPopup(true);
    }
  }

  function confirmDeleteProduct(productId: string | undefined) {
    dispatch(deleteProduce(productId));
    setIsShowPopup(false);
  }

  return (
    <div
      className={`flex p-4 rounded-md bg-white  mx-1 transition-all duration-300 ease-in-out hover:shadow-[0px_0px_10px_#000]  ${
        !isCheckOut ? "cursor-pointer flex items-center" : "flex items-center"
      }`}
      onClick={() => handleClickProductItemInside(product?.productId)}
    >
      <div className="w-1/4 flex">
        <img
          src={product?.imageUrl}
          alt=""
          className="h-[152px] object-cover position-center"
        />
      </div>
      <div className="w-3/4 text-left ml-5">
        <h1 className="font-bold">{product?.productName}</h1>
        <p>{product?.description}</p>

        <div className="flex justify-between items-center pr-1 mt-3">
          <span className="font-bold">
            $
            <span>
              {isCheckOut && product
                ? (product?.price * quantity).toLocaleString("en-US")
                : product?.price}
            </span>
          </span>

          {isCheckOut && (
            <div className="px-3 py-2 rounded-md font-bold bg-[#e5e7eb]">
              <i
                className={`fa-solid fa-minus px-3 py-[3px] font-[900] cursor-pointer text-green-900 transition-all duration-200 ease hover:scale-[1.5] hover:text-green-400 select-none 
                ${
                  quantity < 2 &&
                  "cursor-default text-gray-300 pointer-events-none"
                }
                
                
                `}
                onClick={() =>
                  dispatchActionDescreaseQuantityCart(product?.productId)
                }
              ></i>
              <span className="inline-block min-w-[20px] text-center select-none ">
                {quantity}
              </span>
              <i
                className="fa-solid fa-plus px-3 py-[3px] font-[900] cursor-pointer text-orange-400 transition-all duration-200 ease hover:scale-[1] hover:text-red-600 select-none "
                onClick={() =>
                  dispatchActionIncreaseQuantityCart(product?.productId)
                }
              ></i>
            </div>
          )}

          <div className="relative">
            <button
              className={`py-1 ${
                isCheckOut && "bg-red-600 hover:bg-red-400 px-1"
              } rounded-md text-white hover:shadow-[0px_0px_10px_rgba(0,0,0,0.7)]`}
              onClick={() => handleClickOnAddDelete(product?.productId)}
            >
              <i
                className={`fa-solid ${isCheckOut ? "fa-trash p-2" : ""} `}
              ></i>
            </button>

            {isCheckOut && (
              <PopUp
                isShowPopup={isShowPopup}
                text="Are you sure to delete Product:"
                handleClickOk={() => confirmDeleteProduct(product?.productId)}
                handleClickCancel={() => setIsShowPopup(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
