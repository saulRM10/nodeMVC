"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const UserRolesController = require("../controllers/userRoles.controller");

module.exports = (checkJwt) => {
  router.get("/loginReactPageHere", (req, res) => {
    res.json({ message: "Invalid email or password, try again" });
  });
  router.get("/:id", UserController.getUserByUserId);
  router.patch("/:id", UserController.updateUserById);

  router.get("/", checkJwt, UserController.fetchUser);

  router.get("/groups/:group_id", UserController.getUsersByGroupId);
  router.post("/groups/:group_id", UserController.registerUserFromAuth0);

  router.delete("/:id", UserController.deleteUserById);
  router.patch("/:id", UserController.updateUserById);
  router.post("/", UserController.addUser);

  router.get("/roles/:id", UserRolesController.getUserRolesByUserId);
  router.patch("/roles/:id", UserRolesController.updateUserRole);
  return router;
};
