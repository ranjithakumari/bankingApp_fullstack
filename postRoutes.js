const express = require("express");
const router = express.Router();
//const postControllers = require("../controllers/postControllers");
var dal     = require('./dal.js');
router.route("/").get(dal.create);
router.route("/").get(dal.findOne);
router.route("/").get(dal.find);
router.route("/").get(dal.update);
router.route("/").get(dal.all);

module.exports = router;
