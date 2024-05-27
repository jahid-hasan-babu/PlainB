import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import LegalContents from "../components/features/LegalContents";
import FeatureStore from "../store/FeaturesStore";

const RefundPage = () => {
  const { LegalDetailsRequest } = FeatureStore();
  useEffect(() => {
    (async () => {
      await LegalDetailsRequest("refund");
    })();
  }, []);
  return (
    <div>
      <Layout>
        <LegalContents />
      </Layout>
    </div>
  );
};

export default RefundPage;
