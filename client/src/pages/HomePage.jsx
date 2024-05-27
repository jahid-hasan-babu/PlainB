import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import ProductStore from "../store/ProductStore";
import FeatureStore from "../store/FeaturesStore.js";
import Slider from "../components/product/Slider.jsx";
import Categories from "../components/product/Categories.jsx";
import Products from "../components/product/Products.jsx";
import Brands from "../components/product/Brands.jsx";
import Features from "../components/features/Features.jsx";

const HomePage = () => {
  const {
    BrandListRequest,
    CategoryListRequest,
    SliderListRequest,
    ListByRemarkRequest,
  } = ProductStore();

  const { FeatureListRequest } = FeatureStore();

  useEffect(() => {
    (async () => {
      await SliderListRequest();
      await FeatureListRequest();
      await CategoryListRequest();
      await ListByRemarkRequest("new");
      await BrandListRequest();
    })();
  }, []);

  return (
    <Layout>
      <Slider />
      <Features />
      <Categories />
      <Products />
      <Brands />
    </Layout>
  );
};

export default HomePage;
