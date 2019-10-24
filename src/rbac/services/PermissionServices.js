import PermissionRepository from "../repository/PermissionRepository";
import { permissionsDTO } from '../DTO/rbac';

class PermissionServices {
  constructor(db, cache) {
    this.database = db;
    this.PermissonRepository = new PermissionRepository(db.permissions, cache);

    this.getAllPermissions = this.getAllPermissions.bind(this);
    this.getUserSpecificPermission = this.getUserSpecificPermission.bind(this);
  }

  async getAllPermissions() {
    console.log("UserController ", "UserController");
    return await this.PermissonRepository.getAllPermissions();
  }

  async getUserSpecificPermission(role) {
    console.log("getUserSpecificPermission ", "User Specific Permission");
    let permissions = await this.PermissonRepository.getUserSpecificPermission(this.database, role);
    if(permissions) {
      permissions = permissionsDTO(permissions);
      return permissions;
    }
  }

  async createPermission(name) {
    console.log("UserController ", "UserController");
    return await this.PermissonRepository.createPermission(name);
  }

  async RolePermissionMap(rolePermissionMap) {
    console.log("UserController ", "UserController");
    return await this.PermissonRepository.rolePermissionMap(rolePermissionMap);
  }

  async createOneRolePermission(role, permission) {
    console.log("UserController ", "UserController");
    return await this.PermissonRepository.createOneRolePermission(role, permission);
  }

}


export default PermissionServices;