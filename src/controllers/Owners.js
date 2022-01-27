const express = require("express");

// user model
const User = require("../models/User");

const getAcceptedOwners = (req, res) => {
  res.json({
    messahe: "Hi!!",
  });
};

module.exports = {
  getAcceptedOwners,
};
