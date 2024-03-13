const jwt = require("jsonwebtoken");

const refreshToken = (req, res, next) => {
  const accessToken = req.cookies.at;
  if (!accessToken) {
    const refreshToken = req.cookies.rt;
    if (!refreshToken) {
      return res.status(404).json({ msg: "no refresh token" });
    } else {
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ msg: "invalid refresh token" });
        } else {
          const accessToken = jwt.sign(
            { id: user.id, admin: user.admin },
            process.env.JWT_ACCESS_KEY,
            {
              expiresIn: "1m",
            }
          );
          res.cookie("at", accessToken, {
            maxAge: 1 * 60 * 1000,
          });
          req.user = user;
          next();
        }
      });
    }
  } else {
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: "invalid access token" });
      } else {
        req.user = user;
        next();
      }
    });
  }
};

module.exports = refreshToken;
