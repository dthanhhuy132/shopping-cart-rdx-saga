import "animate.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import NotFound from "./Common/NotFound";
import Checkout from "./pages/Checkout";
import Reviews from "./pages/Reviews";
import Home from "./pages/Homepage";
import Product from "./pages/Products";
import Header from "./components/Header";
import { useAppDispatch } from "./store/hooks";
import { getAllProductLoading } from "./store/product/productSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProductLoading());
    navigate("/products");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App h-screen">
      <Header />
      <div className="container-lg my-10 bg-[#e5e7eb] h-[85%]">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
