const FeaturesModel = require("../model/FeaturesModel");
const LegalModel = require("../model/LegalModel");
const FeaturesListService = async (req, res) => {
  try {
    let data = await FeaturesModel.find();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};

const LegalDetailsService = async (req) => {
  try {
    let type = req.params.type;
    let data = await LegalModel.find({ type: type });
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};

module.exports = { FeaturesListService, LegalDetailsService };
