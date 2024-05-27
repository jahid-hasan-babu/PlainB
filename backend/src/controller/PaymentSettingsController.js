const PaymentSettingsModel = require("../model/PaymentSettingsModel");
exports.CreatePaymentSettings = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await PaymentSettingsModel.create(reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error.toString() });
  }
};
