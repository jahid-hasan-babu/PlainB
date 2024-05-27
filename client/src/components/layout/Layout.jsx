import React from "react";
import AppNavBar from "./AppNavBar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = (props) => {
  return (
    <>
      <AppNavBar />
      {props.children}
      <Toaster position="bottom-center" />
      <Footer />
    </>
  );
};

export default Layout;
