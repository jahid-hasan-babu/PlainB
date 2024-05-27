import React, { useEffect } from "react";
import ProductStore from "../store/ProductStore";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProductList from "../components/product/ProductList";

const ProductByKeyword = () => {
  const { ListByKeywordRequest } = ProductStore();
  const { keyword } = useParams();

  useEffect(() => {
    (async () => {
      await ListByKeywordRequest(keyword);
    })();
  }, [keyword]);
  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default ProductByKeyword;
