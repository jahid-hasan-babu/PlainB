import React, { useEffect } from "react";
import ProductStore from "../store/ProductStore";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProductList from "../components/product/ProductList";

const ProductByBrand = () => {
  const { ListByBrandRequest } = ProductStore();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await ListByBrandRequest(id);
    })();
  }, [id]);
  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default ProductByBrand;
