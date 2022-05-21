import "animate.css";
import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import NotFound from "./Common/NotFound";
import Checkout from "./pages/Checkout";
import Reviews from "./pages/Reviews";
import Home from "./pages/Homepage";
import Product from "./pages/Products";
import Header from "./components/Header";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getAllProductLoading } from "./store/product/productSlice";
import Loading from "./components/Loading";

function App() {
  const products = useAppSelector((state) => state.Product.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProductLoading());
  }, []);

  return (
    <div className="App h-screen">
      <Header />
      <div className="container-lg my-10 bg-[#e5e7eb] h-[85%]">
        {!products ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Product products={products} />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
