/*
###  License
Copyright (c) 2024 Cascarita.io

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

const { UserRoles } = require("../models");

const UserRolesController = function () {
  var getUserRolesByUserId = async function (req, res, next) {
    const { id } = req.params;

    try {
      const result = await UserRoles.findAll({
        where: {
          user_id: id,
        },
      });

      if (Object.keys(result).length === 0) {
        throw new Error("user with given id has no roles");
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error details:", error);
      next(error);
    }
  };

  var createUserRole = async function (req, res, next) {
    const { user_id, role_id } = req.body;
    const newUserRole = { user_id, role_id };

    try {
      await UserRoles.build(newUserRole).validate();
      const result = await UserRoles.create(newUserRole);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  var updateUserRole = async function (req, res, next) {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        res.status(400);
        throw new Error("id must be an integer");
      }

      let currentUserRole = await UserRoles.findByPk(id);

      if (!currentUserRole) {
        res.status(404);
        throw new Error("user roles with given id was not found");
      }

      Object.keys(req.body).forEach((key) => {
        currentUserRole[key] = req.body[key]
          ? req.body[key]
          : currentUserRole[key];
      });

      await currentUserRole.validate();
      await currentUserRole.save();

      return res.status(200).json(currentUserRole);
    } catch (error) {
      next(error);
    }
  };

  var deleteUserRole = async function (req, res, next) {
    try {
      let deletedUserRole = await UserRoles.destroy({
        where: {
          id: req.body.id,
        },
      });

      if (deletedUserRole === 0) {
        res.status(404);
        throw new Error("no user roles found with the given id");
      }

      return res.status(204).json("delete user role successfully");
    } catch (error) {
      console.error("Error details:", error);
      next(error);
    }
  };

  return {
    getUserRolesByUserId,
    createUserRole,
    updateUserRole,
    deleteUserRole,
  };
};

module.exports = UserRolesController();
