const { User, validate } = require('../models/User.model');
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  return res.status('200').send({ message: 'all good' })
});

module.exports = router;
