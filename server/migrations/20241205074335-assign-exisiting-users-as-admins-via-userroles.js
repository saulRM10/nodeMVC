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

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const [existingAdminRole] = await queryInterface.sequelize.query(
        `SELECT id FROM Roles WHERE role_type = 'Admin'`,
        { type: Sequelize.QueryTypes.SELECT },
      );

      let adminRoleId;

      if (existingAdminRole) {
        adminRoleId = existingAdminRole.id;
      } else {
        await queryInterface.sequelize.query(
          `INSERT INTO Roles (role_type, created_at, updated_at)
           VALUES ('Admin', NOW(), NOW())`,
        );

        const [result] = await queryInterface.sequelize.query(
          `SELECT id FROM Roles WHERE role_type = 'Admin'`,
          { type: Sequelize.QueryTypes.SELECT },
        );

        adminRoleId = result.id;
      }

      const users = await queryInterface.sequelize.query(
        `SELECT id FROM Users`,
        { type: Sequelize.QueryTypes.SELECT },
      );

      const userRoles = users.map((user) => ({
        user_id: user.id,
        role_id: adminRoleId,
        created_at: new Date(),
        updated_at: new Date(),
      }));

      await queryInterface.bulkInsert("UserRoles", userRoles);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const [adminRole] = await queryInterface.sequelize.query(
        `SELECT id FROM Roles WHERE role_type = 'Admin'`,
        { type: Sequelize.QueryTypes.SELECT },
      );

      if (adminRole) {
        await queryInterface.bulkDelete("UserRoles", { role_id: adminRole.id });

        await queryInterface.bulkDelete("Roles", { id: adminRole.id });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
