import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductByBrand from "./pages/ProductByBrand";
import ProductByKeyword from "./pages/ProductByKeyword";
import ProductByCategory from "./pages/ProductByCategory";
import ProductDetails from "./pages/ProductDetails";
import AboutPage from "./pages/AboutPage";
import RefundPage from "./pages/RefundPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import HowToBuy from "./pages/HowToBuy";
import ContactPage from "./pages/ContactPage";
import ComplainPage from "./pages/ComplainPage";
import LoginPage from "./pages/LoginPage";
import OTPPage from "./pages/OTPPage";
import ProfilePage from "./pages/ProfilePage";
import WishPage from "./pages/WishPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import InvoicePage from "./pages/InvoicePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/by-brand/:id" element={<ProductByBrand />} />
        <Route path="/by-category/:id" element={<ProductByCategory />} />
        <Route path="/by-keyword/:keyword" element={<ProductByKeyword />} />
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/how-to-buy" element={<HowToBuy />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/complain" element={<ComplainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/wish" element={<WishPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/invoice/:id" element={<InvoicePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
