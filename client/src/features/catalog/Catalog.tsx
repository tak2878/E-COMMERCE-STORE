import { Fragment } from "react/jsx-runtime";
import type { Product } from "../../app/models/product";
import { ProductList } from "./ProductList";
import { useEffect, useState } from "react";

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <Fragment>
      <ProductList products={products} />
    </Fragment>
  );
};
