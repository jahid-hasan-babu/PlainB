import React from "react";
import Layout from "./../components/layout/Layout";
import WishList from "../components/wish/WishList";
import Brands from "../components/product/Brands";

const WishPage = () => {
  return (
    <Layout>
      <WishList />
      <Brands />
    </Layout>
  );
};

export default WishPage;
