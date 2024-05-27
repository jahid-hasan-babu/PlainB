const { DecodeToken } = require("../utility/TokenHelper");

module.exports = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }

  // Extract the token from the "Bearer {token}" format
  const [, accessToken] = token.split(" ");

  let decoded = DecodeToken(accessToken);
  if (decoded == null) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  } else {
    let email = decoded["email"];
    let user_id = decoded["user_id"];
    req.headers.email = email;
    req.headers.user_id = user_id;
    next();
  }
};
