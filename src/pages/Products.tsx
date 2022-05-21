import { useState } from "react";
import ProductDetail from "../components/ProductDetail";
import ProductItem from "../components/ProductItem";
import { ProductInterface } from "../models";
// import { ProductInterface } from "../models";

// interface ProductsProps {
//   products: any
// }

const Product = (products: any) => {
  const [productId, setProductId] = useState("1");

  function handleClickProductItem(id: string) {
    setProductId(id);
  }

  return (
    <div className="flex h-full">
      <div className="w-2/5 mr-4 h-full overflow-y-auto flex gap-3 flex-col">
        {products &&
          products.products.map((product: ProductInterface, index: number) => (
            <ProductItem
              product={product}
              key={index}
              handleClickProductItem={handleClickProductItem}
            />
          ))}
      </div>

      <ProductDetail productId={productId} />
    </div>
  );
};

export default Product;
