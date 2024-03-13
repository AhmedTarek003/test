const { getAllUser } = require("../controllers/usersCtrl");

const router = require("express").Router();

router.route("/").get(getAllUser);

module.exports = router;
