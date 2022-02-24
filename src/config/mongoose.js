const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1/bookingApp",
  () => console.log("database connected successfully"),
  (e) => console.log(e.message)
);

module.exports = mongoose;
