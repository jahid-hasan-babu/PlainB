import React, { useEffect } from "react";
import FeatureStore from "../store/FeaturesStore";
import Layout from "../components/layout/Layout";
import LegalContents from "../components/features/LegalContents";

const ContactPage = () => {
  const { LegalDetailsRequest } = FeatureStore();
  useEffect(() => {
    (async () => {
      await LegalDetailsRequest("contact");
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

export default ContactPage;
