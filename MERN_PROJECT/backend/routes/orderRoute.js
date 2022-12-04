const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

  router
  .route("/shipping/orders")
  .get(isAuthenticatedUser, authorizeRoles("shipper"), getAllOrders);

  router
  .route("/saler/orders")
  .get(isAuthenticatedUser, authorizeRoles("saler"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

  router
  .route("/shipping/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("shipper"), updateOrder)
  router
  .route("/saler/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("saler"), updateOrder)

  router
  .route("/user/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("user"), updateOrder)

module.exports = router;
