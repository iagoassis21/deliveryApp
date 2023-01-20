const express = require("express");
const getUser = require("../controllers/loginController");

const router = express.Router();

router.post('/', getUser);

module.exports = router;