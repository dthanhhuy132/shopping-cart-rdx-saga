import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ProductDetail from "../components/ProductDetail";
import ProductItem from "../components/ProductItem";
import { useAppSelector } from "../store/hooks";
import { ProductInterface } from "../models";

const Product = () => {
  const products = useAppSelector((state) => state.Product.products);
  const [isAnimateEffect, setIsAnimateEffect] = useState(true);

  const [productId, setProductId] = useState("1");

  function handleClickProductItem(id: string) {
    setProductId(id);
  }

  useEffect(() => {
    const timeId = setTimeout(() => setIsAnimateEffect(false), 1000);
    return () => clearTimeout(timeId);
  }, []);

  return (
    <div
      className={`h-full ${
        isAnimateEffect && "animate__animated animate__bounceInLeft"
      }`}
    >
      {products.length <= 0 ? (
        <Loading />
      ) : (
        <div className="flex h-full">
          <div className="w-2/5 mr-4 h-full overflow-y-auto flex gap-3 flex-col">
            {products &&
              products.map((product: ProductInterface, index: number) => (
                <ProductItem
                  product={product}
                  key={index}
                  handleClickProductItem={handleClickProductItem}
                />
              ))}
          </div>
          <ProductDetail productId={productId} />
        </div>
      )}
    </div>
  );
};

export default Product;
