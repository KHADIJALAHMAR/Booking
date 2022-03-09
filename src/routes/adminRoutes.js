const express = require("express");
const router = express.Router();

// requiring Authorization By Roles Middleware
const { authorizeWithRole } = require("../middlewares/authorizeUser");

// requiring controllers
const { Admins, Owners, Customers } = require("../controllers");

//  Routes

router.route("/owner/create").post(Admins.createUser);

router.route("/owner/owners").get(authorizeWithRole("admin"), Owners.getOwners);

router
  .route("/owner/update/:userId")
  .put(authorizeWithRole("admin"), Admins.updateUser);

router
  .route("/owner/delete")
  .delete(authorizeWithRole("admin"), Admins.deleteUser);

router
  .route("/owner/accept")
  .put(authorizeWithRole("admin"), Admins.acceptOwner);

router
  .route("/owner/pending")
  .get(authorizeWithRole("admin"), Owners.getPendingOwners);
router
  .route("/owner/accepted")
  .get(authorizeWithRole("admin"), Owners.getAcceptedOwners);
router
  .route("/owner/refused")
  .get(authorizeWithRole("admin"), Owners.getRefusedOwners);

router.route("/owner/refuse").put(Admins.refuseOwner);

router
.route('/customers')
.get(Customers.getCustomers);

router.route("/user/ban").put(Admins.banUser);

router.route("/user/unban").put(Admins.unbanUser);

router.route("/hotel/accept").put(Admins.acceptHotel);

router.route("/hotel/refuse").put(Admins.refuseHotel);

module.exports = router;
