const CartModel = require("../model/CartModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const CartListService = async (req) => {
  try {
    let user_id = new ObjectId(req.headers.user_id);
    let matchStage = { $match: { userID: user_id } };

    let joinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindProductStage = { $unwind: "$product" };

    let JoinStageBrand = {
      $lookup: {
        from: "brands",
        localField: "product.brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };

    let JoinStageCategory = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        _id: 0,
        userID: 0,
        createAt: 0,
        updatedAt: 0,
        "product._id": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await CartModel.aggregate([
      matchStage,
      joinStageProduct,
      unwindProductStage,
      JoinStageBrand,
      unwindBrandStage,
      JoinStageCategory,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

const UpdateCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let cartID = req.params.cartID;
    let reqBody = req.body;
    await CartModel.updateOne(
      { _id: cartID, userID: user_id },
      { $set: reqBody }
    );
    return { status: "success", message: "Cart List Update Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong!" };
  }
};

const SaveCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await CartModel.create(reqBody);
    return { status: "success", message: "Cart List Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong!" };
  }
};

const RemoveCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await CartModel.deleteOne(reqBody);
    return { status: "success", message: "Cart List Remove Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong!" };
  }
};

module.exports = {
  CartListService,
  SaveCartListService,
  RemoveCartListService,
  UpdateCartListService,
};
