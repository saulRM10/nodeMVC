/*
###  License
Copyright (c) 2025 Cascarita.io

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to use the Software for personal or academic purposes only, subject to the following conditions:

1. **Non-Commercial Use Only**:
   The Software may not be used, copied, modified, merged, published, distributed, sublicensed, or sold for commercial purposes or financial gain.

2. **No Redistribution for Sale**:
   The Software and its derivatives may not be sold, sublicensed, or otherwise distributed in exchange for any monetary or non-monetary compensation.

3. **Ownership**:
   The copyright holders retain all ownership and intellectual property rights of the Software. Any unauthorized use, duplication, or modification of the Software that violates this license will constitute a breach of copyright.

4. **Attribution**:
   The above copyright notice and this license must be included in all copies or substantial portions of the Software.

5. **Warranty Disclaimer**:
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

By using this Software, you agree to the terms and conditions stated herein. If you do not agree, you may not use, modify, or distribute this Software.
*/
"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const UserRolesController = require("../controllers/userRoles.controller");

module.exports = (checkJwt) => {
  router.get("/loginReactPageHere", (req, res) => {
    res.json({ message: "Invalid email or password, try again" });
  });

  router.get("/", checkJwt, UserController.fetchUser);

  router.get("/:user_id", UserController.getUserByUserId);
  router.post("/:user_id", UserController.updateUserById);
  router.delete("/:user_id", UserController.deleteUserById);

  router.get("/groups/:group_id", UserController.getUsersByGroupId);
  router.post(
    "/groups/:group_id",
    checkJwt,
    UserController.registerUserFromAuth0,
  );

  router.post("/", UserController.addUser);

  // router.get("/roles/:id", UserRolesController.getUserRolesByUserId);
  // router.patch("/roles/:id", UserRolesController.updateUserRole);
  return router;
};
