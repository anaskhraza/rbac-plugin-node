import { Repository } from "./repository";
import Sequelize from "sequelize";

class PermissionRepository extends Repository {
  constructor(permissions, cache) {
    super(permissions);

    if(cache) {

      this.cache = cache;
      const permissions = this.getAllPermissions();
      const rolePermissions = this.getAllUserSpecificPermission();
      this.cache.mset([
        {key: "permissions", val: permissions, ttl: 100000},
        {key: "rolepermissions", val: rolePermissions, ttl: 100000},
      ]);
      
    }
  }

  async getAllPermissions() {
    console.log("permissions ", "get All permissions");
    try {
      return await this.findAllRecords();
    } catch (error) {
      console.log("catch ex", error);
      throw error;
    }
  }

  async getAllUserSpecificPermission(models) {
    console.log("permissions ", "get All permissions", role);
    try {
      return await models.user_permissions.findAll({
        include: [
          {
            model: models.permissions,
            as: "permissions",
            required: true
          }
        ]
      });
    } catch (error) {
      console.log("catch ex", error);
      throw error;
    }
  }

  async getUserSpecificPermission(models, role) {
    console.log("permissions ", "get All permissions", role);
    try {
      return await models.user_permissions.findAll({
        where: {
          roleid: {
            [Sequelize.Op.eq]: role
          }
        },
        include: [
          {
            model: models.permissions,
            as: "permissions",
            required: true
          }
        ]
      });
    } catch (error) {
      console.log("catch ex", error);
      throw error;
    }
  }

  async createPermission(name) {
    try {
      return await this.createOrUpdate({ name: name }, { returning: true });
    } catch (error) {
      console.log("catch ex", error);
      throw error;
    }
  }

  async createBulkPermission(names) {
    try {
      return await this.createBulkRecords({ names });
    } catch (error) {
      console.log("catch ex", error);
      throw error;
    }
  }

  async rolePermissionMap(rolePermissionMap) {
    try {
      return await this.createBulkRecords({ rolePermissionMap });
    } catch (error) {
      console.log("catch ex", error);
      throw error;
    }
  }

  async createOneRolePermission(role, permission) {
    try {
      return await this.createRecord([
        { roleid: role },
        { permissionid: permission }
      ]);
    } catch (error) {
      console.log("catch ex", error);
      throw error;
    }
  }
}

export default PermissionRepository;
