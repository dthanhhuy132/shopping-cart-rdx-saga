import { useEffect, useState } from "react";
import { ProductInterface } from "../models";
import { addProduct } from "../store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface ProductDetail {
  productId: string;
}

const ProductDetail: React.FC<ProductDetail> = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const products = useAppSelector((state) => state.Product.products);

  const dispatch = useAppDispatch();

  const productDetail: ProductInterface = products?.filter(
    (item: ProductInterface, index: number) => item.productId === productId
  )[0];

  const cartData = {
    productDetail,
    quantity,
  };

  function handleClickAddToCard(e: any) {
    e.stopPropagation();
    dispatch(addProduct(cartData));
  }

  useEffect(() => {
    setQuantity(1);
  }, [productId]);

  return (
    <div className="w-3/5 bg-white h-full rounded-lg py-2 text-left">
      <div className="px-4">
        <div>
          <h1 className="font-bold text-[1.5rem]">
            {productDetail?.productName}
          </h1>
          <p>{productDetail?.description}</p>
        </div>

        <div className="flex mt-4 mb-4 items-center">
          <span className="font-bold text-[1.6rem]">
            $
            <span className="inline-block w-[100px]">
              {(productDetail?.price * quantity).toFixed(1)}
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

          <div className="relative">
            <button
              className="px-3 py-2 bg-[#3b82f6] rounded-md text-white hover:bg-blue-700"
              onClick={(e) => handleClickAddToCard(e)}
            >
              <i className="fa-solid fa-cart-shopping mr-2"></i>
              Add to cart
            </button>
            <div className="absolute z-10 top-0 left-0 h-full bg-[#ffffff87] transition-all translate-x-full"></div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <img
          src={productDetail?.imageUrl}
          alt=""
          className="max-h-[500px] object-cover"
        />
      </div>
    </div>
  );
};

export default ProductDetail;
