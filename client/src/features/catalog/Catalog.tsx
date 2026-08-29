import { ProductList } from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";

export const Catalog = () => {
  const { data, isLoading } = useFetchProductsQuery();

  if (isLoading || !data) return <div>Loading....</div>;
  return (
    <>
      <ProductList products={data} />
    </>
  );
};
