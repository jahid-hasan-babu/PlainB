const jwt = require("jsonwebtoken");

exports.EncodeToken = (email, user_id) => {
  let KEY = "JAHID-HASAN-BABU";
  let EXPIRE = { expiresIn: "24h" };
  let PAYLOAD = {
    email: email,
    user_id: user_id,
  };
  return jwt.sign(PAYLOAD, KEY, EXPIRE);
};

exports.DecodeToken = (token) => {
  try {
    let KEY = "JAHID-HASAN-BABU";
    return jwt.verify(token, KEY);
  } catch (e) {
    return null;
  }
};
