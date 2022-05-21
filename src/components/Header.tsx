import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const headerMenu = ["home", "products", "reviews"];

interface HeaderProps {}
export default function Header(props: HeaderProps) {
  const [activeItem, setActiveItem] = useState(999);
  const location = useLocation();

  const cart = useAppSelector((state) => state.Cart.cart);
  const cartQuantity = cart.reduce((acc, cur) => acc + cur.quantity, 0);

  useEffect(() => {
    if (location.pathname.indexOf("checkout") >= 0) setActiveItem(99);
  }, [location.pathname]);

  return (
    <div className="container-fluid px-5 py-2 shadow ">
      <div className="row">
        <div className="col col-4">
          <ul className="nav nav-pills">
            {headerMenu.map((item, index) => (
              <li
                className={`nav-item hover:text-blue-900 `}
                key={index}
                onClick={() => setActiveItem(index)}
              >
                <Link
                  className={`nav-link capitalize mr-2 hover:shadow-[0px_0px_5px_#000] ${
                    activeItem === index && "active"
                  }`}
                  to={`/${item}`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col col-4 d-flex align-items-center justify-content-center">
          <div className="">Shopping cart</div>
        </div>

        <div className="col col-4 d-flex align-items-center justify-content-end relative">
          <Link to="/checkout">
            <i className="fa-solid fa-cart-shopping fs-3 cursor-pointer"></i>
            <span className="bg-red-600 rounded-full p-[10px] w-[30px] h-[30px] inline-flex justify-center items-center text-white text-[0.8rem] absolute top-[-7px] right-[-4px] border-[2px]">
              {cartQuantity || 0}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
