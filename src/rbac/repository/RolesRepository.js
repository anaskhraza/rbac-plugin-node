import { Repository } from "./repository";

class RolesRepository extends Repository {
  constructor(roles, cache) {
    super(roles);

  }

  async getAllRoles(name) {
    console.log("RolesRepository ", "get All Roles");
    try {
      return await this.findAllRecords();
    } catch (error) {
      console.log("catch ex", error);
      throw error;
    }
  }

  async getRoleById(roleId) {
    console.log("permissions ", "get All permissions", role);
    try {
      return await models.user_permissions.findAll({
        where: {
          roleid: {
            [Sequelize.Op.eq]: roleId
          }
        },
        include: [
          {
            model: models.roles,
            as: "roles",
            required: true
          }
        ]
      });
    } catch (error) {
      console.log("catch ex", error);
      throw error;
    }
  }
  
  async createRole(name) {
    try {
      return await this.createOrUpdate({name: name}, { returning: true });
    } catch (error) {
      console.log("catch ex", error);
      throw error;
    }
  }

  async createBulkRoles(names) {
    try {
      return await this.createBulkRecords({names});
    } catch (error) {
      console.log("catch ex", error);
      throw error;
    }
  }
  
}

export default RolesRepository;
