const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/bookingApp",
  () => console.log("database connected successfully"),
  (e) => console.log(e.message)
);

module.exports = mongoose;
