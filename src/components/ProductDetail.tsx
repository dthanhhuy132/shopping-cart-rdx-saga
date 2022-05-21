import { useEffect, useState } from "react";
import { ProductInterface } from "../models";
import { addProduct } from "../store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import ButtonLoading from "./ButtonLoading";
import { ToastContainer, toast } from "react-toastify";

interface ProductDetailInterface {
  productId: string;
}

const ProductDetail: React.FC<ProductDetailInterface> = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const products = useAppSelector((state) => state.Product.products);

  const dispatch = useAppDispatch();

  const getProductDetail: ProductInterface = products?.filter(
    (item: ProductInterface, index: number) => item.productId === productId
  )[0];

  // Create new cartData
  const cartData = {
    getProductDetail,
    quantity,
  };

  let timeId: NodeJS.Timeout;
  function handleClickAddToCard() {
    setIsAddingProduct(true);
    timeId = setTimeout(() => {
      dispatch(addProduct(cartData));
      toast.success("Add product successfully");
    }, 1300);
  }

  useEffect(() => {
    setQuantity(1);

    return () => clearTimeout(timeId);
    // eslint-disable-next-line
  }, [productId]);

  return (
    <div className="w-3/5 bg-white h-full rounded-lg py-2 text-left i">
      <div className="px-4">
        <div>
          <h1 className="font-bold text-[1.5rem]">
            {getProductDetail?.productName}
          </h1>
          <p>{getProductDetail?.description}</p>
        </div>

        <div className="flex mt-4 mb-4 items-center">
          <span className="font-bold text-[1.6rem]">
            $
            <span className="inline-block w-[100px]">
              {(getProductDetail?.price * quantity).toFixed(1)}
            </span>
          </span>

          <div className="px-3 py-2 rounded-md font-bold bg-[#e5e7eb] mx-5">
            <i
              className={`fa-solid fa-minus px-3 py-[3px] font-[900] cursor-pointer text-green-900 transition-all duration-200 ease hover:scale-[1.5] hover:text-green-400 ${
                quantity < 2 && "pointer-events-none text-gray-400"
              }`}
              onClick={() => setQuantity((pre) => pre - 1)}
            ></i>
            <span className="inline-block min-w-[20px] text-center select-none ">
              {quantity}
            </span>
            <i
              className={`fa-solid fa-plus px-3 py-[3px] font-[900] cursor-pointer text-orange-400 transition-all duration-200 ease hover:scale-[1.5] hover:text-red-600 ${
                quantity > 10 && "pointer-events-none text-gray-400"
              }`}
              onClick={() => setQuantity((pre) => pre + 1)}
            ></i>
          </div>

          <div>
            <ButtonLoading
              isLoading={isAddingProduct}
              setLoading={() => setIsAddingProduct(false)}
              handleClick={handleClickAddToCard}
            />
            <ToastContainer
              position="bottom-right"
              pauseOnHover={false}
              autoClose={2000}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <img
          src={getProductDetail?.imageUrl}
          alt=""
          className="max-h-[500px] object-cover"
        />
      </div>
    </div>
  );
};

export default ProductDetail;
