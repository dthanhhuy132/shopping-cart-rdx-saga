import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ButtonLoading from "../components/ButtonLoading";
import ProductItem from "../components/ProductItem";
import { AddProduct } from "../store/cart/cartSlice";
import { useAppSelector } from "../store/hooks";

interface CheckoutProps {}
export default function Checkout(props: CheckoutProps) {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isLoadingCheckOut, setIsLoadingCheckOut] = useState(false);
  const [isShowAnimate, setIsShowAnimate] = useState(true);
  const location = useLocation();
  const cart = useAppSelector((state) => state.Cart.cart);

  const subTotalPrice = cart.reduce(
    (acc: number, cur: AddProduct) =>
      acc + cur.productDetail.price * cur.quantity,
    0
  );

  const shippingCost = subTotalPrice >= 200 ? 0 : subTotalPrice === 0 ? 0 : 10;

  useEffect(() => {
    setIsCheckOut(location.pathname.indexOf("checkout") > -1);
    const timeId = setTimeout(() => setIsShowAnimate(false), 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <div
      className={`h-full ${
        isShowAnimate && "animate__animated animate__bounceInRight"
      } `}
    >
      <p className="rounded-md p-2 font-bold text-[1.5rem]">My Cart</p>

      <div className="flex mt-3 gap-3 h-[90%] overflow-y-auto">
        <div className="flex gap-3 flex-col w-2/3 h-full overflow-y-auto  ">
          {cart.length > 0 &&
            cart.map((cartItem, index) => (
              <ProductItem
                key={index}
                product={cartItem.productDetail}
                quantityInCart={cartItem.quantity}
                isCheckOut={isCheckOut}
              />
            ))}
        </div>

        <div className="w-1/3">
          <div className="text-left bg-white p-[18px] rounded-md">
            <h2 className="font-bold text-[1.3rem] underline">Order Info:</h2>
            <div className="pt-4">
              <p className="flex justify-between">
                <span>Subtotal: </span>
                <span>
                  $
                  <span className="font-bold">
                    {subTotalPrice.toLocaleString("en-US")}
                  </span>
                </span>
              </p>

              <p className="flex justify-between">
                <span>Shipping Cost: </span>
                <span>
                  $<span className="font-bold">{shippingCost}</span>
                </span>
              </p>

              <p className="flex justify-between font-bold text-[2rem] border-t-2 border-t-gray-500 mt-3">
                <span>Total</span>
                <span>
                  $
                  <span>
                    {(shippingCost + subTotalPrice).toLocaleString("en-US")}
                  </span>
                </span>
              </p>
            </div>
          </div>
          <div className="">
            <ButtonLoading
              style="w-full m-0 py-3"
              textContent="Checkout"
              isLoading={isLoadingCheckOut}
              setLoading={() => setIsLoadingCheckOut(false)}
              handleClick={() => setIsLoadingCheckOut(true)}
              boxModel="mt-3"
            />

            <Link to="/products" className="hover:text-white">
              <button className="text-[#3b82f6] hover:text-white block text-center w-full p-2 mt-3 rounded-md border-2 border-[#3b82f6] hover:bg-[#3b82f6]">
                Continue shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
