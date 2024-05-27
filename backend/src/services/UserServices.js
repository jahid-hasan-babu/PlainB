const sentEmailUtility = require("../utility/EmailHelper");
const UserMOdel = require("../model/UserModel");
const ProfileModel = require("../model/ProfileModel");
const { EncodeToken } = require("../utility/TokenHelper");

const UserOTPServices = async (req) => {
  try {
    let email = req.params.email;
    let code = Math.floor(100000 + Math.random() * 900000);
    let EmailText = `Your Verification code is = ${code}`;
    let EmailSubject = "Email Verification";
    await sentEmailUtility(email, EmailText, EmailSubject);
    await UserMOdel.updateOne(
      { email: email },
      { $set: { otp: code } },
      { upsert: true }
    );
    return { status: "success", message: "6 Digit OTP has been send" };
  } catch (e) {
    return { status: "fail", message: "Something went wrong!" };
  }
};

const VerifyOTPServices = async (req) => {
  try {
    let email = req.params.email;
    let otp = req.params.otp;

    //User count
    let total = await UserMOdel.find({ email: email, otp: otp }).count("total");
    if (total === 1) {
      //user id
      let user_id = await UserMOdel.find({ email: email, otp: otp }).select(
        "_id"
      );

      //user token create
      let token = EncodeToken(email, user_id[0]["_id"].toString());

      //otp update to zero
      await UserMOdel.updateOne({ email: email }, { $set: { otp: 0 } });
      return { status: "success", message: "Valid OTP", token: token };
    } else {
      return { status: "fail", message: "Invalid OTP" };
    }
  } catch (e) {
    return { status: "fail", message: "Invalid OTP" };
  }
};

const SaveProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await ProfileModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "Profile save success" };
  } catch (e) {
    return { status: "fail", message: "Something went wrong" };
  }
};
const ReadProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let result = await ProfileModel.find({ userID: user_id });
    return { status: "success", data: result };
  } catch (e) {
    return { status: "fail", message: "Something went wrong" };
  }
};

module.exports = {
  UserOTPServices,
  VerifyOTPServices,
  SaveProfileService,
  ReadProfileService,
};
