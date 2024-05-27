import React from "react";
import Layout from "../components/layout/Layout";
import Categories from "../components/product/Categories";
import CartList from "./CartList";

const CartPage = () => {
  return (
    <Layout>
      <CartList />
      <Categories />
    </Layout>
  );
};

export default CartPage;
