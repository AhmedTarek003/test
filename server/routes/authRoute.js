const router = require("express").Router();

const {
  registerUserCtrl,
  loginUserCtrl,
  getUserCtrl,
} = require("../controllers/authCtrl");
const refreshToken = require("../middlewares/refreshtoken");

router.route("/signup").post(registerUserCtrl);
router.route("/signin").post(loginUserCtrl);
router.route("/").get(refreshToken, getUserCtrl);

module.exports = router;
