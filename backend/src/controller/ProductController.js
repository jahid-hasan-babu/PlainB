const {
  BrandListServices,
  CategoryListServices,
  SliderListServices,
  ListByBrandService,
  ListByCategoryService,
  ListBySmilerService,
  ListByKeyWordService,
  ListByRemarkService,
  DetailsService,
  ReviewListService,
  CreateReviewService,
  ListByFilterService,
} = require("../services/ProductServices");

exports.ProductBrandList = async (req, res) => {
  let result = await BrandListServices();
  return res.status(200).json(result);
};

exports.ProductCategoryList = async (req, res) => {
  let result = await CategoryListServices();
  return res.status(200).json(result);
};

exports.ProductSliderList = async (req, res) => {
  let result = await SliderListServices();
  return res.status(200).json(result);
};

exports.ProductListByBrand = async (req, res) => {
  let result = await ListByBrandService(req);
  return res.status(200).json(result);
};

exports.ProductListByCategory = async (req, res) => {
  let result = await ListByCategoryService(req);
  return res.status(200).json(result);
};

exports.ProductListByRemark = async (req, res) => {
  let result = await ListByRemarkService(req);
  return res.status(200).json(result);
};

exports.ProductListBySmiler = async (req, res) => {
  let result = await ListBySmilerService(req);
  return res.status(200).json(result);
};

exports.ProductListByFilter = async (req, res) => {
  let result = await ListByFilterService(req);
  return res.status(200).json(result);
};

exports.ProductDetails = async (req, res) => {
  let result = await DetailsService(req);
  return res.status(200).json(result);
};

exports.ProductListByKeyword = async (req, res) => {
  let result = await ListByKeyWordService(req);
  return res.status(200).json(result);
};

exports.ProductReviewList = async (req, res) => {
  let result = await ReviewListService(req);
  return res.status(200).json(result);
};

exports.CreateReview = async (req, res) => {
  let result = await CreateReviewService(req);
  return res.status(200).json(result);
};
