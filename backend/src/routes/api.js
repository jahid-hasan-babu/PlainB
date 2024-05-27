const express = require("express");
const router = express.Router();
const ProductController = require("../controller/ProductController");
const UserController = require("../controller/UserController");
const AuthVerification = require("../middleware/AuthVerification");
const WishListController = require("../controller/WishListController");
const CartListController = require("../controller/CartListController");
const InvoiceController = require("../controller/InvoiceController");
const PaymentSettingsController = require("../controller/PaymentSettingsController");
const FeaturesController = require("../controller/FeaturesController");

//Product
router.get("/ProductBrandList", ProductController.ProductBrandList);
router.get("/ProductCategoryList", ProductController.ProductCategoryList);
router.get("/ProductSliderList", ProductController.ProductSliderList);
router.get(
  "/ProductListByBrand/:BrandID",
  ProductController.ProductListByBrand
);
router.get(
  "/ProductListByCategory/:CategoryID",
  ProductController.ProductListByCategory
);
router.get(
  "/ProductListBySmiler/:CategoryID",
  ProductController.ProductListBySmiler
);
router.get(
  "/ProductListByKeyword/:Keyword",
  ProductController.ProductListByKeyword
);
router.get(
  "/ProductListByRemark/:Remark",
  ProductController.ProductListByRemark
);
router.get("/ProductDetails/:ProductID", ProductController.ProductDetails);
router.get(
  "/ProductReviewList/:ProductID",
  ProductController.ProductReviewList
);

router.post("/ProductListByFilter", ProductController.ProductListByFilter);

//User
router.get("/UserOTP/:email", UserController.UserOTP);
router.get("/VerifyLogin/:email/:otp", UserController.VerifyLogin);
router.get("/UserLogout", AuthVerification, UserController.UserLogout);
router.post("/CreateProfile", AuthVerification, UserController.CreateProfile);
router.post("/UpdateProfile", AuthVerification, UserController.UpdateProfile);
router.get("/ReadProfile", AuthVerification, UserController.ReadProfile);

//wishList
router.get("/WishList", AuthVerification, WishListController.WishList);
router.post("/SaveWishList", AuthVerification, WishListController.SaveWishList);
router.delete(
  "/RemoveWishList",
  AuthVerification,
  WishListController.RemoveWishList
);

//cart
router.get("/CartList", AuthVerification, CartListController.CartList);
router.post("/SaveCartList", AuthVerification, CartListController.SaveCartList);
router.post(
  "/UpdateCartList/:cartID",
  AuthVerification,
  CartListController.UpdateCartList
);

router.delete(
  "/RemoveCartList",
  AuthVerification,
  CartListController.RemoveCartList
);

//for create admin payment settings
router.post(
  "/CreatePaymentSettings",
  PaymentSettingsController.CreatePaymentSettings
);

//Invoice & Payment
router.get("/CreateInvoice", AuthVerification, InvoiceController.CreateInvoice);
router.get("/InvoiceList", AuthVerification, InvoiceController.InvoiceList);
router.get(
  "/InvoiceProductList/:invoice_id",
  AuthVerification,
  InvoiceController.InvoiceProductList
);

router.post("/PaymentSuccess/:trxID", InvoiceController.PaymentSuccess);
router.post("/PaymentCancel/:trxID", InvoiceController.PaymentCancel);
router.post("/PaymentFail/:trxID", InvoiceController.PaymentFail);
router.post("/PaymentIPN/:trxID", InvoiceController.PaymentIPN);

//Features
router.get("/FeaturesList", FeaturesController.FeaturesList);
router.get("/LegalDetails/:type", FeaturesController.LegalDetails);
//Review
router.post("/CreateReview", AuthVerification, ProductController.CreateReview);

module.exports = router;
